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

<!-- TYPEORM_DATASOURCE_STAGE_START -->
## Обновление: TypeORM DataSource для миграций

Для работы приложения и для работы миграций используются разные точки входа.

Подключение базы внутри NestJS-приложения выполняется через:

```ts
TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: getTypeOrmConfig,
})
```

Это подключение используется при запуске backend-приложения.

Для TypeORM CLI и миграций создан отдельный DataSource:

```txt
src/database/data-source.ts
```

Причина разделения:

```txt
TypeOrmModule.forRootAsync(...) — подключение базы внутри NestJS-приложения
DataSource — подключение базы для TypeORM CLI, миграций и служебных команд
```

TypeORM CLI не запускает `main.ts`, `AppModule` и `ConfigModule`, поэтому `data-source.ts` самостоятельно загружает env-файлы через `dotenv`.

Также в `data-source.ts` используются относительные импорты вместо alias `@config`, потому что alias `@config` регистрируется в `main.ts` через `module-alias/register`, а `main.ts` при запуске TypeORM CLI не выполняется.

Правильный импорт для `data-source.ts`:

```ts
import { databaseConfig } from '../config/database'
```

Проверка DataSource выполняется командой:

```bash
yarn --cwd backend migration:show
```

Текущий результат проверки:

```txt
injected env from .env.local
Done
```

Это означает, что TypeORM CLI смог открыть `data-source.ts`, загрузить env-переменные и выполнить команду без ошибки.
<!-- TYPEORM_DATASOURCE_STAGE_END -->

<!-- FIRST_CATEGORY_MIGRATION_STAGE_START -->
## Первая бизнес-сущность и модульная структура

В backend начато формирование бизнес-слоя приложения через папку `src/modules`.

Текущая структура для первой сущности:

```txt
backend/src/modules/categories/entities/category.entity.ts
```

Сущность `Category` хранится внутри будущего модуля `categories`, а не в папке `src/database`, потому что она относится к предметной области приложения, а не к инфраструктуре базы данных.

Разделение ответственности:

- `src/config` — конфигурация приложения и подключения к базе данных;
- `src/database` — TypeORM DataSource, миграции и будущие seed-скрипты;
- `src/modules` — бизнес-модули приложения: категории, рецепты, пользователи, теги, ингредиенты.

Папка `src/database` сохраняет техническую ответственность:

```txt
backend/src/database/data-source.ts
backend/src/database/migrations
```

Entity размещаются внутри соответствующих бизнес-модулей:

```txt
backend/src/modules/<module-name>/entities
```

DTO, service, controller и module также должны размещаться внутри соответствующего бизнес-модуля.

Для категорий следующая планируемая структура:

```txt
backend/src/modules/categories/
  dto/
  entities/
    category.entity.ts
  categories.controller.ts
  categories.service.ts
  categories.module.ts
```
<!-- FIRST_CATEGORY_MIGRATION_STAGE_END -->

<!-- CATEGORIES_API_SWAGGER_STAGE_START -->
## Обновление: модуль категорий, seed-данные и Swagger

### Модульная структура backend

Backend развивается по модульному принципу.

Корень `src` содержит только сборочные и инфраструктурные элементы:

- `main.ts` — точка входа приложения;
- `app.module.ts` — корневой модуль, который собирает приложение;
- `config` — конфигурация приложения;
- `database` — TypeORM DataSource, миграции и seed-скрипты;
- `modules` — бизнес-модули приложения.

Стандартные `AppController` и `AppService`, созданные NestJS при генерации проекта, удалены, так как на текущем этапе они не содержали полезной бизнес-логики.

При необходимости health-check будет добавлен позже отдельным модулем, например `HealthModule`.

### CategoriesModule

Первым полноценным бизнес-модулем стал `CategoriesModule`.

Структура модуля:

```txt
backend/src/modules/categories/
  categories.module.ts
  categories.service.ts
  categories.controller.ts
  entities/
    category.entity.ts
  index.ts
```

Ответственность модуля:

- регистрация `Category` через `TypeOrmModule.forFeature`;
- работа с таблицей `categories` через `Repository<Category>`;
- получение активных категорий;
- сортировка категорий;
- предоставление HTTP API для списка категорий;
- Swagger-документация первой ручки категорий.

`CategoriesModule` подключается в `AppModule` через `imports`.

Сервис категории регистрируется внутри `CategoriesModule` в `providers`, а не напрямую в `AppModule`.

