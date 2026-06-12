import { Controller, Get } from '@nestjs/common'
import { Category } from './entities/category.entity'
import { CategoriesService } from './categories.service'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAllActive()
  }
}
