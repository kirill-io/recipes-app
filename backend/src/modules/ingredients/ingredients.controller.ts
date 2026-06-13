import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { IngredientResponseDto } from './dto/ingredient-response.dto'
import { IngredientsService } from './ingredients.service'

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  @ApiOperation({
    summary: 'Получить список активных ингредиентов',
  })
  @ApiOkResponse({
    description: 'Список активных ингредиентов',
    type: [IngredientResponseDto],
  })
  async findAll(): Promise<IngredientResponseDto[]> {
    return this.ingredientsService.findAllActive()
  }
}
