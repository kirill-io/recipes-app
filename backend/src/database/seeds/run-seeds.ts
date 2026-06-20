import { Category } from '../../modules/categories/entities/category.entity'
import { IngredientUnitConversion } from '../../modules/ingredient-unit-conversions/entities/ingredient-unit-conversion.entity'
import { Ingredient } from '../../modules/ingredients/entities/ingredient.entity'
import { Recipe } from '../../modules/recipes/entities/recipe.entity'
import { RecipeTag } from '../../modules/recipes/entities/recipe-tag.entity'
import { Tag } from '../../modules/tags/entities/tag.entity'
import { Unit } from '../../modules/units/entities/unit.entity'
import dataSource from '../data-source'
import { categoriesSeedData } from './data/categories.seed'
import { ingredientUnitConversionsSeedData } from './data/ingredient-unit-conversions.seed'
import { ingredientsSeedData } from './data/ingredients.seed'
import { recipeTagsSeedData } from './data/recipe-tags.seed'
import { recipesSeedData } from './data/recipes.seed'
import { tagsSeedData } from './data/tags.seed'
import { unitsSeedData } from './data/units.seed'

const runSeeds = async (): Promise<void> => {
  await dataSource.initialize()

  try {
    const categoriesRepository = dataSource.getRepository(Category)
    const ingredientUnitConversionsRepository = dataSource.getRepository(
      IngredientUnitConversion,
    )
    const ingredientsRepository = dataSource.getRepository(Ingredient)
    const recipesRepository = dataSource.getRepository(Recipe)
    const tagsRepository = dataSource.getRepository(Tag)
    const unitsRepository = dataSource.getRepository(Unit)
    const recipeTagsRepository = dataSource.getRepository(RecipeTag)

    await categoriesRepository.upsert(categoriesSeedData, ['slug'])
    await ingredientsRepository.upsert(ingredientsSeedData, ['slug'])
    await tagsRepository.upsert(tagsSeedData, ['slug'])
    await unitsRepository.upsert(unitsSeedData, ['slug'])

    const categories = await categoriesRepository.find()
    const ingredients = await ingredientsRepository.find()
    const units = await unitsRepository.find()

    const categoryBySlug = new Map(
      categories.map((category) => [category.slug, category]),
    )

    const ingredientBySlug = new Map(
      ingredients.map((ingredient) => [ingredient.slug, ingredient]),
    )

    const unitBySlug = new Map(units.map((unit) => [unit.slug, unit]))

    const recipes = recipesSeedData.map((recipe) => {
      const category = categoryBySlug.get(recipe.categorySlug)

      if (!category) {
        throw new Error(`Category not found by slug: ${recipe.categorySlug}`)
      }

      return {
        title: recipe.title,
        slug: recipe.slug,
        shortDescription: recipe.shortDescription,
        description: recipe.description,
        imageUrl: recipe.imageUrl,
        cookingTimeMinutes: recipe.cookingTimeMinutes,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        categoryId: category.id,
        status: recipe.status,
        nutritionCalculationMode: recipe.nutritionCalculationMode,
        caloriesPer100g: recipe.caloriesPer100g,
        proteinsPer100g: recipe.proteinsPer100g,
        fatsPer100g: recipe.fatsPer100g,
        carbohydratesPer100g: recipe.carbohydratesPer100g,
        caloriesTotal: recipe.caloriesTotal,
        proteinsTotal: recipe.proteinsTotal,
        fatsTotal: recipe.fatsTotal,
        carbohydratesTotal: recipe.carbohydratesTotal,
        cookedWeightGrams: recipe.cookedWeightGrams,
        sortOrder: recipe.sortOrder,
        isActive: recipe.isActive,
      }
    })

    await recipesRepository.upsert(recipes, ['slug'])

    const savedRecipes = await recipesRepository.find()
    const savedTags = await tagsRepository.find()

    const recipeBySlug = new Map(
      savedRecipes.map((recipe) => [recipe.slug, recipe]),
    )

    const tagBySlug = new Map(savedTags.map((tag) => [tag.slug, tag]))

    const recipeTags = recipeTagsSeedData.map((recipeTag) => {
      const recipe = recipeBySlug.get(recipeTag.recipeSlug)
      const tag = tagBySlug.get(recipeTag.tagSlug)

      if (!recipe) {
        throw new Error(`Recipe not found by slug: ${recipeTag.recipeSlug}`)
      }

      if (!tag) {
        throw new Error(`Tag not found by slug: ${recipeTag.tagSlug}`)
      }

      return {
        recipeId: recipe.id,
        tagId: tag.id,
        sortOrder: recipeTag.sortOrder,
      }
    })

    await recipeTagsRepository.upsert(recipeTags, ['recipeId', 'tagId'])

    const ingredientUnitConversions = ingredientUnitConversionsSeedData.map(
      (conversion) => {
        const ingredient = ingredientBySlug.get(conversion.ingredientSlug)
        const unit = unitBySlug.get(conversion.unitSlug)

        if (!ingredient) {
          throw new Error(
            `Ingredient not found by slug: ${conversion.ingredientSlug}`,
          )
        }

        if (!unit) {
          throw new Error(`Unit not found by slug: ${conversion.unitSlug}`)
        }

        return {
          ingredientId: ingredient.id,
          unitId: unit.id,
          gramsPerUnit: conversion.gramsPerUnit,
          description: conversion.description,
          sortOrder: conversion.sortOrder,
          isActive: conversion.isActive,
        }
      },
    )

    await ingredientUnitConversionsRepository.upsert(
      ingredientUnitConversions,
      ['ingredientId', 'unitId'],
    )

    console.log(`Categories seed completed: ${categoriesSeedData.length}`)
    console.log(`Ingredients seed completed: ${ingredientsSeedData.length}`)
    console.log(`Tags seed completed: ${tagsSeedData.length}`)
    console.log(`Units seed completed: ${unitsSeedData.length}`)
    console.log(`Recipes seed completed: ${recipes.length}`)
    console.log(
      `Ingredient unit conversions seed completed: ${ingredientUnitConversions.length}`,
    )
    console.log(`Recipe tags seed completed: ${recipeTags.length}`)
  } finally {
    await dataSource.destroy()
  }
}

runSeeds().catch((error: unknown) => {
  console.error('Failed to run seeds:', error)
  process.exit(1)
})
