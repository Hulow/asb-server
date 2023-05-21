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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "driver"`);
    await queryRunner.query(`DROP TABLE "cabinet"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
