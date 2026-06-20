import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRecipeStepsTable1781982179308 implements MigrationInterface {
    name = 'CreateRecipeStepsTable1781982179308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe_steps" ("id" SERIAL NOT NULL, "recipe_id" integer NOT NULL, "step_number" integer NOT NULL, "description" text NOT NULL, "image_url" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6fa74d528684e8dc16bfe8582f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_recipe_steps_recipe_step_number" ON "recipe_steps"  ("recipe_id", "step_number") `);
        await queryRunner.query(`ALTER TABLE "recipe_steps" ADD CONSTRAINT "FK_38ada029d0ae403b4d552c88527" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_steps" DROP CONSTRAINT "FK_38ada029d0ae403b4d552c88527"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_recipe_steps_recipe_step_number"`);
        await queryRunner.query(`DROP TABLE "recipe_steps"`);
    }

}
