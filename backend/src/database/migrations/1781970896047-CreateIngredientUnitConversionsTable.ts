import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIngredientUnitConversionsTable1781970896047 implements MigrationInterface {
    name = 'CreateIngredientUnitConversionsTable1781970896047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredient_unit_conversions" ("id" SERIAL NOT NULL, "ingredient_id" integer NOT NULL, "unit_id" integer NOT NULL, "grams_per_unit" numeric(10,2) NOT NULL, "description" text, "sort_order" integer NOT NULL DEFAULT '0', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3cbf69eb064d0fbfd90ad228d2c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ingredient_unit_conversions_pair" ON "ingredient_unit_conversions"  ("ingredient_id", "unit_id") `);
        await queryRunner.query(`ALTER TABLE "ingredient_unit_conversions" ADD CONSTRAINT "FK_044876911afe4e6a0a438047dc9" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient_unit_conversions" ADD CONSTRAINT "FK_02fc78a0409a719429741a1efab" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient_unit_conversions" DROP CONSTRAINT "FK_02fc78a0409a719429741a1efab"`);
        await queryRunner.query(`ALTER TABLE "ingredient_unit_conversions" DROP CONSTRAINT "FK_044876911afe4e6a0a438047dc9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ingredient_unit_conversions_pair"`);
        await queryRunner.query(`DROP TABLE "ingredient_unit_conversions"`);
    }

}
