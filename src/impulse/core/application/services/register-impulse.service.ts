import { inject, injectable } from 'inversify';

import { Impulse, ImpulseProps, ImpulseGraph } from '../../domain/impulse';
import { RegisterImpulseInput, RegisterImpulseInputPort } from '../ports/in/register-impulse.input-port';
import {
  ImpulseRepositoryOutputPort,
  IMPULSE_REPOSITORY_OUTPUT_PORT,
} from '../ports/out/impulse-repository.output-port';
import {
  CabinetRepositoryOutputPort,
  CABINET_REPOSITORY_OUTPUT_PORT,
} from '../../../../cabinet/core/application/ports/out/cabinet-repository.output-port';
import { ImpulseSettingNotFound, MissingImpulseGraphDataFound, ImpulseAlreadyExists } from '../../domain/errors';
import { CabinetDoesNotExist } from '../../../../cabinet/core/domain/errors';

const PATTERN = '* Data start\n';

const measurementSettingPattern = {
  measuredBy: /(?<=saved by ).*/,
  source: /(?<=Source: ).*USB/,
  sweepLength: /(?<=Excitation: ).*Sine/,
  measuredAt: /(?<=Dated: ).*/,
  responseWindow: /(?<=Response measured over: ).*/,
  note: /(?<=Note: ).*/,
  peakValueBeforeInitialization: /[\s\S]*?(?= \/\/ Peak value before normalisation)/,
  peakIndex: /[\s\S]*?(?= \/\/ Peak index)/,
  responseLength: /[\s\S]*?(?= \/\/ Response length)/,
  sampleInterval: /[\s\S]*?(?= \/\/ Sample interval)/,
  startTime: /[\s\S]*?(?= \/\/ Start time)/,
};

enum MeasurementSettingNaming {
  MeasuredBy = 'measuredBy',
  Source = 'source',
  SweepLength = 'sweepLength',
  MeasuredAt = 'measuredAt',
  ResponseWindow = 'responseWindow',
  Note = 'note',
  PeakValueBeforeInitialization = 'peakValueBeforeInitialization',
  PeakIndex = 'peakIndex',
  ResponseLength = 'responseLength',
  SampleInterval = 'sampleInterval',
  StartTime = 'startTime',
}

interface SettingNameAndPattern {
  name: MeasurementSettingNaming;
  pattern: RegExp;
}
const SETTING_NAME_AND_PATTERNS: SettingNameAndPattern[] = [
  { name: MeasurementSettingNaming.MeasuredBy, pattern: measurementSettingPattern.measuredBy },
  { name: MeasurementSettingNaming.Source, pattern: measurementSettingPattern.source },
  { name: MeasurementSettingNaming.SweepLength, pattern: measurementSettingPattern.sweepLength },
  { name: MeasurementSettingNaming.MeasuredAt, pattern: measurementSettingPattern.measuredAt },
  {
    name: MeasurementSettingNaming.ResponseWindow,
    pattern: measurementSettingPattern.responseWindow,
  },
  { name: MeasurementSettingNaming.Note, pattern: measurementSettingPattern.note },
  {
    name: MeasurementSettingNaming.PeakValueBeforeInitialization,
    pattern: measurementSettingPattern.peakValueBeforeInitialization,
  },
  { name: MeasurementSettingNaming.PeakIndex, pattern: measurementSettingPattern.peakIndex },
  { name: MeasurementSettingNaming.ResponseLength, pattern: measurementSettingPattern.responseLength },
  { name: MeasurementSettingNaming.SampleInterval, pattern: measurementSettingPattern.sampleInterval },
  { name: MeasurementSettingNaming.StartTime, pattern: measurementSettingPattern.startTime },
];

@injectable()
export class RegisterImpulseService implements RegisterImpulseInputPort {
  constructor(
    @inject(IMPULSE_REPOSITORY_OUTPUT_PORT) private readonly impulseRepository: ImpulseRepositoryOutputPort,
    @inject(CABINET_REPOSITORY_OUTPUT_PORT) private readonly cabinetRepository: CabinetRepositoryOutputPort,
  ) {}

  async handler(input: RegisterImpulseInput): Promise<Impulse> {
    const existingCabinet = await this.cabinetRepository.getById(input.cabinetUid);
    if (!existingCabinet) {
      throw new CabinetDoesNotExist(input.cabinetUid);
    }

    const existingImpulse = await this.impulseRepository.getByCabinetUid(input.cabinetUid);
    if (existingImpulse) {
      throw new ImpulseAlreadyExists(input.cabinetUid);
    }
    const newImpulse: ImpulseProps = this.mapImpulse(input);
    this.verifyResponseLength(newImpulse);
    return await this.impulseRepository.save(new Impulse(newImpulse));
  }
  private mapImpulse(input: RegisterImpulseInput): ImpulseProps {
    const { measurements } = input;
    const measurementSettingsAndImpulseGraphData = measurements.split(PATTERN);
    const measurementSettings = measurementSettingsAndImpulseGraphData[0].split('\n');
    const impulseGraphData = measurementSettingsAndImpulseGraphData[1].split('\n');
    const mappedMeasurementSettings: ImpulseProps = this.mapMeasurementSettings(measurementSettings);
    const mappedImpulseGraphData: ImpulseGraph[] = this.mapImpulseGraphData(
      impulseGraphData,
      mappedMeasurementSettings,
    );
    return this.mapImpulseObject(mappedMeasurementSettings, mappedImpulseGraphData, input.cabinetUid);
  }