Контроллер категории регистрируется внутри `CategoriesModule` в `controllers`.

### Алиас `@modules`

Для импорта бизнес-модулей добавлен алиас `@modules`.

Публичный экспорт модуля категорий находится в:

```txt
backend/src/modules/categories/index.ts
```

Это позволяет подключать модуль в `AppModule` через публичный API модуля:

```ts
import { CategoriesModule } from '@modules/categories'
```

Внутри самого модуля используются относительные импорты.

### Seed-скрипты

Seed-скрипты относятся к database-инфраструктуре и размещаются в папке:

```txt
backend/src/database/seeds
```

Их задача — наполнять базу стартовыми данными.

Для категорий seed-скрипт добавляет стартовые значения в таблицу `categories`.

Миграции отвечают за структуру базы данных, а seed-скрипты — за данные.

### Swagger/OpenAPI

Для документации API подключён Swagger/OpenAPI.

Swagger-конфигурация вынесена в отдельный config-раздел:

```txt
backend/src/config/swagger
```

Swagger подключается в `main.ts` после установки глобального API-префикса.

Swagger UI доступен с учётом глобального API-префикса:

```txt
/{apiPrefix}/swagger
```

Если `apiPrefix=api`, итоговый путь:

```txt
/api/swagger
```

Первая задокументированная ручка:

```txt
GET /{apiPrefix}/categories
```
<!-- CATEGORIES_API_SWAGGER_STAGE_END -->

<!-- TAGS_MODULE_STAGE_START -->
## Обновление: модуль тегов

После модуля категорий добавлен второй backend-модуль справочников — `TagsModule`.

Модуль тегов расположен в бизнес-слое приложения:

```txt
src/modules/tags/
  dto/
    tag-response.dto.ts
  entities/
    tag.entity.ts
  tags.controller.ts
  tags.module.ts
  tags.service.ts
  index.ts
```

Сущность `Tag` описывает таблицу `tags`.

Основные поля:

- `id` — идентификатор тега;
- `name` — отображаемое название;
- `slug` — URL-идентификатор и ключ для фильтрации;
- `description` — описание тега;
- `sortOrder` / `sort_order` — порядок сортировки;
- `isActive` / `is_active` — флаг активности;
- `createdAt` / `created_at` — дата создания;
- `updatedAt` / `updated_at` — дата обновления.

Для поля `slug` используется уникальный индекс:

```ts
@Index('IDX_tags_slug', ['slug'], { unique: true })
```

`TagsModule` подключает сущность через:

```ts
TypeOrmModule.forFeature([Tag])
```

`TagsService` отвечает за:

- получение активных тегов из базы;
- сортировку тегов;
- маппинг `Tag` entity в `TagResponseDto`.

Публичный DTO ответа содержит только данные, нужные клиенту:

- `id`;
- `name`;
- `slug`;
- `description`;
- `sortOrder`.

Технические поля `isActive`, `createdAt`, `updatedAt` не отдаются в публичной ручке тегов. Поле `isActive` используется backend-ом для фильтрации активных записей.

`TagsController` предоставляет публичную ручку:

```txt
GET /tags
```

С учётом глобального API-префикса фактический путь:

```txt
GET /{apiPrefix}/tags
```

Если `apiPrefix=api`:

```txt
GET /api/tags
```

Ручка описана через Swagger/OpenAPI с помощью:

- `@ApiTags('tags')`;
- `@ApiOperation`;
- `@ApiOkResponse`;
- `TagResponseDto`.

`TagsModule` подключается в `AppModule` в массиве `imports`.
<!-- TAGS_MODULE_STAGE_END -->

<!-- UNITS_MODULE_STAGE_START -->
## Обновление: модуль единиц измерения

Добавлен backend-модуль `UnitsModule`.

Модуль расположен в бизнес-слое приложения:

```txt
src/modules/units/
  dto/
    unit-response.dto.ts
  entities/
    unit.entity.ts
  enums/
    unit-type.enum.ts
  units.controller.ts
  units.service.ts
  units.module.ts
  index.ts
```

`UnitsModule` подключается в `AppModule` как самостоятельный справочный модуль.

Модуль использует:

```ts
TypeOrmModule.forFeature([Unit])
```

Это нужно, чтобы `UnitsService` мог работать с `Repository<Unit>` через:

```ts
@InjectRepository(Unit)
```

`UnitsController` предоставляет публичную ручку получения активных единиц измерения.

