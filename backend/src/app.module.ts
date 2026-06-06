import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configLoaders } from '@config'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: configLoaders,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
