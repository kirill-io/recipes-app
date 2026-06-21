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

@Entity('ingredient_unit_conversions')
@Index('IDX_ingredient_unit_conversions_pair', ['ingredientId', 'unitId'], {
  unique: true,
})
export class IngredientUnitConversion {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'ingredient_id', type: 'integer' })
  ingredientId!: number

  @ManyToOne(() => Ingredient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ingredient_id' })
  ingredient!: Ingredient

  @Column({ name: 'unit_id', type: 'integer' })
  unitId!: number

  @ManyToOne(() => Unit, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'unit_id' })
  unit!: Unit

  @Column({ name: 'grams_per_unit', type: 'numeric', precision: 10, scale: 2 })
  gramsPerUnit!: string

  @Column({ type: 'text', nullable: true })
  description!: string | null

  @Column({ name: 'sort_order', type: 'integer', default: 0 })
  sortOrder!: number

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date
}
