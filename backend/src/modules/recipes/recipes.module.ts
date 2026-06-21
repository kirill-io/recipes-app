import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Recipe, RecipeIngredient, RecipeStep, RecipeTag } from './entities'
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
