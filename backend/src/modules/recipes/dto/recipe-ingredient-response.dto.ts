import { ApiProperty } from '@nestjs/swagger'

export class RecipeIngredientResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Идентификатор ингредиента в составе рецепта',
  })
  id!: number

  @ApiProperty({
    example: 1,
    description: 'Идентификатор ингредиента из справочника ингредиентов',
  })
  ingredientId!: number

  @ApiProperty({
    example: 'Куриная грудка',
    description: 'Название ингредиента из справочника ингредиентов',
  })
  ingredientName!: string

  @ApiProperty({
    example: 'kurinaya-grudka',
    description: 'URL-идентификатор ингредиента',
  })
  ingredientSlug!: string

  @ApiProperty({
    example: 1,
    description: 'Идентификатор единицы измерения',
  })
  unitId!: number

  @ApiProperty({
    example: 'Грамм',
    description: 'Название единицы измерения',
  })
  unitName!: string

  @ApiProperty({
    example: 'г',
    description: 'Краткое обозначение единицы измерения',
  })
  unitShortName!: string

  @ApiProperty({
    example: 'gramm',
    description: 'URL-идентификатор единицы измерения',
  })
  unitSlug!: string

  @ApiProperty({
    example: 250,
    description: 'Количество ингредиента в выбранной единице измерения',
  })
  amount!: number

  @ApiProperty({
    example: 250,
    description: 'Вес ингредиента в граммах до приготовления',
  })
  grams!: number

  @ApiProperty({
    example: 'Куриная грудка без кожи',
    description: 'Название ингредиента для отображения в конкретном рецепте',
    nullable: true,
  })
  displayName!: string | null

  @ApiProperty({
    example: 'Нарезать небольшими кусочками',
    description: 'Примечание к ингредиенту в рамках рецепта',
    nullable: true,
  })
  note!: string | null

  @ApiProperty({
    example: 'Основные ингредиенты',
    description: 'Название группы ингредиентов в рецепте',
    nullable: true,
  })
  groupTitle!: string | null

  @ApiProperty({
    example: 10,
    description: 'Порядок отображения ингредиента в рецепте',
  })
  sortOrder!: number
}
