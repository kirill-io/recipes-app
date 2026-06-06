import 'module-alias/register'
import { NestFactory } from '@nestjs/core'
import { getAppConfig } from '@config'
import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  const { port, apiPrefix } = getAppConfig()

  app.setGlobalPrefix(apiPrefix)

  await app.listen(port)

  console.log(`Backend is running on http://localhost:${port}`)
}

bootstrap().catch((error: unknown) => {
  console.error('Failed to start backend:', error)
  process.exit(1)
})
