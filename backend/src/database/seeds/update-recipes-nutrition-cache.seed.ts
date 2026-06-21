import { DataSource } from 'typeorm'
import { Recipe } from '../../modules/recipes/entities/recipe.entity'
import { NutritionCalculationMode } from '../../modules/recipes/enums/nutrition-calculation-mode.enum'
import { getRecipeNutritionValues } from '../../modules/recipes/utils/recipe-nutrition.utils'

const toNullableNumericString = (value: number | null): string | null => {
  if (value === null) {
    return null
  }

  return value.toFixed(2)
}

export const updateRecipesNutritionCache = async (
  dataSource: DataSource,
): Promise<number> => {
  const recipesRepository = dataSource.getRepository(Recipe)

  const recipes = await recipesRepository.find({
    relations: {
      recipeIngredients: {
        ingredient: true,
      },
    },
    where: {
      nutritionCalculationMode: NutritionCalculationMode.CALCULATED,
    },
  })

  const recipesWithIngredients = recipes.filter(
    (recipe) => recipe.recipeIngredients?.length,
  )

  await Promise.all(
    recipesWithIngredients.map((recipe) => {
      const nutritionValues = getRecipeNutritionValues(recipe)

      return recipesRepository.update(recipe.id, {
        caloriesPer100g: toNullableNumericString(
          nutritionValues.caloriesPer100g,
        ),
        proteinsPer100g: toNullableNumericString(
          nutritionValues.proteinsPer100g,
        ),
        fatsPer100g: toNullableNumericString(nutritionValues.fatsPer100g),
        carbohydratesPer100g: toNullableNumericString(
          nutritionValues.carbohydratesPer100g,
        ),
        caloriesTotal: toNullableNumericString(nutritionValues.caloriesTotal),
        proteinsTotal: toNullableNumericString(nutritionValues.proteinsTotal),
        fatsTotal: toNullableNumericString(nutritionValues.fatsTotal),
        carbohydratesTotal: toNullableNumericString(
          nutritionValues.carbohydratesTotal,
        ),
      })
    }),
  )

  return recipesWithIngredients.length
}
