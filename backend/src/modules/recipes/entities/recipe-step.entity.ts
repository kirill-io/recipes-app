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
import { Recipe } from './recipe.entity'

@Entity('recipe_steps')
@Index('IDX_recipe_steps_recipe_step_number', ['recipeId', 'stepNumber'], {
  unique: true,
})
export class RecipeStep {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'recipe_id', type: 'integer' })
  recipeId!: number

  @ManyToOne(() => Recipe, (recipe) => recipe.steps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'recipe_id' })
  recipe!: Recipe

  @Column({ name: 'step_number', type: 'integer' })
  stepNumber!: number

  @Column({ type: 'text' })
  description!: string

  @Column({ name: 'image_url', type: 'text', nullable: true })
  imageUrl!: string | null

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date
}
