import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIngredientsTable1781348669148 implements MigrationInterface {
    name = 'CreateIngredientsTable1781348669148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredients" ("id" SERIAL NOT NULL, "name" character varying(160) NOT NULL, "slug" character varying(200) NOT NULL, "description" text, "calories_per_100g" numeric(8,2) NOT NULL, "proteins_per_100g" numeric(8,2) NOT NULL, "fats_per_100g" numeric(8,2) NOT NULL, "carbohydrates_per_100g" numeric(8,2) NOT NULL, "sort_order" integer NOT NULL DEFAULT '0', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ingredients_slug" ON "ingredients"  ("slug") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_ingredients_slug"`);
        await queryRunner.query(`DROP TABLE "ingredients"`);
    }

}
