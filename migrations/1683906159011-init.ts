import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1683906159011 implements MigrationInterface {
  name = 'init1683906159011';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "owner" ("owner_uid" uuid NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "ownername" varchar NOT NULL, "email" varchar NOT NULL, "phone_number" varchar NOT NULL, "city" varchar NOT NULL, "description" varchar NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e599b90870d9d3155e641063ca5" PRIMARY KEY ("owner_uid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cabinet" ("cabinet_uid" uuid NOT NULL, "brand_name" varchar NOT NULL, "product_name" varchar NOT NULL, "enclosure_type" varchar NOT NULL, "weight" float NOT NULL, "dimension" varchar NOT NULL, "manufacturing_year" integer NOT NULL, "description" varchar NOT NULL, "owner_uid" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_4b8cadc8a1d7af2b417fd5ca59f" PRIMARY KEY ("cabinet_uid"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" ADD CONSTRAINT "FK_296304c6522d65c506b46fbfe4a" FOREIGN KEY ("owner_uid") REFERENCES "owner"("owner_uid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `CREATE TABLE "driver" ("driver_uid" uuid NOT NULL, CONSTRAINT "PK_2f25fae55a3bd80337501b310e3" PRIMARY KEY ("driver_uid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "impedance" ("impedance_uid" uuid NOT NULL, CONSTRAINT "PK_197314cb3b86f25abee280469ff" PRIMARY KEY ("impedance_uid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "frequency" ("frequency_uid" uuid NOT NULL, CONSTRAINT "PK_df955cae05f17b2bcf5045cc021" PRIMARY KEY ("frequency_uid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "impulse" ("impulse_uid" uuid NOT NULL, CONSTRAINT "PK_defcb32ebd8a501832969358f0f" PRIMARY KEY ("impulse_uid"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cabinet" DROP CONSTRAINT "FK_296304c6522d65c506b46fbfe4a"`);
    await queryRunner.query(`DROP TABLE "owner"`);
    await queryRunner.query(`DROP TABLE "cabinet"`);
    await queryRunner.query(`DROP TABLE "driver"`);
    await queryRunner.query(`DROP TABLE "impedance"`);
    await queryRunner.query(`DROP TABLE "frequency"`);
    await queryRunner.query(`DROP TABLE "impulse"`);
  }
}
