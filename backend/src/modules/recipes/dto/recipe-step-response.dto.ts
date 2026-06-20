import { ApiProperty } from '@nestjs/swagger'

export class RecipeStepResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Идентификатор шага рецепта',
  })
  id!: number

  @ApiProperty({
    example: 1,
    description: 'Номер шага приготовления',
  })
  stepNumber!: number

  @ApiProperty({
    example: 'Отварите рис до готовности согласно инструкции на упаковке.',
    description: 'Описание шага приготовления',
  })
  description!: string

  @ApiProperty({
    example: null,
    description: 'URL изображения шага приготовления',
    nullable: true,
  })
  imageUrl!: string | null
}
