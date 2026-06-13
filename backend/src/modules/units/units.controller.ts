import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UnitResponseDto } from './dto/unit-response.dto'
import { UnitsService } from './units.service'

@ApiTags('units')
@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get()
  @ApiOperation({
    summary: 'Получить список активных единиц измерения',
  })
  @ApiOkResponse({
    description: 'Список активных единиц измерения',
    type: [UnitResponseDto],
  })
  async findAll(): Promise<UnitResponseDto[]> {
    return this.unitsService.findAllActive()
  }
}
