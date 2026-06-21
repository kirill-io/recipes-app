import { ApiProperty } from '@nestjs/swagger'
import { NutritionCalculationMode, RecipeDifficulty } from '../enums'
import { RecipeCategoryResponseDto } from './recipe-category-response.dto'
import { RecipeTagResponseDto } from './recipe-tag-response.dto'

export class RecipeListItemResponseDto {
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
}
