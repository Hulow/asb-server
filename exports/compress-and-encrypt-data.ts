import zlib from 'zlib';

export class CompressAndEncryptData {
  constructor(private readonly data: object) {
    this.data = data;
  }

  compressAndEncryptData(): string {
    const compressedData = this.compressData(this.data);
    return this.encryptData(compressedData);
  }

  private compressData(data: object) {
    return zlib.gzipSync(JSON.stringify(data));
  }

  private encryptData(data: Buffer) {
    return data.toString('base64');
  }
}
