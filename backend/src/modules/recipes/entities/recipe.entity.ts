import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Category } from '../../categories/entities/category.entity'
import { NutritionCalculationMode } from '../enums/nutrition-calculation-mode.enum'
import { RecipeDifficulty } from '../enums/recipe-difficulty.enum'
import { RecipeStatus } from '../enums/recipe-status.enum'

@Entity('recipes')
@Index('IDX_recipes_slug', ['slug'], { unique: true })
export class Recipe {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 180 })
  title!: string

  @Column({ type: 'varchar', length: 220 })
  slug!: string

  @Column({ name: 'short_description', type: 'varchar', length: 300 })
  shortDescription!: string

  @Column({ type: 'text', nullable: true })
  description!: string | null

  @Column({ name: 'image_url', type: 'text', nullable: true })
  imageUrl!: string | null

  @Column({ name: 'cooking_time_minutes', type: 'integer', nullable: true })
  cookingTimeMinutes!: number | null

  @Column({ type: 'integer', nullable: true })
  servings!: number | null

  @Column({
    type: 'enum',
    enum: RecipeDifficulty,
    default: RecipeDifficulty.EASY,
  })
  difficulty!: RecipeDifficulty

  @Column({ name: 'category_id', type: 'integer' })
  categoryId!: number

  @ManyToOne(() => Category, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'category_id' })
  category!: Category

  @Column({
    type: 'enum',
    enum: RecipeStatus,
    default: RecipeStatus.DRAFT,
  })
  status!: RecipeStatus

  @Column({
    name: 'nutrition_calculation_mode',
    type: 'enum',
    enum: NutritionCalculationMode,
    default: NutritionCalculationMode.MANUAL,
  })
  nutritionCalculationMode!: NutritionCalculationMode

  @Column({
    name: 'calories_per_100g',
    type: 'numeric',
    precision: 8,
    scale: 2,
    nullable: true,
  })
  caloriesPer100g!: string | null

  @Column({
    name: 'proteins_per_100g',
    type: 'numeric',
    precision: 8,
    scale: 2,
    nullable: true,
  })
  proteinsPer100g!: string | null

  @Column({
    name: 'fats_per_100g',
    type: 'numeric',
    precision: 8,
    scale: 2,
    nullable: true,
  })
  fatsPer100g!: string | null

  @Column({
    name: 'carbohydrates_per_100g',
    type: 'numeric',
    precision: 8,
    scale: 2,
    nullable: true,
  })
  carbohydratesPer100g!: string | null

  @Column({
    name: 'calories_total',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  caloriesTotal!: string | null

  @Column({
    name: 'proteins_total',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  proteinsTotal!: string | null

  @Column({
    name: 'fats_total',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  fatsTotal!: string | null

  @Column({
    name: 'carbohydrates_total',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  carbohydratesTotal!: string | null

  @Column({
    name: 'cooked_weight_grams',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  cookedWeightGrams!: string | null

  @Column({ name: 'sort_order', type: 'integer', default: 0 })
  sortOrder!: number

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date
}
