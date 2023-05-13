import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1683906159011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "driver" ("uid" uuid NOT NULL, "brand_name" varchar NOT NULL, "product_name" varchar NOT NULL, "driver_type" varchar NOT NULL, "nominal_diameter" float NOT NULL, "nominal_impedance" float NOT NULL, "continuous_power_handling" float NOT NULL, "user_id" integer NOT NULL, "cabinet_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_df955cae05f17b2bcf5045cc021" PRIMARY KEY ("uid"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "driver"`);
  }
}
