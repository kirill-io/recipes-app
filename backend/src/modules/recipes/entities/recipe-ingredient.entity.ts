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
import { Ingredient } from '../../ingredients/entities'
import { Unit } from '../../units/entities'
import { Recipe } from './recipe.entity'

@Entity('recipe_ingredients')
@Index('IDX_recipe_ingredients_recipe_id', ['recipeId'])
@Index('IDX_recipe_ingredients_ingredient_id', ['ingredientId'])
@Index('IDX_recipe_ingredients_unit_id', ['unitId'])
@Index(
  'UQ_recipe_ingredients_recipe_ingredient_unit',
  ['recipeId', 'ingredientId', 'unitId'],
  { unique: true },
)
export class RecipeIngredient {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'recipe_id', type: 'integer' })
  recipeId!: number

  @Column({ name: 'ingredient_id', type: 'integer' })
  ingredientId!: number

  @Column({ name: 'unit_id', type: 'integer' })
  unitId!: number

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  amount!: string

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  grams!: string

  @Column({
    name: 'display_name',
    type: 'varchar',
    length: 160,
    nullable: true,
  })
  displayName!: string | null

  @Column({ type: 'varchar', length: 255, nullable: true })
  note!: string | null

  @Column({ name: 'group_title', type: 'varchar', length: 120, nullable: true })
  groupTitle!: string | null

  @Column({ name: 'sort_order', type: 'integer', default: 0 })
  sortOrder!: number

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeIngredients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'recipe_id' })
  recipe!: Recipe

  @ManyToOne(() => Ingredient, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'ingredient_id' })
  ingredient!: Ingredient

  @ManyToOne(() => Unit, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'unit_id' })
  unit!: Unit

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date
}
