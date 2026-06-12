import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { SWAGGER_PATH } from './swagger.config.constants'

export const setupSwagger = (app: INestApplication): void => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ВкусноТут API')
    .setDescription('REST API MVP сайта с рецептами')
    .setVersion('0.1.0')
    .addTag('categories', 'Категории рецептов')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup(SWAGGER_PATH, app, documentFactory, {
    useGlobalPrefix: true,
  })
}
