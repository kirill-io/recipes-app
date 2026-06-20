import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RecipeCategoryResponseDto } from './dto/recipe-category-response.dto'
import { RecipeListItemResponseDto } from './dto/recipe-list-item-response.dto'
import { RecipeResponseDto } from './dto/recipe-response.dto'
import { RecipeStepResponseDto } from './dto/recipe-step-response.dto'
import { RecipeTagResponseDto } from './dto/recipe-tag-response.dto'
import { Recipe } from './entities/recipe.entity'
import { RecipeStatus } from './enums/recipe-status.enum'

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

    return recipes.map((recipe) => this.mapRecipeToListItemResponseDto(recipe))
  }

  async findPublishedBySlug(slug: string): Promise<RecipeResponseDto> {
    const recipe = await this.recipesRepository.findOne({
      relations: {
        category: true,
        recipeTags: {
          tag: true,
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

    return this.mapRecipeToResponseDto(recipe)
  }

  private mapRecipeToListItemResponseDto(
    recipe: Recipe,
  ): RecipeListItemResponseDto {
    return {
      id: recipe.id,
      title: recipe.title,
      slug: recipe.slug,
      shortDescription: recipe.shortDescription,
      imageUrl: recipe.imageUrl,
      cookingTimeMinutes: recipe.cookingTimeMinutes,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      category: this.mapRecipeCategoryToResponseDto(recipe),
      tags: this.mapRecipeTagsToResponseDto(recipe),
      nutritionCalculationMode: recipe.nutritionCalculationMode,
      caloriesPer100g: this.toNullableNumber(recipe.caloriesPer100g),
      proteinsPer100g: this.toNullableNumber(recipe.proteinsPer100g),
      fatsPer100g: this.toNullableNumber(recipe.fatsPer100g),
      carbohydratesPer100g: this.toNullableNumber(recipe.carbohydratesPer100g),
    }
  }

  private mapRecipeToResponseDto(recipe: Recipe): RecipeResponseDto {
    return {
      id: recipe.id,
      title: recipe.title,
      slug: recipe.slug,
      shortDescription: recipe.shortDescription,
      description: recipe.description,
      imageUrl: recipe.imageUrl,
      cookingTimeMinutes: recipe.cookingTimeMinutes,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      category: this.mapRecipeCategoryToResponseDto(recipe),
      tags: this.mapRecipeTagsToResponseDto(recipe),
      steps: this.mapRecipeStepsToResponseDto(recipe),
      nutritionCalculationMode: recipe.nutritionCalculationMode,
      caloriesPer100g: this.toNullableNumber(recipe.caloriesPer100g),
      proteinsPer100g: this.toNullableNumber(recipe.proteinsPer100g),
      fatsPer100g: this.toNullableNumber(recipe.fatsPer100g),
      carbohydratesPer100g: this.toNullableNumber(recipe.carbohydratesPer100g),
      caloriesTotal: this.toNullableNumber(recipe.caloriesTotal),
      proteinsTotal: this.toNullableNumber(recipe.proteinsTotal),
      fatsTotal: this.toNullableNumber(recipe.fatsTotal),
      carbohydratesTotal: this.toNullableNumber(recipe.carbohydratesTotal),
      cookedWeightGrams: this.toNullableNumber(recipe.cookedWeightGrams),
    }
  }

  private mapRecipeCategoryToResponseDto(
    recipe: Recipe,
  ): RecipeCategoryResponseDto {
    return {
      id: recipe.category.id,
      name: recipe.category.name,
      slug: recipe.category.slug,
    }
  }

  private mapRecipeTagsToResponseDto(recipe: Recipe): RecipeTagResponseDto[] {
    const recipeTags = [...(recipe.recipeTags ?? [])]

    return recipeTags
      .filter((recipeTag) => recipeTag.tag.isActive)
      .sort((firstRecipeTag, secondRecipeTag) => {
        if (firstRecipeTag.sortOrder !== secondRecipeTag.sortOrder) {
          return firstRecipeTag.sortOrder - secondRecipeTag.sortOrder
        }

        return firstRecipeTag.tag.name.localeCompare(secondRecipeTag.tag.name)
      })
      .map(
        (recipeTag): RecipeTagResponseDto => ({
          id: recipeTag.tag.id,
          name: recipeTag.tag.name,
          slug: recipeTag.tag.slug,
        }),
      )
  }

  private mapRecipeStepsToResponseDto(recipe: Recipe): RecipeStepResponseDto[] {
    const steps = [...(recipe.steps ?? [])]

    return steps
      .sort(
        (firstStep, secondStep) => firstStep.stepNumber - secondStep.stepNumber,
      )
      .map(
        (step): RecipeStepResponseDto => ({
          id: step.id,
          stepNumber: step.stepNumber,
          description: step.description,
          imageUrl: step.imageUrl,
        }),
      )
  }

  private toNullableNumber(value: string | null): number | null {
    if (value === null) {
      return null
    }

    return Number(value)
  }
}
