export interface IngredientUnitConversionSeedItem {
  ingredientSlug: string
  unitSlug: string
  gramsPerUnit: string
  description: string
  sortOrder: number
  isActive: boolean
}

export const ingredientUnitConversionsSeedData: IngredientUnitConversionSeedItem[] =
  [
    {
      ingredientSlug: 'kurinoe-yayco',
      unitSlug: 'piece',
      gramsPerUnit: '55.00',
      description: 'Среднее куриное яйцо без скорлупы.',
      sortOrder: 10,
      isActive: true,
    },
    {
      ingredientSlug: 'banan',
      unitSlug: 'piece',
      gramsPerUnit: '120.00',
      description: 'Средний банан без кожуры.',
      sortOrder: 20,
      isActive: true,
    },
    {
      ingredientSlug: 'yabloko',
      unitSlug: 'piece',
      gramsPerUnit: '180.00',
      description: 'Среднее яблоко.',
      sortOrder: 30,
      isActive: true,
    },
    {
      ingredientSlug: 'kartofel',
      unitSlug: 'piece',
      gramsPerUnit: '130.00',
      description: 'Средний клубень картофеля.',
      sortOrder: 40,
      isActive: true,
    },
    {
      ingredientSlug: 'morkov',
      unitSlug: 'piece',
      gramsPerUnit: '80.00',
      description: 'Средняя морковь.',
      sortOrder: 50,
      isActive: true,
    },
    {
      ingredientSlug: 'olivkovoe-maslo',
      unitSlug: 'tablespoon',
      gramsPerUnit: '13.50',
      description: 'Одна столовая ложка оливкового масла.',
      sortOrder: 60,
      isActive: true,
    },
    {
      ingredientSlug: 'olivkovoe-maslo',
      unitSlug: 'teaspoon',
      gramsPerUnit: '4.50',
      description: 'Одна чайная ложка оливкового масла.',
      sortOrder: 70,
      isActive: true,
    },
    {
      ingredientSlug: 'moloko-2-5',
      unitSlug: 'tablespoon',
      gramsPerUnit: '15.00',
      description: 'Одна столовая ложка молока.',
      sortOrder: 80,
      isActive: true,
    },
    {
      ingredientSlug: 'moloko-2-5',
      unitSlug: 'teaspoon',
      gramsPerUnit: '5.00',
      description: 'Одна чайная ложка молока.',
      sortOrder: 90,
      isActive: true,
    },
  ]
