import { Category } from '../../modules/categories/entities/category.entity'
import { Tag } from '../../modules/tags/entities/tag.entity'
import dataSource from '../data-source'
import { categoriesSeedData } from './data/categories.seed'
import { tagsSeedData } from './data/tags.seed'

const runSeeds = async (): Promise<void> => {
  await dataSource.initialize()

  try {
    const categoriesRepository = dataSource.getRepository(Category)
    const tagsRepository = dataSource.getRepository(Tag)

    await categoriesRepository.upsert(categoriesSeedData, ['slug'])
    console.log(`Categories seed completed: ${categoriesSeedData.length}`)

    await tagsRepository.upsert(tagsSeedData, ['slug'])
    console.log(`Tags seed completed: ${tagsSeedData.length}`)
  } finally {
    await dataSource.destroy()
  }
}

runSeeds().catch((error: unknown) => {
  console.error('Failed to run seeds:', error)
  process.exit(1)
})
