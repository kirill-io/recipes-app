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
import { Tag } from '../../tags/entities/tag.entity'
import { Recipe } from './recipe.entity'

@Entity('recipe_tags')
@Index('IDX_recipe_tags_pair', ['recipeId', 'tagId'], { unique: true })
export class RecipeTag {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'recipe_id', type: 'integer' })
  recipeId!: number

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'recipe_id' })
  recipe!: Recipe

  @Column({ name: 'tag_id', type: 'integer' })
  tagId!: number

  @ManyToOne(() => Tag, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tag_id' })
  tag!: Tag

  @Column({ name: 'sort_order', type: 'integer', default: 0 })
  sortOrder!: number

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date
}
