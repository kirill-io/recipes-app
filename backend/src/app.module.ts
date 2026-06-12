import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { configLoaders, getTypeOrmConfig } from '@config'
import { CategoriesModule } from '@modules/categories'
import { TagsModule } from '@modules/tags'

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
  ],
})
export class AppModule {}
