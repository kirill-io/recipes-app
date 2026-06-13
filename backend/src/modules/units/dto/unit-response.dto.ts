import { ApiProperty } from '@nestjs/swagger'
import { UnitType } from '../enums/unit-type.enum'

export class UnitResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Идентификатор единицы измерения',
  })
  id!: number

  @ApiProperty({
    example: 'Грамм',
    description: 'Название единицы измерения',
  })
  name!: string

  @ApiProperty({
    example: 'г',
    description: 'Короткое обозначение единицы измерения',
  })
  shortName!: string

  @ApiProperty({
    example: 'gram',
    description: 'URL-идентификатор единицы измерения',
  })
  slug!: string

  @ApiProperty({
    enum: UnitType,
    example: UnitType.MASS,
    description: 'Тип единицы измерения',
  })
  type!: UnitType

  @ApiProperty({
    example: 1,
    description: 'Коэффициент перевода в базовую единицу своего типа',
  })
  conversionFactorToBase!: number

  @ApiProperty({
    example: 10,
    description: 'Порядок сортировки единицы измерения',
  })
  sortOrder!: number
}
