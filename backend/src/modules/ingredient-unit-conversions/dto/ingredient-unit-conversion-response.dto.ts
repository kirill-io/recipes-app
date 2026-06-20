import { ApiProperty } from '@nestjs/swagger'

export class IngredientUnitConversionResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Идентификатор конверсии',
  })
  id!: number

  @ApiProperty({
    example: 2,
    description: 'Идентификатор ингредиента',
  })
  ingredientId!: number

  @ApiProperty({
    example: 'Куриное яйцо',
    description: 'Название ингредиента',
  })
  ingredientName!: string

  @ApiProperty({
    example: 'kurinoe-yayco',
    description: 'URL-идентификатор ингредиента',
  })
  ingredientSlug!: string

  @ApiProperty({
    example: 3,
    description: 'Идентификатор единицы измерения',
  })
  unitId!: number

  @ApiProperty({
    example: 'Штука',
    description: 'Название единицы измерения',
  })
  unitName!: string

  @ApiProperty({
    example: 'шт',
    description: 'Краткое название единицы измерения',
  })
  unitShortName!: string

  @ApiProperty({
    example: 'shtuka',
    description: 'URL-идентификатор единицы измерения',
  })
  unitSlug!: string

  @ApiProperty({
    example: 55,
    description: 'Количество грамм в одной указанной единице ингредиента',
  })
  gramsPerUnit!: number

  @ApiProperty({
    example: 'Среднее куриное яйцо без скорлупы.',
    description: 'Описание конверсии',
    nullable: true,
  })
  description!: string | null

  @ApiProperty({
    example: 10,
    description: 'Порядок сортировки конверсии',
  })
  sortOrder!: number
}
