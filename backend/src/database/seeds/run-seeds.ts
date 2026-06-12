import { Category } from '../../modules/categories/entities/category.entity'
import dataSource from '../data-source'
import { categoriesSeedData } from './data/categories.seed'

const runSeeds = async (): Promise<void> => {
  await dataSource.initialize()

  try {
    const categoriesRepository = dataSource.getRepository(Category)

    await categoriesRepository.upsert(categoriesSeedData, ['slug'])

    console.log(`Categories seed completed: ${categoriesSeedData.length}`)
  } finally {
    await dataSource.destroy()
  }
}

runSeeds().catch((error: unknown) => {
  console.error('Failed to run seeds:', error)
  process.exit(1)
})
