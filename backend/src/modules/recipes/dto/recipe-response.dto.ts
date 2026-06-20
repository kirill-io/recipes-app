import { ApiProperty } from '@nestjs/swagger'
import { NutritionCalculationMode } from '../enums/nutrition-calculation-mode.enum'
import { RecipeDifficulty } from '../enums/recipe-difficulty.enum'
import { RecipeCategoryResponseDto } from './recipe-category-response.dto'
import { RecipeStepResponseDto } from './recipe-step-response.dto'
import { RecipeTagResponseDto } from './recipe-tag-response.dto'

export class RecipeResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Идентификатор рецепта',
  })
  id!: number

  @ApiProperty({
    example: 'Куриная грудка с рисом',
    description: 'Название рецепта',
  })
  title!: string

  @ApiProperty({
    example: 'kurinaya-grudka-s-risom',
    description: 'URL-идентификатор рецепта',
  })
  slug!: string

  @ApiProperty({
    example: 'Простой белковый рецепт на каждый день.',
    description: 'Краткое описание рецепта',
  })
  shortDescription!: string

  @ApiProperty({
    example: 'Сытный рецепт с куриной грудкой и рисом.',
    description: 'Полное описание рецепта',
    nullable: true,
  })
  description!: string | null

  @ApiProperty({
    example: null,
    description: 'URL изображения рецепта',
    nullable: true,
  })
  imageUrl!: string | null

  @ApiProperty({
    example: 35,
    description: 'Время приготовления в минутах',
    nullable: true,
  })
  cookingTimeMinutes!: number | null

  @ApiProperty({
    example: 2,
    description: 'Количество порций',
    nullable: true,
  })
  servings!: number | null

  @ApiProperty({
    enum: RecipeDifficulty,
    example: RecipeDifficulty.EASY,
    description: 'Сложность рецепта',
  })
  difficulty!: RecipeDifficulty

  @ApiProperty({
    type: RecipeCategoryResponseDto,
    description: 'Категория рецепта',
  })
  category!: RecipeCategoryResponseDto

  @ApiProperty({
    type: [RecipeTagResponseDto],
    description: 'Теги рецепта',
  })
  tags!: RecipeTagResponseDto[]

  @ApiProperty({
    type: [RecipeStepResponseDto],
    description: 'Шаги приготовления рецепта',
  })
  steps!: RecipeStepResponseDto[]

  @ApiProperty({
    enum: NutritionCalculationMode,
    example: NutritionCalculationMode.MANUAL,
    description: 'Режим расчёта КБЖУ',
  })
  nutritionCalculationMode!: NutritionCalculationMode

  @ApiProperty({
    example: 135,
    description: 'Калории на 100 г',
    nullable: true,
  })
  caloriesPer100g!: number | null

  @ApiProperty({
    example: 14.2,
    description: 'Белки на 100 г',
    nullable: true,
  })
  proteinsPer100g!: number | null

  @ApiProperty({
    example: 3.1,
    description: 'Жиры на 100 г',
    nullable: true,
  })
  fatsPer100g!: number | null

  @ApiProperty({
    example: 12.4,
    description: 'Углеводы на 100 г',
    nullable: true,
  })
  carbohydratesPer100g!: number | null

  @ApiProperty({
    example: 620,
    description: 'Калории всего на рецепт',
    nullable: true,
  })
  caloriesTotal!: number | null

  @ApiProperty({
    example: 65.2,
    description: 'Белки всего на рецепт',
    nullable: true,
  })
  proteinsTotal!: number | null

  @ApiProperty({
    example: 14.8,
    description: 'Жиры всего на рецепт',
    nullable: true,
  })
  fatsTotal!: number | null

  @ApiProperty({
    example: 58.4,
    description: 'Углеводы всего на рецепт',
    nullable: true,
  })
  carbohydratesTotal!: number | null

  @ApiProperty({
    example: 460,
    description: 'Вес готового блюда в граммах',
    nullable: true,
  })
  cookedWeightGrams!: number | null
}
