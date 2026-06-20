import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IngredientUnitConversionResponseDto } from './dto/ingredient-unit-conversion-response.dto'
import { IngredientUnitConversion } from './entities/ingredient-unit-conversion.entity'

@Injectable()
export class IngredientUnitConversionsService {
  constructor(
    @InjectRepository(IngredientUnitConversion)
    private readonly ingredientUnitConversionsRepository: Repository<IngredientUnitConversion>,
  ) {}

  async findAllActive(): Promise<IngredientUnitConversionResponseDto[]> {
    const conversions = await this.ingredientUnitConversionsRepository.find({
      relations: {
        ingredient: true,
        unit: true,
      },
      where: {
        isActive: true,
        ingredient: {
          isActive: true,
        },
        unit: {
          isActive: true,
        },
      },
      order: {
        sortOrder: 'ASC',
        ingredient: {
          name: 'ASC',
        },
        unit: {
          sortOrder: 'ASC',
        },
      },
    })

    return conversions.map((conversion) => ({
      id: conversion.id,
      ingredientId: conversion.ingredientId,
      ingredientName: conversion.ingredient.name,
      ingredientSlug: conversion.ingredient.slug,
      unitId: conversion.unitId,
      unitName: conversion.unit.name,
      unitShortName: conversion.unit.shortName,
      unitSlug: conversion.unit.slug,
      gramsPerUnit: Number(conversion.gramsPerUnit),
      description: conversion.description,
      sortOrder: conversion.sortOrder,
    }))
  }
}
