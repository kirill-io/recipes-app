import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('ingredients')
@Index('IDX_ingredients_slug', ['slug'], { unique: true })
export class Ingredient {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 160 })
  name!: string

  @Column({ type: 'varchar', length: 200 })
  slug!: string

  @Column({ type: 'text', nullable: true })
  description!: string | null

  @Column({
    name: 'calories_per_100g',
    type: 'numeric',
    precision: 8,
    scale: 2,
  })
  caloriesPer100g!: string

  @Column({
    name: 'proteins_per_100g',
    type: 'numeric',
    precision: 8,
    scale: 2,
  })
  proteinsPer100g!: string

  @Column({ name: 'fats_per_100g', type: 'numeric', precision: 8, scale: 2 })
  fatsPer100g!: string

  @Column({
    name: 'carbohydrates_per_100g',
    type: 'numeric',
    precision: 8,
    scale: 2,
  })
  carbohydratesPer100g!: string

  @Column({ name: 'sort_order', type: 'integer', default: 0 })
  sortOrder!: number

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date
}
