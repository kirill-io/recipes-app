import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UnitResponseDto } from './dto/unit-response.dto'
import { Unit } from './entities'

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitsRepository: Repository<Unit>,
  ) {}

  async findAllActive(): Promise<UnitResponseDto[]> {
    const units = await this.unitsRepository.find({
      where: {
        isActive: true,
      },
      order: {
        sortOrder: 'ASC',
        name: 'ASC',
      },
    })

    return units.map((unit) => ({
      id: unit.id,
      name: unit.name,
      shortName: unit.shortName,
      slug: unit.slug,
      type: unit.type,
      conversionFactorToBase: Number(unit.conversionFactorToBase),
      sortOrder: unit.sortOrder,
    }))
  }
}
