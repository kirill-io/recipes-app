import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TagResponseDto } from './dto/tag-response.dto'
import { Tag } from './entities'

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  async findAllActive(): Promise<TagResponseDto[]> {
    const tags = await this.tagsRepository.find({
      where: {
        isActive: true,
      },
      order: {
        sortOrder: 'ASC',
        name: 'ASC',
      },
    })

    return tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      description: tag.description,
      sortOrder: tag.sortOrder,
    }))
  }
}