`UnitsService` отвечает за:

- получение активных единиц измерения из базы;
- сортировку единиц измерения;
- преобразование `Unit` entity в `UnitResponseDto`.

Для единиц измерения добавлен отдельный enum `UnitType`, потому что `type` является фиксированной технической классификацией единицы измерения, а не пользовательским справочником.

Текущие значения `UnitType`:

```txt
mass
volume
count
```

Категории и теги не используют enum для типа, потому что они являются изменяемыми справочниками контента.

Единицы измерения тоже хранятся в базе, но их поле `type` влияет на будущую бизнес-логику пересчётов:

- `mass` — массовые единицы;
- `volume` — объёмные единицы;
- `count` — штучные единицы.
<!-- UNITS_MODULE_STAGE_END -->

<!-- INGREDIENTS_MODULE_STAGE_START -->
## Обновление: модуль ингредиентов

Для ингредиентов добавлен отдельный backend-модуль `IngredientsModule`.

Модуль расположен в бизнес-слое приложения:

```txt
src/modules/ingredients/
  dto/
    ingredient-response.dto.ts
  entities/
    ingredient.entity.ts
  ingredients.controller.ts
  ingredients.module.ts
  ingredients.service.ts
  index.ts
```

`Ingredient` является справочной сущностью и хранит пищевую ценность продукта на 100 г.

Основные поля сущности:

- `id` — числовой идентификатор;
- `name` — название ингредиента;
- `slug` — уникальный URL-идентификатор;
- `description` — описание ингредиента;
- `caloriesPer100g` — калории на 100 г;
- `proteinsPer100g` — белки на 100 г;
- `fatsPer100g` — жиры на 100 г;
- `carbohydratesPer100g` — углеводы на 100 г;
- `sortOrder` — порядок сортировки;
- `isActive` — признак активности;
- `createdAt` — дата создания;
- `updatedAt` — дата обновления.

Поля КБЖУ в PostgreSQL хранятся как `numeric`, поэтому в entity они представлены строками. В публичном DTO они преобразуются в `number`.

`IngredientsModule` использует:

```ts
TypeOrmModule.forFeature([Ingredient])
```

Это нужно, чтобы `IngredientsService` мог работать с `Repository<Ingredient>` через:

```ts
@InjectRepository(Ingredient)
```

`IngredientsService` отвечает за:

- получение активных ингредиентов из базы;
- сортировку ингредиентов;
- преобразование `Ingredient` entity в `IngredientResponseDto`;
- преобразование numeric-строк в числа для публичного API.

`IngredientsController` предоставляет публичную ручку:

```txt
GET /{apiPrefix}/ingredients
```

Если `apiPrefix=api`, фактический путь:

```txt
GET /api/ingredients
```

`IngredientsModule` подключён в `AppModule` вместе с модулями категорий, тегов и единиц измерения.
<!-- INGREDIENTS_MODULE_STAGE_END -->

<!-- INGREDIENT_UNIT_CONVERSIONS_MODULE_STAGE_START -->
## Обновление: модуль конверсий ингредиентов в граммы

Для пересчёта нестандартных единиц ингредиентов в граммы добавлен отдельный backend-модуль:

```txt
src/modules/ingredient-unit-conversions/
  dto/
    ingredient-unit-conversion-response.dto.ts
  entities/
    ingredient-unit-conversion.entity.ts
  ingredient-unit-conversions.controller.ts
  ingredient-unit-conversions.module.ts
  ingredient-unit-conversions.service.ts
  index.ts
```

`IngredientUnitConversion` является связующей сущностью между ингредиентом и единицей измерения.

Основная идея:

```txt
Ingredient + Unit → gramsPerUnit
```

Примеры:

```txt
Куриное яйцо + Штука → 55 г
Банан + Штука → 120 г
Оливковое масло + Столовая ложка → 13.5 г
Оливковое масло + Чайная ложка → 4.5 г
```

Сущность содержит поля:

- `id` — числовой идентификатор;
- `ingredientId` — идентификатор ингредиента;
- `ingredient` — связь с `Ingredient`;
- `unitId` — идентификатор единицы измерения;
- `unit` — связь с `Unit`;
- `gramsPerUnit` — количество грамм в одной указанной единице;
- `description` — пояснение к конверсии;
- `sortOrder` — порядок сортировки;
- `isActive` — признак активности;
- `createdAt` — дата создания;
- `updatedAt` — дата обновления.

