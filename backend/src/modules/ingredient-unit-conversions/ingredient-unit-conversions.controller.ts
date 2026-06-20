import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { IngredientUnitConversionResponseDto } from './dto/ingredient-unit-conversion-response.dto'
import { IngredientUnitConversionsService } from './ingredient-unit-conversions.service'

@ApiTags('ingredient-unit-conversions')
@Controller('ingredient-unit-conversions')
export class IngredientUnitConversionsController {
  constructor(
    private readonly ingredientUnitConversionsService: IngredientUnitConversionsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Получить список активных конверсий ингредиентов в граммы',
  })
  @ApiOkResponse({
    description: 'Список активных конверсий ингредиентов в граммы',
    type: [IngredientUnitConversionResponseDto],
  })
  async findAll(): Promise<IngredientUnitConversionResponseDto[]> {
    return this.ingredientUnitConversionsService.findAllActive()
  }
}
