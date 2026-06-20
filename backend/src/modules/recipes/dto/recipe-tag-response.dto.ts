import { ApiProperty } from '@nestjs/swagger'

export class RecipeTagResponseDto {
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
}