  private mapMeasurementSettings(measurementSettings: string[]): ImpulseProps {
    const mappedMeasurementSettings: Partial<ImpulseProps> = {};
    this.mapAllSettingsViaPatterns(mappedMeasurementSettings, measurementSettings);
    return mappedMeasurementSettings as ImpulseProps;
  }

  private mapAllSettingsViaPatterns(
    mappedMeasurementSettings: Partial<ImpulseProps>,
    measurementSettings: string[],
  ): ImpulseProps {
    for (const settingNameAndPattern of SETTING_NAME_AND_PATTERNS) {
      const setting = this.mapSingleSetting(settingNameAndPattern, measurementSettings);
      mappedMeasurementSettings[`${setting.name}`] = setting.value;
    }
    return mappedMeasurementSettings as ImpulseProps;
  }

  private mapSingleSetting(
    settingNameAndPattern: SettingNameAndPattern,
    measurementSettings: string[],
  ): {
    name: MeasurementSettingNaming;
    value: string;
  } {
    for (const setting of measurementSettings) {
      const matchedSetting = this.matchSetting(setting, settingNameAndPattern.pattern);
      if (matchedSetting) {
        return { name: settingNameAndPattern.name, value: matchedSetting.trim() };
      }
    }
    throw new ImpulseSettingNotFound(settingNameAndPattern.name);
  }

  private matchSetting(setting: string, settingPattern: RegExp): string | undefined {
    const match = setting.match(settingPattern);
    if (match?.length) return match[0];
    return undefined;
  }

  private mapImpulseGraphData(impulseGraphData: string[], mappedMeasurementSettings: ImpulseProps) {
    const { sampleInterval, startTime } = mappedMeasurementSettings;
    const impulseGraphTimeLine = this.getImpulseGraphTimeLine(
      impulseGraphData,
      Number(sampleInterval),
      Number(startTime),
    );
    return this.mapTimeAndDecibel(impulseGraphTimeLine, impulseGraphData);
  }

  private getImpulseGraphTimeLine(impulseGraphData: string[], sampleInterval: number, startTime: number) {
    const impulseGraphTimeLine: number[] = [];
    impulseGraphTimeLine.push(startTime);
    impulseGraphData.map(() => this.addNewTimeEntry(impulseGraphTimeLine, sampleInterval));
    return impulseGraphTimeLine;
  }

  private addNewTimeEntry(impulseGraphTimeLine: number[], sampleInterval: number) {
    const lastTimeEntry: number = impulseGraphTimeLine[impulseGraphTimeLine.length - 1];
    const newTimeEntry = lastTimeEntry + sampleInterval;
    return impulseGraphTimeLine.push(newTimeEntry);
  }

  private mapTimeAndDecibel(impulseGraphTimeLine: number[], impulseGraphData: string[]): ImpulseGraph[] {
    let counter = 0;
    const impulseGraph = [];
    for (const data of impulseGraphData) {
      const impulse: ImpulseGraph = { dbfs: Number(data), time: impulseGraphTimeLine[counter] };
      ++counter;
      impulseGraph.push(impulse);
    }
    return impulseGraph;
  }

  private mapImpulseObject(
    mappedMeasurementSettings: ImpulseProps,
    mappedImpulseGraphData: ImpulseGraph[],
    cabinetUid: string,
  ) {
    return {
      measuredBy: mappedMeasurementSettings.measuredBy,
      note: mappedMeasurementSettings.note,
      source: mappedMeasurementSettings.source,
      measuredAt: mappedMeasurementSettings.measuredAt,
      sweepLength: mappedMeasurementSettings.sweepLength,
      responseWindow: mappedMeasurementSettings.responseWindow,
      measurements: mappedImpulseGraphData,
      peakValueBeforeInitialization: mappedMeasurementSettings.peakValueBeforeInitialization,
      peakIndex: mappedMeasurementSettings.peakIndex,
      responseLength: mappedMeasurementSettings.responseLength,
      sampleInterval: mappedMeasurementSettings.sampleInterval,
      startTime: mappedMeasurementSettings.startTime,
      cabinetUid: cabinetUid,
    };
  }

  private verifyResponseLength(newImpulse: ImpulseProps) {
    if (newImpulse.measurements.length !== Number(newImpulse.responseLength)) {
      throw new MissingImpulseGraphDataFound(newImpulse.responseLength, newImpulse.measurements.length);
    }
  }
}
