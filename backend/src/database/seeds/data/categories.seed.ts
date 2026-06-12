export interface CategorySeedItem {
  name: string
  slug: string
  description: string
  sortOrder: number
  isActive: boolean
}

export const categoriesSeedData: CategorySeedItem[] = [
  {
    name: 'Завтраки',
    slug: 'breakfasts',
    description: 'Рецепты для завтрака.',
    sortOrder: 10,
    isActive: true,
  },
  {
    name: 'Салаты',
    slug: 'salads',
    description: 'Овощные, мясные, рыбные и другие салаты.',
    sortOrder: 20,
    isActive: true,
  },
  {
    name: 'Супы',
    slug: 'soups',
    description: 'Первые блюда и супы.',
    sortOrder: 30,
    isActive: true,
  },
  {
    name: 'Основные блюда',
    slug: 'main-dishes',
    description: 'Основные блюда на каждый день.',
    sortOrder: 40,
    isActive: true,
  },
  {
    name: 'Десерты',
    slug: 'desserts',
    description: 'Сладкие блюда и десерты.',
    sortOrder: 50,
    isActive: true,
  },
  {
    name: 'Перекусы',
    slug: 'snacks',
    description: 'Быстрые перекусы и небольшие блюда.',
    sortOrder: 60,
    isActive: true,
  },
  {
    name: 'Напитки',
    slug: 'drinks',
    description: 'Горячие и холодные напитки.',
    sortOrder: 70,
    isActive: true,
  },
]
