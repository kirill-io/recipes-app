import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { configLoaders } from './config'

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
