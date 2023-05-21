import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1683906159011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "driver" ("uid" uuid NOT NULL, "brand_name" varchar NOT NULL, "product_name" varchar NOT NULL, "driver_type" varchar NOT NULL, "nominal_diameter" float NOT NULL, "nominal_impedance" float NOT NULL, "continuous_power_handling" float NOT NULL, "user_id" integer NOT NULL, "cabinet_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_df955cae05f17b2bcf5045cc021" PRIMARY KEY ("uid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cabinet" ("uid" uuid NOT NULL, "brand_name" varchar NOT NULL, "product_name" varchar NOT NULL, "enclosure_type" varchar NOT NULL, "weight" float NOT NULL, "dimension" varchar NOT NULL, "manufacturing_year" integer NOT NULL, "description" varchar NOT NULL, "user_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2f25fae55a3bd80337501b310e3" PRIMARY KEY ("uid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("uid" uuid NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "username" varchar NOT NULL, "email" float NOT NULL, "phone_number" varchar NOT NULL, "city" integer NOT NULL, "description" varchar NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_4b8cadc8a1d7af2b417fd5ca59f" PRIMARY KEY ("uid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "impedance" ("uid" uuid NOT NULL, "piston_diameter" varchar NOT NULL, "resonance_frequency" varchar NOT NULL, "dc_resistance" varchar NOT NULL, "ac_resistance" float NOT NULL, "mechanical_damping" varchar NOT NULL, "electrical_damping" integer NOT NULL, "total_damping" varchar NOT NULL, "equivalence_compliance" integer NOT NULL, "voice_coil_inductance" integer NOT NULL, "efficiency" integer NOT NULL, "sensitivity" integer NOT NULL, "cone_mass" integer NOT NULL, "suspension_compliance" integer NOT NULL, "force_factor" integer NOT NULL, "kr" integer NOT NULL, "xr" integer NOT NULL, "ki" integer NOT NULL, "xi" integer NOT NULL, "user_id" integer NOT NULL, "driver_id" integer NOT NULL, "cabinet_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_197314cb3b86f25abee280469ff" PRIMARY KEY ("uid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "frequency" ("uid" uuid NOT NULL, "measured_by" varchar NOT NULL, "measured_from" varchar NOT NULL, "sampling" varchar NOT NULL, "measured_at" float NOT NULL, "frequency_weightings" varchar NOT NULL, "target_level" integer NOT NULL, "measurement_note" varchar NOT NULL, "smoothing" integer NOT NULL, "measurements" integer NOT NULL, "efficiency" jsonb NOT NULL, "user_id" integer NOT NULL, "driver_id" integer NOT NULL, "cabinet_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e599b90870d9d3155e641063ca5" PRIMARY KEY ("uid"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "driver"`);
    await queryRunner.query(`DROP TABLE "cabinet"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "impedance"`);
    await queryRunner.query(`DROP TABLE "frequency"`);
  }
}
