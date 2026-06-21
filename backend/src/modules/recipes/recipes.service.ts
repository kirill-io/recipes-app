import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RecipeListItemResponseDto, RecipeResponseDto } from './dto'
import { Recipe } from './entities'
import { RecipeStatus } from './enums'
import {
  mapRecipeToListItemResponseDto,
  mapRecipeToResponseDto,
} from './mappers'

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipesRepository: Repository<Recipe>,
  ) {}

  async findAllPublished(): Promise<RecipeListItemResponseDto[]> {
    const recipes = await this.recipesRepository.find({
      relations: {
        category: true,
        recipeTags: {
          tag: true,
        },
      },
      where: {
        isActive: true,
        status: RecipeStatus.PUBLISHED,
        category: {
          isActive: true,
        },
      },
      order: {
        sortOrder: 'ASC',
        title: 'ASC',
      },
    })

    return recipes.map(mapRecipeToListItemResponseDto)
  }

  async findPublishedBySlug(slug: string): Promise<RecipeResponseDto> {
    const recipe = await this.recipesRepository.findOne({
      relations: {
        category: true,
        recipeTags: {
          tag: true,
        },
        recipeIngredients: {
          ingredient: true,
          unit: true,
        },
        steps: true,
      },
      where: {
        slug,
        isActive: true,
        status: RecipeStatus.PUBLISHED,
        category: {
          isActive: true,
        },
      },
    })

    if (!recipe) {
      throw new NotFoundException('Рецепт не найден')
    }

    return mapRecipeToResponseDto(recipe)
  }
}
