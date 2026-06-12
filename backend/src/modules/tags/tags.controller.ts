import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { TagResponseDto } from './dto/tag-response.dto'
import { TagsService } from './tags.service'

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @ApiOperation({
    summary: 'Получить список активных тегов',
  })
  @ApiOkResponse({
    description: 'Список активных тегов',
    type: [TagResponseDto],
  })
  async findAll(): Promise<TagResponseDto[]> {
    return this.tagsService.findAllActive()
  }
}
