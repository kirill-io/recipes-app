import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRecipesTable1781979633277 implements MigrationInterface {
    name = 'CreateRecipesTable1781979633277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."recipes_difficulty_enum" AS ENUM('easy', 'medium', 'hard')`);
        await queryRunner.query(`CREATE TYPE "public"."recipes_status_enum" AS ENUM('draft', 'pending_review', 'published', 'rejected', 'archived')`);
        await queryRunner.query(`CREATE TYPE "public"."recipes_nutrition_calculation_mode_enum" AS ENUM('manual', 'calculated')`);
        await queryRunner.query(`CREATE TABLE "recipes" ("id" SERIAL NOT NULL, "title" character varying(180) NOT NULL, "slug" character varying(220) NOT NULL, "short_description" character varying(300) NOT NULL, "description" text, "image_url" text, "cooking_time_minutes" integer, "servings" integer, "difficulty" "public"."recipes_difficulty_enum" NOT NULL DEFAULT 'easy', "category_id" integer NOT NULL, "status" "public"."recipes_status_enum" NOT NULL DEFAULT 'draft', "nutrition_calculation_mode" "public"."recipes_nutrition_calculation_mode_enum" NOT NULL DEFAULT 'manual', "calories_per_100g" numeric(8,2), "proteins_per_100g" numeric(8,2), "fats_per_100g" numeric(8,2), "carbohydrates_per_100g" numeric(8,2), "calories_total" numeric(10,2), "proteins_total" numeric(10,2), "fats_total" numeric(10,2), "carbohydrates_total" numeric(10,2), "cooked_weight_grams" numeric(10,2), "sort_order" integer NOT NULL DEFAULT '0', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_recipes_slug" ON "recipes"  ("slug") `);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_5be5ead33de507b1086b8e5678b" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_5be5ead33de507b1086b8e5678b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_recipes_slug"`);
        await queryRunner.query(`DROP TABLE "recipes"`);
        await queryRunner.query(`DROP TYPE "public"."recipes_nutrition_calculation_mode_enum"`);
        await queryRunner.query(`DROP TYPE "public"."recipes_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."recipes_difficulty_enum"`);
    }

}
