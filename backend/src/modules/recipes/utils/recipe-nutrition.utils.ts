import { Recipe } from '../entities'
import { NutritionCalculationMode } from '../enums'
import { RecipeNutritionValues } from '../types'
import { roundMacro, toNullableNumber } from './number.utils'

export const getRecipeNutritionValues = (
  recipe: Recipe,
): RecipeNutritionValues => {
  if (
    recipe.nutritionCalculationMode === NutritionCalculationMode.CALCULATED &&
    recipe.recipeIngredients?.length
  ) {
    return calculateRecipeNutritionValues(recipe)
  }

  return getManualRecipeNutritionValues(recipe)
}

const calculateRecipeNutritionValues = (
  recipe: Recipe,
): RecipeNutritionValues => {
  const recipeIngredients = recipe.recipeIngredients ?? []

  const totalIngredientsWeightGrams = recipeIngredients.reduce(
    (sum, recipeIngredient) => sum + Number(recipeIngredient.grams),
    0,
  )

  const totals = recipeIngredients.reduce(
    (acc, recipeIngredient) => {
      const grams = Number(recipeIngredient.grams)
      const factor = grams / 100
      const ingredient = recipeIngredient.ingredient

      return {
        calories: acc.calories + Number(ingredient.caloriesPer100g) * factor,
        proteins: acc.proteins + Number(ingredient.proteinsPer100g) * factor,
        fats: acc.fats + Number(ingredient.fatsPer100g) * factor,
        carbohydrates:
          acc.carbohydrates + Number(ingredient.carbohydratesPer100g) * factor,
      }
    },
    {
      calories: 0,
      proteins: 0,
      fats: 0,
      carbohydrates: 0,
    },
  )

  const caloriesTotal = Math.round(totals.calories)
  const proteinsTotal = roundMacro(totals.proteins)
  const fatsTotal = roundMacro(totals.fats)
  const carbohydratesTotal = roundMacro(totals.carbohydrates)

  const servings = recipe.servings
  const cookedWeightGrams = toNullableNumber(recipe.cookedWeightGrams)

  return {
    totalIngredientsWeightGrams: roundMacro(totalIngredientsWeightGrams),

    caloriesTotal,
    proteinsTotal,
    fatsTotal,
    carbohydratesTotal,

    caloriesPerServing:
      servings && servings > 0 ? Math.round(caloriesTotal / servings) : null,
    proteinsPerServing:
      servings && servings > 0 ? roundMacro(proteinsTotal / servings) : null,
    fatsPerServing:
      servings && servings > 0 ? roundMacro(fatsTotal / servings) : null,
    carbohydratesPerServing:
      servings && servings > 0
        ? roundMacro(carbohydratesTotal / servings)
        : null,

    caloriesPer100g:
      cookedWeightGrams && cookedWeightGrams > 0
        ? Math.round((caloriesTotal / cookedWeightGrams) * 100)
        : null,
    proteinsPer100g:
      cookedWeightGrams && cookedWeightGrams > 0
        ? roundMacro((proteinsTotal / cookedWeightGrams) * 100)
        : null,
    fatsPer100g:
      cookedWeightGrams && cookedWeightGrams > 0
        ? roundMacro((fatsTotal / cookedWeightGrams) * 100)
        : null,
    carbohydratesPer100g:
      cookedWeightGrams && cookedWeightGrams > 0
        ? roundMacro((carbohydratesTotal / cookedWeightGrams) * 100)
        : null,
  }
}

const getManualRecipeNutritionValues = (
  recipe: Recipe,
): RecipeNutritionValues => {
  const caloriesTotal = toNullableNumber(recipe.caloriesTotal)
  const proteinsTotal = toNullableNumber(recipe.proteinsTotal)
  const fatsTotal = toNullableNumber(recipe.fatsTotal)
  const carbohydratesTotal = toNullableNumber(recipe.carbohydratesTotal)

  const servings = recipe.servings

  return {
    totalIngredientsWeightGrams: getTotalIngredientsWeightGrams(recipe),

    caloriesPer100g: toNullableNumber(recipe.caloriesPer100g),
    proteinsPer100g: toNullableNumber(recipe.proteinsPer100g),
    fatsPer100g: toNullableNumber(recipe.fatsPer100g),
    carbohydratesPer100g: toNullableNumber(recipe.carbohydratesPer100g),

    caloriesTotal,
    proteinsTotal,
    fatsTotal,
    carbohydratesTotal,

    caloriesPerServing:
      caloriesTotal !== null && servings && servings > 0
        ? Math.round(caloriesTotal / servings)
        : null,
    proteinsPerServing:
      proteinsTotal !== null && servings && servings > 0
        ? roundMacro(proteinsTotal / servings)
        : null,
    fatsPerServing:
      fatsTotal !== null && servings && servings > 0
        ? roundMacro(fatsTotal / servings)
        : null,
    carbohydratesPerServing:
      carbohydratesTotal !== null && servings && servings > 0
        ? roundMacro(carbohydratesTotal / servings)
        : null,
  }
}

const getTotalIngredientsWeightGrams = (recipe: Recipe): number | null => {
  if (!recipe.recipeIngredients) {
    return null
  }

  return roundMacro(
    recipe.recipeIngredients.reduce(
      (sum, recipeIngredient) => sum + Number(recipeIngredient.grams),
      0,
    ),
  )
}
