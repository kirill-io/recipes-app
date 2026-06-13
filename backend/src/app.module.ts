import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { configLoaders, getTypeOrmConfig } from '@config'
import { CategoriesModule } from '@modules/categories'
import { IngredientsModule } from '@modules/ingredients'
import { TagsModule } from '@modules/tags'
import { UnitsModule } from '@modules/units'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.local', '.env'],
      load: configLoaders,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    CategoriesModule,
    TagsModule,
    UnitsModule,
    IngredientsModule,
  ],
})
export class AppModule {}
