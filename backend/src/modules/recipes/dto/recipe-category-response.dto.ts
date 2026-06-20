import { ApiProperty } from '@nestjs/swagger'

export class RecipeCategoryResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Идентификатор категории',
  })
  id!: number

  @ApiProperty({
    example: 'Основные блюда',
    description: 'Название категории',
  })
  name!: string

  @ApiProperty({
    example: 'osnovnye-blyuda',
    description: 'URL-идентификатор категории',
  })
  slug!: string
}
