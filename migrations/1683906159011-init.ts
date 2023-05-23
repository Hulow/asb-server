import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1683906159011 implements MigrationInterface {
  name = 'init1683906159011';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("user_uid" uuid NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "username" varchar NOT NULL, "email" float NOT NULL, "phone_number" varchar NOT NULL, "city" integer NOT NULL, "description" varchar NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e599b90870d9d3155e641063ca5" PRIMARY KEY ("user_uid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "driver" ("driver_uid" uuid NOT NULL, "brand_name" varchar NOT NULL, "product_name" varchar NOT NULL, "driver_type" varchar NOT NULL, "manufacturing_year" integer NOT NULL, "nominal_diameter" float NOT NULL, "nominal_impedance" float NOT NULL, "continuous_power_handling" float NOT NULL, "cabinet_uid" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2f25fae55a3bd80337501b310e3" PRIMARY KEY ("driver_uid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cabinet" ("cabinet_uid" uuid NOT NULL, "brand_name" varchar NOT NULL, "product_name" varchar NOT NULL, "enclosure_type" varchar NOT NULL, "weight" float NOT NULL, "dimension" varchar NOT NULL, "manufacturing_year" integer NOT NULL, "description" varchar NOT NULL, "user_uid" uuid NOT NULL, "impedance_uid" uuid NOT NULL UNIQUE, "frequency_uid" uuid NOT NULL UNIQUE, "impulse_uid" uuid NOT NULL UNIQUE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_4b8cadc8a1d7af2b417fd5ca59f" PRIMARY KEY ("cabinet_uid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "impedance" ("impedance_uid" uuid NOT NULL, "piston_diameter" varchar NOT NULL, "resonance_frequency" varchar NOT NULL, "dc_resistance" varchar NOT NULL, "ac_resistance" float NOT NULL, "mechanical_damping" varchar NOT NULL, "electrical_damping" integer NOT NULL, "total_damping" varchar NOT NULL, "equivalence_compliance" integer NOT NULL, "voice_coil_inductance" integer NOT NULL, "efficiency" integer NOT NULL, "sensitivity" integer NOT NULL, "cone_mass" integer NOT NULL, "suspension_compliance" integer NOT NULL, "force_factor" integer NOT NULL, "kr" integer NOT NULL, "xr" integer NOT NULL, "ki" integer NOT NULL, "xi" integer NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_197314cb3b86f25abee280469ff" PRIMARY KEY ("impedance_uid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "frequency" ("frequency_uid" uuid NOT NULL, "measured_by" varchar NOT NULL, "measured_from" varchar NOT NULL, "sweep_length" varchar NOT NULL, "measured_at" TIMESTAMP WITH TIME ZONE NOT NULL, "frequency_weightings" varchar NOT NULL, "target_level" integer NOT NULL, "note" varchar NOT NULL, "smoothing" integer NOT NULL, "measurements" integer NOT NULL, "efficiency" jsonb NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_df955cae05f17b2bcf5045cc021" PRIMARY KEY ("frequency_uid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "impulse" ("impulse_uid" uuid NOT NULL, "measured_by" varchar NOT NULL, "note" varchar NOT NULL, "source" varchar NOT NULL, "measured_at" TIMESTAMP WITH TIME ZONE NOT NULL, "sweep_length" varchar NOT NULL, "response_window" varchar NOT NULL, "sample_interval" varchar NOT NULL, "measurements" jsonb NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_defcb32ebd8a501832969358f0f" PRIMARY KEY ("impulse_uid"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "driver" ADD CONSTRAINT "FK_32bcbf28fad994478cc02ccbefa" FOREIGN KEY ("cabinet_uid") REFERENCES "cabinet"("cabinet_uid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" ADD CONSTRAINT "FK_296304c6522d65c506b46fbfe4a" FOREIGN KEY ("user_uid") REFERENCES "user"("user_uid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" ADD CONSTRAINT "FK_296304c6522d65cca4ee43671db" FOREIGN KEY ("impulse_uid") REFERENCES "impulse"("impulse_uid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" ADD CONSTRAINT "FK_32bcbf28fad99442f503a96f32f" FOREIGN KEY ("frequency_uid") REFERENCES "frequency"("frequency_uid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" ADD CONSTRAINT "FK_296304c6522d65c61021682ded4" FOREIGN KEY ("impedance_uid") REFERENCES "impedance"("impedance_uid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "driver" DROP CONSTRAINT "FK_32bcbf28fad994478cc02ccbefa"`);
    await queryRunner.query(`ALTER TABLE "cabinet" DROP CONSTRAINT "FK_296304c6522d65c506b46fbfe4a"`);
    await queryRunner.query(`ALTER TABLE "cabinet" DROP CONSTRAINT "FK_296304c6522d65cca4ee43671db"`);
    await queryRunner.query(`ALTER TABLE "cabinet" DROP CONSTRAINT "FK_32bcbf28fad99442f503a96f32f"`);
    await queryRunner.query(`ALTER TABLE "cabinet" DROP CONSTRAINT "FK_296304c6522d65c61021682ded4"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "driver"`);
    await queryRunner.query(`DROP TABLE "cabinet"`);
    await queryRunner.query(`DROP TABLE "impedance"`);
    await queryRunner.query(`DROP TABLE "frequency"`);
    await queryRunner.query(`DROP TABLE "impulse"`);
  }
}
