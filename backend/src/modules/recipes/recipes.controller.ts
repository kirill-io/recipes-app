import { Controller, Get, Param } from '@nestjs/common'
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { RecipeListItemResponseDto } from './dto/recipe-list-item-response.dto'
import { RecipeResponseDto } from './dto/recipe-response.dto'
import { RecipesService } from './recipes.service'

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  @ApiOperation({
    summary: 'Получить список опубликованных рецептов',
  })
  @ApiOkResponse({
    description: 'Список опубликованных рецептов',
    type: [RecipeListItemResponseDto],
  })
  async findAll(): Promise<RecipeListItemResponseDto[]> {
    return this.recipesService.findAllPublished()
  }

  @Get(':slug')
  @ApiOperation({
    summary: 'Получить опубликованный рецепт по slug',
  })
  @ApiOkResponse({
    description: 'Опубликованный рецепт',
    type: RecipeResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Рецепт не найден',
  })
  async findOneBySlug(@Param('slug') slug: string): Promise<RecipeResponseDto> {
    return this.recipesService.findPublishedBySlug(slug)
  }
}
