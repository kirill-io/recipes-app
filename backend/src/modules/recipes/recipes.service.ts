import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brackets, Repository } from 'typeorm'
import {
  RecipeListItemResponseDto,
  RecipeResponseDto,
  RecipesQueryDto,
} from './dto'
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

  async findAllPublished(
    query: RecipesQueryDto = {},
  ): Promise<RecipeListItemResponseDto[]> {
    const categorySlug = query.category?.trim()
    const tagSlug = query.tag?.trim()
    const searchValue = query.search?.trim()
    const difficulty = query.difficulty

    const recipesQueryBuilder = this.recipesRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.category', 'category')
      .leftJoinAndSelect('recipe.recipeTags', 'recipeTag')
      .leftJoinAndSelect('recipeTag.tag', 'tag')
      .where('recipe.is_active = :isActive', { isActive: true })
      .andWhere('recipe.status = :status', {
        status: RecipeStatus.PUBLISHED,
      })
      .andWhere('category.is_active = :categoryIsActive', {
        categoryIsActive: true,
      })

    if (categorySlug) {
      recipesQueryBuilder.andWhere('category.slug = :categorySlug', {
        categorySlug,
      })
    }

    if (tagSlug) {
      recipesQueryBuilder
        .innerJoin('recipe.recipeTags', 'filteredRecipeTag')
        .innerJoin('filteredRecipeTag.tag', 'filteredTag')
        .andWhere('filteredTag.slug = :tagSlug', { tagSlug })
        .andWhere('filteredTag.is_active = :filteredTagIsActive', {
          filteredTagIsActive: true,
        })
    }

    if (searchValue) {
      const searchPattern = `%${searchValue}%`

      recipesQueryBuilder.andWhere(
        new Brackets((searchQueryBuilder) => {
          searchQueryBuilder
            .where('recipe.title ILIKE :searchPattern', {
              searchPattern,
            })
            .orWhere('recipe.short_description ILIKE :searchPattern', {
              searchPattern,
            })
            .orWhere('recipe.description ILIKE :searchPattern', {
              searchPattern,
            })
        }),
      )
    }

    if (difficulty) {
      recipesQueryBuilder.andWhere('recipe.difficulty = :difficulty', {
        difficulty,
      })
    }

    const recipes = await recipesQueryBuilder
      .orderBy('recipe.sort_order', 'ASC')
      .addOrderBy('recipe.title', 'ASC')
      .addOrderBy('recipeTag.sort_order', 'ASC')
      .addOrderBy('tag.name', 'ASC')
      .getMany()

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
