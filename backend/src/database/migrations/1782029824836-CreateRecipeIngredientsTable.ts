import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRecipeIngredientsTable1782029824836 implements MigrationInterface {
    name = 'CreateRecipeIngredientsTable1782029824836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe_ingredients" ("id" SERIAL NOT NULL, "recipe_id" integer NOT NULL, "ingredient_id" integer NOT NULL, "unit_id" integer NOT NULL, "amount" numeric(10,2) NOT NULL, "grams" numeric(10,2) NOT NULL, "display_name" character varying(160), "note" character varying(255), "group_title" character varying(120), "sort_order" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8f15a314e55970414fc92ffb532" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ_recipe_ingredients_recipe_ingredient_unit" ON "recipe_ingredients"  ("recipe_id", "ingredient_id", "unit_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_recipe_ingredients_unit_id" ON "recipe_ingredients"  ("unit_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_recipe_ingredients_ingredient_id" ON "recipe_ingredients"  ("ingredient_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_recipe_ingredients_recipe_id" ON "recipe_ingredients"  ("recipe_id") `);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "FK_f240137e0e13bed80bdf64fed53" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "FK_133545365243061dc2c55dc1373" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "FK_1939487edb0b061a9b73c65c30b" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "FK_1939487edb0b061a9b73c65c30b"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "FK_133545365243061dc2c55dc1373"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "FK_f240137e0e13bed80bdf64fed53"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_recipe_ingredients_recipe_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_recipe_ingredients_ingredient_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_recipe_ingredients_unit_id"`);
        await queryRunner.query(`DROP INDEX "public"."UQ_recipe_ingredients_recipe_ingredient_unit"`);
        await queryRunner.query(`DROP TABLE "recipe_ingredients"`);
    }

}
