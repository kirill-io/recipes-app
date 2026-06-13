import { Category } from '../../modules/categories/entities/category.entity'
import { Ingredient } from '../../modules/ingredients/entities/ingredient.entity'
import { Tag } from '../../modules/tags/entities/tag.entity'
import { Unit } from '../../modules/units/entities/unit.entity'
import dataSource from '../data-source'
import { categoriesSeedData } from './data/categories.seed'
import { ingredientsSeedData } from './data/ingredients.seed'
import { tagsSeedData } from './data/tags.seed'
import { unitsSeedData } from './data/units.seed'

const runSeeds = async (): Promise<void> => {
  await dataSource.initialize()

  try {
    const categoriesRepository = dataSource.getRepository(Category)
    const ingredientsRepository = dataSource.getRepository(Ingredient)
    const tagsRepository = dataSource.getRepository(Tag)
    const unitsRepository = dataSource.getRepository(Unit)

    await categoriesRepository.upsert(categoriesSeedData, ['slug'])
    await ingredientsRepository.upsert(ingredientsSeedData, ['slug'])
    await tagsRepository.upsert(tagsSeedData, ['slug'])
    await unitsRepository.upsert(unitsSeedData, ['slug'])

    console.log(`Categories seed completed: ${categoriesSeedData.length}`)
    console.log(`Ingredients seed completed: ${ingredientsSeedData.length}`)
    console.log(`Tags seed completed: ${tagsSeedData.length}`)
    console.log(`Units seed completed: ${unitsSeedData.length}`)
  } finally {
    await dataSource.destroy()
  }
}

runSeeds().catch((error: unknown) => {
  console.error('Failed to run seeds:', error)
  process.exit(1)
})
