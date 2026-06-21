import { NutritionCalculationMode } from '../../../modules/recipes/enums/nutrition-calculation-mode.enum'
import { RecipeDifficulty } from '../../../modules/recipes/enums/recipe-difficulty.enum'
import { RecipeStatus } from '../../../modules/recipes/enums/recipe-status.enum'

export interface RecipeSeedItem {
  title: string
  slug: string
  shortDescription: string
  description: string | null
  imageUrl: string | null
  cookingTimeMinutes: number | null
  servings: number | null
  difficulty: RecipeDifficulty
  categorySlug: string
  status: RecipeStatus
  nutritionCalculationMode: NutritionCalculationMode
  caloriesPer100g: string | null
  proteinsPer100g: string | null
  fatsPer100g: string | null
  carbohydratesPer100g: string | null
  caloriesTotal: string | null
  proteinsTotal: string | null
  fatsTotal: string | null
  carbohydratesTotal: string | null
  cookedWeightGrams: string | null
  sortOrder: number
  isActive: boolean
}

export const recipesSeedData: RecipeSeedItem[] = [
  {
    title: 'Овсянка с бананом',
    slug: 'ovsyanka-s-bananom',
    shortDescription: 'Простой завтрак из овсяных хлопьев, молока и банана.',
    description:
      'Сытная овсянка с бананом для быстрого завтрака. Подходит для повседневного питания и легко готовится за несколько минут.',
    imageUrl: null,
    cookingTimeMinutes: 15,
    servings: 1,
    difficulty: RecipeDifficulty.EASY,
    categorySlug: 'breakfasts',
    status: RecipeStatus.PUBLISHED,
    nutritionCalculationMode: NutritionCalculationMode.CALCULATED,
    caloriesPer100g: '142.00',
    proteinsPer100g: '4.80',
    fatsPer100g: '3.20',
    carbohydratesPer100g: '23.60',
    caloriesTotal: '426.00',
    proteinsTotal: '14.40',
    fatsTotal: '9.60',
    carbohydratesTotal: '70.80',
    cookedWeightGrams: '300.00',
    sortOrder: 10,
    isActive: true,
  },
  {
    title: 'Куриная грудка с рисом',
    slug: 'kurinaya-grudka-s-risom',
    shortDescription: 'Белковое основное блюдо с куриной грудкой и рисом.',
    description:
      'Простой рецепт на каждый день: куриная грудка, белый рис и немного масла. Блюдо удобно готовить заранее на несколько приёмов пищи.',
    imageUrl: null,
    cookingTimeMinutes: 40,
    servings: 2,
    difficulty: RecipeDifficulty.EASY,
    categorySlug: 'main-dishes',
    status: RecipeStatus.PUBLISHED,
    nutritionCalculationMode: NutritionCalculationMode.CALCULATED,
    caloriesPer100g: '136.00',
    proteinsPer100g: '14.50',
    fatsPer100g: '3.10',
    carbohydratesPer100g: '12.20',
    caloriesTotal: '680.00',
    proteinsTotal: '72.50',
    fatsTotal: '15.50',
    carbohydratesTotal: '61.00',
    cookedWeightGrams: '500.00',
    sortOrder: 20,
    isActive: true,
  },
  {
    title: 'Гречка с курицей',
    slug: 'grechka-s-kuricey',
    shortDescription: 'Сытное блюдо из гречки и куриной грудки.',
    description:
      'Гречка с курицей — простой вариант основного блюда для обеда или ужина. Хорошо подходит для базового рациона.',
    imageUrl: null,
    cookingTimeMinutes: 35,
    servings: 2,
    difficulty: RecipeDifficulty.EASY,
    categorySlug: 'main-dishes',
    status: RecipeStatus.PUBLISHED,
    nutritionCalculationMode: NutritionCalculationMode.CALCULATED,
    caloriesPer100g: '128.00',
    proteinsPer100g: '13.20',
    fatsPer100g: '2.70',
    carbohydratesPer100g: '13.40',
    caloriesTotal: '640.00',
    proteinsTotal: '66.00',
    fatsTotal: '13.50',
    carbohydratesTotal: '67.00',
    cookedWeightGrams: '500.00',
    sortOrder: 30,
    isActive: true,
  },
  {
    title: 'Творог с бананом',
    slug: 'tvorog-s-bananom',
    shortDescription: 'Быстрый белковый перекус из творога и банана.',
    description:
      'Простой перекус без сложного приготовления. Подходит как быстрый вариант завтрака, полдника или десерта.',
    imageUrl: null,
    cookingTimeMinutes: 5,
    servings: 1,
    difficulty: RecipeDifficulty.EASY,
    categorySlug: 'snacks',
    status: RecipeStatus.PUBLISHED,
    nutritionCalculationMode: NutritionCalculationMode.MANUAL,
    caloriesPer100g: '112.00',
    proteinsPer100g: '11.10',
    fatsPer100g: '3.20',
    carbohydratesPer100g: '9.70',
    caloriesTotal: '336.00',
    proteinsTotal: '33.30',
    fatsTotal: '9.60',
    carbohydratesTotal: '29.10',
    cookedWeightGrams: '300.00',
    sortOrder: 40,
    isActive: true,
  },
  {
    title: 'Салат с яйцом и овощами',
    slug: 'salat-s-yaycom-i-ovoshchami',
    shortDescription: 'Лёгкий салат с яйцом, огурцом, помидором и морковью.',
    description:
      'Овощной салат с куриным яйцом. Подходит для лёгкого приёма пищи или дополнения к основному блюду.',
    imageUrl: null,
    cookingTimeMinutes: 20,
    servings: 2,
    difficulty: RecipeDifficulty.EASY,
    categorySlug: 'salads',
    status: RecipeStatus.PUBLISHED,
    nutritionCalculationMode: NutritionCalculationMode.MANUAL,
    caloriesPer100g: '68.00',
    proteinsPer100g: '4.20',
    fatsPer100g: '3.80',
    carbohydratesPer100g: '4.10',
    caloriesTotal: '272.00',
    proteinsTotal: '16.80',
    fatsTotal: '15.20',
    carbohydratesTotal: '16.40',
    cookedWeightGrams: '400.00',
    sortOrder: 50,
    isActive: true,
  },
]
