import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { UnitType } from '../enums/unit-type.enum'

@Entity('units')
@Index('IDX_units_slug', ['slug'], { unique: true })
export class Unit {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 120 })
  name!: string

  @Column({ name: 'short_name', type: 'varchar', length: 40 })
  shortName!: string

  @Column({ type: 'varchar', length: 160 })
  slug!: string

  @Column({
    type: 'enum',
    enum: UnitType,
  })
  type!: UnitType

  @Column({
    name: 'conversion_factor_to_base',
    type: 'numeric',
    precision: 10,
    scale: 3,
    default: 1,
  })
  conversionFactorToBase!: string

  @Column({ name: 'sort_order', type: 'integer', default: 0 })
  sortOrder!: number

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date
}
