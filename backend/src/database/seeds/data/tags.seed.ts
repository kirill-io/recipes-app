export interface TagSeedItem {
  name: string
  slug: string
  description: string
  sortOrder: number
  isActive: boolean
}

export const tagsSeedData: TagSeedItem[] = [
  {
    name: 'ПП',
    slug: 'pp',
    description: 'Рецепты для правильного питания.',
    sortOrder: 10,
    isActive: true,
  },
  {
    name: 'Быстро',
    slug: 'bystro',
    description: 'Рецепты, которые можно приготовить за короткое время.',
    sortOrder: 20,
    isActive: true,
  },
  {
    name: 'Просто',
    slug: 'prosto',
    description: 'Рецепты с простым приготовлением и доступными ингредиентами.',
    sortOrder: 30,
    isActive: true,
  },
  {
    name: 'Без сахара',
    slug: 'bez-sahara',
    description: 'Рецепты без добавленного сахара.',
    sortOrder: 40,
    isActive: true,
  },
  {
    name: 'Без глютена',
    slug: 'bez-glyutena',
    description: 'Рецепты без ингредиентов, содержащих глютен.',
    sortOrder: 50,
    isActive: true,
  },
  {
    name: 'Низкокалорийное',
    slug: 'nizkokaloriynoe',
    description: 'Рецепты с пониженной калорийностью.',
    sortOrder: 60,
    isActive: true,
  },
  {
    name: 'Высокобелковое',
    slug: 'vysokobelkovoe',
    description: 'Рецепты с повышенным содержанием белка.',
    sortOrder: 70,
    isActive: true,
  },
  {
    name: 'С курицей',
    slug: 's-kuricey',
    description: 'Рецепты с курицей.',
    sortOrder: 80,
    isActive: true,
  },
  {
    name: 'С рыбой',
    slug: 's-ryboy',
    description: 'Рецепты с рыбой.',
    sortOrder: 90,
    isActive: true,
  },
  {
    name: 'С творогом',
    slug: 's-tvorogom',
    description: 'Рецепты с творогом.',
    sortOrder: 100,
    isActive: true,
  },
  {
    name: 'Овощное',
    slug: 'ovoshchnoe',
    description: 'Рецепты с большим количеством овощей.',
    sortOrder: 110,
    isActive: true,
  },
  {
    name: 'На сковороде',
    slug: 'na-skovorode',
    description: 'Рецепты, которые готовятся на сковороде.',
    sortOrder: 120,
    isActive: true,
  },
  {
    name: 'В духовке',
    slug: 'v-duhovke',
    description: 'Рецепты, которые готовятся в духовке.',
    sortOrder: 130,
    isActive: true,
  },
  {
    name: 'Без выпечки',
    slug: 'bez-vypechki',
    description: 'Рецепты, которые не требуют выпекания.',
    sortOrder: 140,
    isActive: true,
  },
  {
    name: 'На каждый день',
    slug: 'na-kazhdyy-den',
    description: 'Повседневные рецепты для регулярного приготовления.',
    sortOrder: 150,
    isActive: true,
  },
  {
    name: 'Праздничное',
    slug: 'prazdnichnoe',
    description: 'Рецепты для праздников и особых случаев.',
    sortOrder: 160,
    isActive: true,
  },
]
