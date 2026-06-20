import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IngredientUnitConversion } from './entities/ingredient-unit-conversion.entity'
import { IngredientUnitConversionsController } from './ingredient-unit-conversions.controller'
import { IngredientUnitConversionsService } from './ingredient-unit-conversions.service'

@Module({
  imports: [TypeOrmModule.forFeature([IngredientUnitConversion])],
  controllers: [IngredientUnitConversionsController],
  providers: [IngredientUnitConversionsService],
})
export class IngredientUnitConversionsModule {}
