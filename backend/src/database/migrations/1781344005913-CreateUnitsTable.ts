import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUnitsTable1781344005913 implements MigrationInterface {
    name = 'CreateUnitsTable1781344005913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."units_type_enum" AS ENUM('mass', 'volume', 'count')`);
        await queryRunner.query(`CREATE TABLE "units" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "short_name" character varying(40) NOT NULL, "slug" character varying(160) NOT NULL, "type" "public"."units_type_enum" NOT NULL, "conversion_factor_to_base" numeric(10,3) NOT NULL DEFAULT '1', "sort_order" integer NOT NULL DEFAULT '0', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_5a8f2f064919b587d93936cb223" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_units_slug" ON "units"  ("slug") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_units_slug"`);
        await queryRunner.query(`DROP TABLE "units"`);
        await queryRunner.query(`DROP TYPE "public"."units_type_enum"`);
    }

}
