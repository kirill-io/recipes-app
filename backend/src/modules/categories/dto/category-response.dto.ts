import { ApiProperty } from '@nestjs/swagger'

export class CategoryResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Идентификатор категории',
  })
  id!: number

  @ApiProperty({
    example: 'Завтраки',
    description: 'Название категории',
  })
  name!: string

  @ApiProperty({
    example: 'breakfasts',
    description: 'URL-идентификатор категории',
  })
  slug!: string

  @ApiProperty({
    example: 'Рецепты для завтрака.',
    description: 'Описание категории',
    nullable: true,
  })
  description!: string | null

  @ApiProperty({
    example: 10,
    description: 'Порядок сортировки категории',
  })
  sortOrder!: number
}
