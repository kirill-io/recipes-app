import { Category } from '../../modules/categories/entities/category.entity'
import { IngredientUnitConversion } from '../../modules/ingredient-unit-conversions/entities/ingredient-unit-conversion.entity'
import { Ingredient } from '../../modules/ingredients/entities/ingredient.entity'
import { Tag } from '../../modules/tags/entities/tag.entity'
import { Unit } from '../../modules/units/entities/unit.entity'
import dataSource from '../data-source'
import { categoriesSeedData } from './data/categories.seed'
import { ingredientUnitConversionsSeedData } from './data/ingredient-unit-conversions.seed'
import { ingredientsSeedData } from './data/ingredients.seed'
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
    const tagsRepository = dataSource.getRepository(Tag)
    const unitsRepository = dataSource.getRepository(Unit)

    await categoriesRepository.upsert(categoriesSeedData, ['slug'])
    await ingredientsRepository.upsert(ingredientsSeedData, ['slug'])
    await tagsRepository.upsert(tagsSeedData, ['slug'])
    await unitsRepository.upsert(unitsSeedData, ['slug'])

    const ingredients = await ingredientsRepository.find()
    const units = await unitsRepository.find()

    const ingredientBySlug = new Map(
      ingredients.map((ingredient) => [ingredient.slug, ingredient]),
    )

    const unitBySlug = new Map(units.map((unit) => [unit.slug, unit]))

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
    console.log(
      `Ingredient unit conversions seed completed: ${ingredientUnitConversions.length}`,
    )
  } finally {
    await dataSource.destroy()
  }
}

runSeeds().catch((error: unknown) => {
  console.error('Failed to run seeds:', error)
  process.exit(1)
})
