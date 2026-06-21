import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Recipe } from './entities/recipe.entity'
import { RecipeIngredient } from './entities/recipe-ingredient.entity'
import { RecipeStep } from './entities/recipe-step.entity'
import { RecipeTag } from './entities/recipe-tag.entity'
import { RecipesController } from './recipes.controller'
import { RecipesService } from './recipes.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, RecipeTag, RecipeStep, RecipeIngredient]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
