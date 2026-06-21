import { ApiPropertyOptional } from '@nestjs/swagger'
import { RecipeDifficulty } from '../enums'

export class RecipesQueryDto {
  @ApiPropertyOptional({
    example: 'breakfasts',
    description: 'Slug категории для фильтрации рецептов',
  })
  category?: string

  @ApiPropertyOptional({
    example: 'pp',
    description: 'Slug тега для фильтрации рецептов',
  })
  tag?: string

  @ApiPropertyOptional({
    example: 'овсянка',
    description: 'Поисковая строка по названию и описанию рецепта',
  })
  search?: string

  @ApiPropertyOptional({
    enum: RecipeDifficulty,
    example: RecipeDifficulty.EASY,
    description: 'Сложность рецепта',
  })
  difficulty?: RecipeDifficulty
}
