# Backend architecture

Документ описывает планируемую архитектуру backend-части проекта **ВкусноТут**.

## Стек backend

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Yarn
- pgAdmin 4 для локального просмотра и управления базой данных

## Общая идея

Backend отвечает за:

- рецепты;
- категории;
- теги;
- ингредиенты;
- единицы измерения;
- расчёт КБЖУ;
- пользователей;
- избранное;
- роли;
- модерацию;
- будущую админку.

## Основные архитектурные принципы

### 1. Модульная структура

Каждая крупная предметная область должна быть вынесена в отдельный Nest-модуль.

Планируемые модули:

```txt
src/
  app.module.ts
  main.ts

  config/

  modules/
    users/
    auth/
    recipes/
    categories/
    tags/
    ingredients/
    units/
    favorites/
    moderation/
```

На старте не обязательно создавать все модули сразу. Модули добавляются по мере реализации функциональности.

### 2. Entity не отдаётся напрямую через API

TypeORM Entity описывает структуру базы данных.

Entity не должна напрямую использоваться как публичный ответ API.

Для API используются:

- DTO для входящих данных;
- response DTO или mapper для исходящих данных.

Пример разделения ответственности:

```txt
RecipeEntity        # структура таблицы recipes
CreateRecipeDto     # данные для создания рецепта
UpdateRecipeDto     # данные для редактирования рецепта
RecipeResponseDto   # данные, которые отдаём клиенту
RecipeMapper        # преобразование entity в response
```

### 3. Бизнес-логика находится в service

Controller отвечает за HTTP-слой:

- принять запрос;
- вызвать service;
- вернуть ответ.

Service отвечает за бизнес-логику:

- проверка прав;
- работа с репозиториями;
- создание рецепта;
- отправка рецепта на модерацию;
- расчёт КБЖУ;
- публикация рецепта.

### 4. Работа с базой через TypeORM

Для работы с базой используется TypeORM.

Основные правила:

- структура базы изменяется через миграции;
- `synchronize` не используется в production;
- на текущем проекте `synchronize` держим в значении `false`;
- связи описываются через entity;
- сложная логика не должна находиться внутри entity;
- TypeORM Entity не отдаётся напрямую через API.

## Конфигурация backend

### 1. Конфигурация через env

Конфигурация приложения берётся из переменных окружения.

Базовые переменные:

```env
NODE_ENV=development
PORT=5000
```

Переменные для PostgreSQL:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=recipes_app_dev
```

Реальные значения хранятся в локальном `.env.local` или `.env`.

Файл `.env.example` хранит только примерные значения и может быть добавлен в репозиторий.

Файлы с реальными секретами не должны попадать в Git:

```txt
.env
.env.local
.env.*.local
```

Пароль от локальной базы данных хранится в env-файле в открытом виде. Для локальной разработки это нормальная практика, если файл не попадает в репозиторий.

В production-среде секреты должны передаваться через переменные окружения сервера, CI/CD variables, Docker/Kubernetes secrets или внешний secret manager.

### 2. Структура config

Конфигурация backend разделяется по предметным областям.

Текущая структура:

```txt
src/
  config/
    index.ts

    app/
      index.ts
      app.config.ts
      app.config.constant.ts
      app.config.types.ts
      app.config.utils.ts

    database/
      index.ts
      database.config.ts
      database.config.constant.ts
      database.config.type.ts
      database.config.utils.ts
```

Общий `config/index.ts` собирает конфиги в единый список:

```ts
import { appConfig } from './app'
import { databaseConfig } from './database'

export const configLoaders = [appConfig, databaseConfig]

export { appConfig, getAppConfig } from './app'
export type { AppConfig, NodeEnv } from './app'

export { databaseConfig, getTypeOrmConfig } from './database'
export type { DatabaseConfig } from './database'
```

Внутренние `index.ts` в папках `app` и `database` должны экспортировать только публичный API соответствующего config-раздела.

Для `database` наружу экспортируются:

```ts
export { databaseConfig } from './database.config'
export type { DatabaseConfig } from './database.config.type'
export { getTypeOrmConfig } from './database.config.utils'
```

Внутренние технические детали, такие как `getRequiredEnv`, `getNumberEnv`, `DATABASE_CONFIG_KEY`, `DEFAULT_DATABASE_PORT`, не должны экспортироваться из общего `@config`, если они не нужны за пределами database-конфига.

### 3. Database config

`database.config.ts` отвечает за чтение env-переменных и формирование внутреннего конфига базы данных.

Пример:

```ts
import { registerAs } from '@nestjs/config'

import {
  DATABASE_CONFIG_KEY,
  DEFAULT_DATABASE_PORT,
} from './database.config.constant'
import { DatabaseConfig } from './database.config.type'
import { getNumberEnv, getRequiredEnv } from './database.config.utils'

