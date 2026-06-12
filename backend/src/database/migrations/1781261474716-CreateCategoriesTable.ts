import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoriesTable1781261474716 implements MigrationInterface {
    name = 'CreateCategoriesTable1781261474716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "slug" character varying(160) NOT NULL, "description" text, "sort_order" integer NOT NULL DEFAULT '0', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_categories_slug" ON "categories"  ("slug") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_categories_slug"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
