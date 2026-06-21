import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryResponseDto } from './dto/category-response.dto'
import { Category } from './entities'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async findAllActive(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoriesRepository.find({
      where: {
        isActive: true,
      },
      order: {
        sortOrder: 'ASC',
        name: 'ASC',
      },
    })

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      sortOrder: category.sortOrder,
    }))
  }
}