export const databaseConfig = registerAs(
  DATABASE_CONFIG_KEY,
  (): DatabaseConfig => ({
    host: getRequiredEnv('DB_HOST'),
    port: getNumberEnv('DB_PORT', DEFAULT_DATABASE_PORT),
    username: getRequiredEnv('DB_USERNAME'),
    password: getRequiredEnv('DB_PASSWORD'),
    name: getRequiredEnv('DB_NAME'),
  }),
)
```

`database.config.type.ts` описывает форму внутреннего конфига:

```ts
export type DatabaseConfig = {
  host: string
  port: number
  username: string
  password: string
  name: string
}
```

`database.config.utils.ts` содержит функции для чтения env-переменных и преобразования внутреннего database config в формат TypeORM.

Пример `getTypeOrmConfig`:

```ts
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import { DATABASE_CONFIG_KEY } from './database.config.constant'
import { DatabaseConfig } from './database.config.type'

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const databaseConfig =
    configService.getOrThrow<DatabaseConfig>(DATABASE_CONFIG_KEY)

  return {
    type: 'postgres',
    host: databaseConfig.host,
    port: databaseConfig.port,
    username: databaseConfig.username,
    password: databaseConfig.password,
    database: databaseConfig.name,
    autoLoadEntities: true,
    synchronize: false,
  }
}
```

### 4. Подключение TypeORM

TypeORM подключается через `TypeOrmModule.forRootAsync`.

Используется async-подключение, потому что настройки базы собираются через `ConfigService`.

Пример подключения в `AppModule`:

```ts
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { configLoaders, getTypeOrmConfig } from '@config'

import { AppController } from './app.controller'
import { AppService } from './app.service'

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

`imports: [ConfigModule]` в `TypeOrmModule.forRootAsync` нужен, чтобы TypeORM-модуль явно получил доступ к `ConfigService`.

Цепочка подключения:

```txt
.env.local / .env
  ↓
databaseConfig
  ↓
configLoaders
  ↓
ConfigModule
  ↓
ConfigService
  ↓
getTypeOrmConfig
  ↓
TypeOrmModule
  ↓
PostgreSQL
```

На текущем этапе `synchronize` должен быть выключен:

```ts
synchronize: false
```

Структура базы должна создаваться через миграции.

## Локальная база данных

Для локальной разработки используется PostgreSQL 16.

Создана локальная база данных:

```txt
recipes_app_dev
```

Для просмотра и ручного управления базой используется pgAdmin 4.

pgAdmin 4 не является сервером базы данных. Это только графический клиент.

PostgreSQL на Windows работает как служба. Поэтому при обычной разработке не нужно запускать pgAdmin каждый раз. Достаточно, чтобы была запущена служба PostgreSQL.

Проверить службу можно через:

```txt
Win + R → services.msc
```

Название службы обычно похоже на:

```txt
postgresql-x64-16
```

Для обычной разработки достаточно запустить backend:

```bash
cd backend
yarn start:dev
```

## Авторизация и роли

В будущем backend должен поддерживать:

- регистрацию;
- вход по email/password;
- подтверждение email;
- вход через внешние сервисы;
- роли пользователей;
- модерацию пользовательских рецептов.

Подробнее:

- [Авторизация и роли](./auth-and-roles.md)

## Расчёт КБЖУ

КБЖУ рецепта может:

- вводиться вручную;
- рассчитываться автоматически по ингредиентам.

Подробнее:

- [Расчёт КБЖУ](./nutrition-calculation.md)

## Планируемые слои внутри модуля

Пример для модуля рецептов:

```txt
recipes/
  dto/
    create-recipe.dto.ts
    update-recipe.dto.ts

  entities/
    recipe.entity.ts
    recipe-ingredient.entity.ts
    recipe-step.entity.ts

  mappers/
    recipe.mapper.ts

  recipes.controller.ts
  recipes.service.ts
  recipes.module.ts
```

## На текущем этапе

Архитектура backend частично зафиксирована и начата техническая настройка подключения базы данных.

Проделано:

1. Выбрана PostgreSQL.
2. Выбрана TypeORM.
3. Переустановлен PostgreSQL для чистой локальной разработки.
4. Создана база `recipes_app_dev`.
5. Настроены env-переменные для подключения к базе.
6. Создан `database config`.
7. `databaseConfig` добавлен в `configLoaders`.
8. Подготовлен `getTypeOrmConfig`.
9. Принято решение использовать `TypeOrmModule.forRootAsync`.
10. Принято решение держать `synchronize: false`.

Ближайшие технические шаги:

1. Подключить `TypeOrmModule` в `AppModule`.
2. Запустить backend и проверить подключение к PostgreSQL.
3. Настроить TypeORM DataSource для миграций.
4. Настроить команды миграций.
5. Создать первые entity.
6. Создать первую миграцию.
7. Проверить создание таблиц в базе.