Связи описаны через `ManyToOne`:

```txt
IngredientUnitConversion many-to-one Ingredient
IngredientUnitConversion many-to-one Unit
```

Для внешних ключей используется поведение `onDelete: 'CASCADE'`.

Если ингредиент или единица измерения будут физически удалены, связанные конверсии также будут удалены. В обычной бизнес-логике предполагается не физическое удаление справочников, а отключение через `isActive`.

Для пары `ingredientId + unitId` добавлен уникальный индекс. Это не позволяет создать две разные конверсии для одного и того же ингредиента и одной и той же единицы измерения.

`IngredientUnitConversionsModule` использует:

```ts
TypeOrmModule.forFeature([IngredientUnitConversion])
```

`IngredientUnitConversionsService` отвечает за:

- получение активных конверсий;
- фильтрацию по активности связанного ингредиента;
- фильтрацию по активности связанной единицы измерения;
- подгрузку данных ингредиента и единицы измерения;
- преобразование entity в `IngredientUnitConversionResponseDto`;
- преобразование `numeric`-значения `gramsPerUnit` в `number` для публичного API.

`IngredientUnitConversionsController` предоставляет публичную ручку:

```txt
GET /{apiPrefix}/ingredient-unit-conversions
```

Если `apiPrefix=api`, фактический путь:

```txt
GET /api/ingredient-unit-conversions
```
<!-- INGREDIENT_UNIT_CONVERSIONS_MODULE_STAGE_END -->

<!-- RECIPES_MODULE_STAGE_START -->
## Обновление: модуль рецептов

Добавлен модуль `RecipesModule`, который отвечает за публичное чтение рецептов.

Структура модуля:

```txt
src/modules/recipes/
  dto/
    recipe-category-response.dto.ts
    recipe-list-item-response.dto.ts
    recipe-response.dto.ts
    recipe-step-response.dto.ts
    recipe-tag-response.dto.ts
  entities/
    recipe.entity.ts
    recipe-step.entity.ts
    recipe-tag.entity.ts
  enums/
    nutrition-calculation-mode.enum.ts
    recipe-difficulty.enum.ts
    recipe-status.enum.ts
  recipes.controller.ts
  recipes.module.ts
  recipes.service.ts
  index.ts
```

`RecipesModule` подключается в `AppModule`.

Модуль регистрирует entity через:

```ts
TypeOrmModule.forFeature([Recipe, RecipeTag, RecipeStep])
```

Текущие entity модуля:

- `Recipe` — основная сущность рецепта;
- `RecipeTag` — явная связующая entity между рецептом и тегом;
- `RecipeStep` — шаг приготовления рецепта.

### Связи Recipe

`Recipe` связан:

- с `Category` через `ManyToOne` и колонку `category_id`;
- с `RecipeTag` через `OneToMany`;
- с `RecipeStep` через `OneToMany`.

Для связи рецепта с категорией используется:

```txt
onDelete: RESTRICT
```

Это нужно, чтобы случайное физическое удаление категории не удалило рецепты.

### Связи RecipeTag

`RecipeTag` связан:

- с `Recipe` через `ManyToOne` и колонку `recipe_id`;
- с `Tag` через `ManyToOne` и колонку `tag_id`.

Для связей `recipe_tags` используется каскадное удаление, потому что запись связи не имеет смысла без рецепта или тега.

### Связи RecipeStep

`RecipeStep` связан:

- с `Recipe` через `ManyToOne` и колонку `recipe_id`.

Для шагов приготовления используется каскадное удаление, потому что шаг не имеет смысла без рецепта.

### RecipesService

В `RecipesService` публичная логика разделена на два метода:

- `findAllPublished()` — получает список активных опубликованных рецептов;
- `findPublishedBySlug(slug)` — получает один активный опубликованный рецепт по `slug`.

Список рецептов загружает только связи, нужные для карточек:

- `category`;
- `recipeTags.tag`.

Шаги приготовления в списке не загружаются.

Детальная ручка загружает:

- `category`;
- `recipeTags.tag`;
- `steps`.

Маппинг entity в DTO пока находится внутри `RecipesService` в private-методах. Это допустимо для текущего этапа.

После добавления `recipe_ingredients` и расчёта КБЖУ маппинг лучше вынести в отдельный mapper-файл внутри модуля рецептов.
<!-- RECIPES_MODULE_STAGE_END -->
