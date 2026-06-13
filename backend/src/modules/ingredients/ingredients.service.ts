import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IngredientResponseDto } from './dto/ingredient-response.dto'
import { Ingredient } from './entities/ingredient.entity'

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientsRepository: Repository<Ingredient>,
  ) {}

  async findAllActive(): Promise<IngredientResponseDto[]> {
    const ingredients = await this.ingredientsRepository.find({
      where: {
        isActive: true,
      },
      order: {
        sortOrder: 'ASC',
        name: 'ASC',
      },
    })

    return ingredients.map((ingredient) => ({
      id: ingredient.id,
      name: ingredient.name,
      slug: ingredient.slug,
      description: ingredient.description,
      caloriesPer100g: Number(ingredient.caloriesPer100g),
      proteinsPer100g: Number(ingredient.proteinsPer100g),
      fatsPer100g: Number(ingredient.fatsPer100g),
      carbohydratesPer100g: Number(ingredient.carbohydratesPer100g),
      sortOrder: ingredient.sortOrder,
    }))
  }
}
