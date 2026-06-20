import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRecipeTagsTable1781981278333 implements MigrationInterface {
    name = 'CreateRecipeTagsTable1781981278333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe_tags" ("id" SERIAL NOT NULL, "recipe_id" integer NOT NULL, "tag_id" integer NOT NULL, "sort_order" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_ff597b26654f48747ae5c25da50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_recipe_tags_pair" ON "recipe_tags"  ("recipe_id", "tag_id") `);
        await queryRunner.query(`ALTER TABLE "recipe_tags" ADD CONSTRAINT "FK_debe611aa6b0e4876f0c6ec77a9" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_tags" ADD CONSTRAINT "FK_03a9973d20215e31676a3d90937" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_tags" DROP CONSTRAINT "FK_03a9973d20215e31676a3d90937"`);
        await queryRunner.query(`ALTER TABLE "recipe_tags" DROP CONSTRAINT "FK_debe611aa6b0e4876f0c6ec77a9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_recipe_tags_pair"`);
        await queryRunner.query(`DROP TABLE "recipe_tags"`);
    }

}
