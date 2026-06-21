import {
  RecipeCategoryResponseDto,
  RecipeIngredientResponseDto,
  RecipeListItemResponseDto,
  RecipeResponseDto,
  RecipeStepResponseDto,
  RecipeTagResponseDto,
} from '../dto'
import { Recipe } from '../entities'
import { getRecipeNutritionValues, toNullableNumber } from '../utils'

export const mapRecipeToListItemResponseDto = (
  recipe: Recipe,
): RecipeListItemResponseDto => {
  return {
    id: recipe.id,
    title: recipe.title,
    slug: recipe.slug,
    shortDescription: recipe.shortDescription,
    imageUrl: recipe.imageUrl,
    cookingTimeMinutes: recipe.cookingTimeMinutes,
    servings: recipe.servings,
    difficulty: recipe.difficulty,
    category: mapRecipeCategoryToResponseDto(recipe),
    tags: mapRecipeTagsToResponseDto(recipe),
    nutritionCalculationMode: recipe.nutritionCalculationMode,
    caloriesPer100g: toNullableNumber(recipe.caloriesPer100g),
    proteinsPer100g: toNullableNumber(recipe.proteinsPer100g),
    fatsPer100g: toNullableNumber(recipe.fatsPer100g),
    carbohydratesPer100g: toNullableNumber(recipe.carbohydratesPer100g),
  }
}

export const mapRecipeToResponseDto = (recipe: Recipe): RecipeResponseDto => {
  const nutritionValues = getRecipeNutritionValues(recipe)

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
    category: mapRecipeCategoryToResponseDto(recipe),
    tags: mapRecipeTagsToResponseDto(recipe),
    ingredients: mapRecipeIngredientsToResponseDto(recipe),
    steps: mapRecipeStepsToResponseDto(recipe),
    nutritionCalculationMode: recipe.nutritionCalculationMode,
    caloriesPer100g: nutritionValues.caloriesPer100g,
    proteinsPer100g: nutritionValues.proteinsPer100g,
    fatsPer100g: nutritionValues.fatsPer100g,
    carbohydratesPer100g: nutritionValues.carbohydratesPer100g,
    caloriesTotal: nutritionValues.caloriesTotal,
    proteinsTotal: nutritionValues.proteinsTotal,
    fatsTotal: nutritionValues.fatsTotal,
    carbohydratesTotal: nutritionValues.carbohydratesTotal,
    caloriesPerServing: nutritionValues.caloriesPerServing,
    proteinsPerServing: nutritionValues.proteinsPerServing,
    fatsPerServing: nutritionValues.fatsPerServing,
    carbohydratesPerServing: nutritionValues.carbohydratesPerServing,
    totalIngredientsWeightGrams: nutritionValues.totalIngredientsWeightGrams,
    cookedWeightGrams: toNullableNumber(recipe.cookedWeightGrams),
  }
}

const mapRecipeCategoryToResponseDto = (
  recipe: Recipe,
): RecipeCategoryResponseDto => {
  return {
    id: recipe.category.id,
    name: recipe.category.name,
    slug: recipe.category.slug,
  }
}

const mapRecipeTagsToResponseDto = (recipe: Recipe): RecipeTagResponseDto[] => {
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

const mapRecipeIngredientsToResponseDto = (
  recipe: Recipe,
): RecipeIngredientResponseDto[] => {
  const recipeIngredients = [...(recipe.recipeIngredients ?? [])]

  return recipeIngredients
    .filter(
      (recipeIngredient) =>
        recipeIngredient.ingredient.isActive && recipeIngredient.unit.isActive,
    )
    .sort((firstRecipeIngredient, secondRecipeIngredient) => {
      if (
        firstRecipeIngredient.sortOrder !== secondRecipeIngredient.sortOrder
      ) {
        return (
          firstRecipeIngredient.sortOrder - secondRecipeIngredient.sortOrder
        )
      }

      return firstRecipeIngredient.ingredient.name.localeCompare(
        secondRecipeIngredient.ingredient.name,
      )
    })
    .map(
      (recipeIngredient): RecipeIngredientResponseDto => ({
        id: recipeIngredient.id,
        ingredientId: recipeIngredient.ingredientId,
        ingredientName: recipeIngredient.ingredient.name,
        ingredientSlug: recipeIngredient.ingredient.slug,
        unitId: recipeIngredient.unitId,
        unitName: recipeIngredient.unit.name,
        unitShortName: recipeIngredient.unit.shortName,
        unitSlug: recipeIngredient.unit.slug,
        amount: Number(recipeIngredient.amount),
        grams: Number(recipeIngredient.grams),
        displayName: recipeIngredient.displayName,
        note: recipeIngredient.note,
        groupTitle: recipeIngredient.groupTitle,
        sortOrder: recipeIngredient.sortOrder,
      }),
    )
}

const mapRecipeStepsToResponseDto = (
  recipe: Recipe,
): RecipeStepResponseDto[] => {
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
