import { ApiProperty } from '@nestjs/swagger'

export class IngredientResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Идентификатор ингредиента',
  })
  id!: number

  @ApiProperty({
    example: 'Куриная грудка',
    description: 'Название ингредиента',
  })
  name!: string

  @ApiProperty({
    example: 'chicken-breast',
    description: 'URL-идентификатор ингредиента',
  })
  slug!: string

  @ApiProperty({
    example: 'Филе куриной грудки без кожи.',
    description: 'Описание ингредиента',
    nullable: true,
  })
  description!: string | null

  @ApiProperty({
    example: 110,
    description: 'Калории на 100 г',
  })
  caloriesPer100g!: number

  @ApiProperty({
    example: 23.1,
    description: 'Белки на 100 г',
  })
  proteinsPer100g!: number

  @ApiProperty({
    example: 1.2,
    description: 'Жиры на 100 г',
  })
  fatsPer100g!: number

  @ApiProperty({
    example: 0,
    description: 'Углеводы на 100 г',
  })
  carbohydratesPer100g!: number

  @ApiProperty({
    example: 10,
    description: 'Порядок сортировки ингредиента',
  })
  sortOrder!: number
}
