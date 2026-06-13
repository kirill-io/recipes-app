import { UnitType } from '../../../modules/units/enums/unit-type.enum'

export interface UnitSeedItem {
  name: string
  shortName: string
  slug: string
  type: UnitType
  conversionFactorToBase: string
  sortOrder: number
  isActive: boolean
}

export const unitsSeedData: UnitSeedItem[] = [
  {
    name: 'Грамм',
    shortName: 'г',
    slug: 'gram',
    type: UnitType.MASS,
    conversionFactorToBase: '1',
    sortOrder: 10,
    isActive: true,
  },
  {
    name: 'Килограмм',
    shortName: 'кг',
    slug: 'kilogram',
    type: UnitType.MASS,
    conversionFactorToBase: '1000',
    sortOrder: 20,
    isActive: true,
  },
  {
    name: 'Миллилитр',
    shortName: 'мл',
    slug: 'milliliter',
    type: UnitType.VOLUME,
    conversionFactorToBase: '1',
    sortOrder: 30,
    isActive: true,
  },
  {
    name: 'Литр',
    shortName: 'л',
    slug: 'liter',
    type: UnitType.VOLUME,
    conversionFactorToBase: '1000',
    sortOrder: 40,
    isActive: true,
  },
  {
    name: 'Чайная ложка',
    shortName: 'ч. л.',
    slug: 'teaspoon',
    type: UnitType.VOLUME,
    conversionFactorToBase: '5',
    sortOrder: 50,
    isActive: true,
  },
  {
    name: 'Столовая ложка',
    shortName: 'ст. л.',
    slug: 'tablespoon',
    type: UnitType.VOLUME,
    conversionFactorToBase: '15',
    sortOrder: 60,
    isActive: true,
  },
  {
    name: 'Штука',
    shortName: 'шт.',
    slug: 'piece',
    type: UnitType.COUNT,
    conversionFactorToBase: '1',
    sortOrder: 70,
    isActive: true,
  },
]
