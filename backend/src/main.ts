import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { getAppConfig } from '@config'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  const { port } = getAppConfig()

  await app.listen(port)

  console.log(`Backend is running on http://localhost:${port}`)
}

bootstrap().catch((error: unknown) => {
  console.error('Failed to start backend:', error)
  process.exit(1)
})
