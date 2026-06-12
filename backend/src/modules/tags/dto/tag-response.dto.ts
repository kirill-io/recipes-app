import { ApiProperty } from '@nestjs/swagger'

export class TagResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Идентификатор тега',
  })
  id!: number

  @ApiProperty({
    example: 'ПП',
    description: 'Название тега',
  })
  name!: string

  @ApiProperty({
    example: 'pp',
    description: 'URL-идентификатор тега',
  })
  slug!: string

  @ApiProperty({
    example: 'Рецепты для правильного питания.',
    description: 'Описание тега',
    nullable: true,
  })
  description!: string | null

  @ApiProperty({
    example: 10,
    description: 'Порядок сортировки тега',
  })
  sortOrder!: number
}
