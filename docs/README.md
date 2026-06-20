# Документация проекта

Документация проекта **ВкусноТут**.

## О проекте

**ВкусноТут** — MVP сайта с рецептами на Next.js, NestJS и PostgreSQL.

Проект разрабатывается как fullstack-приложение с разделением на клиентскую и серверную части.

Основная цель MVP — реализовать публичный каталог рецептов с категориями, тегами, ингредиентами, страницей рецепта и дальнейшей возможностью расширения до личного кабинета, избранного, модерации, админки и автоматического расчёта КБЖУ.

## Структура документации

```txt
docs/
  README.md

  backend/
    architecture.md
    database.md
    auth-and-roles.md
    nutrition-calculation.md
    migrations-and-seeds.md
    api.md

  product/
    recipe-structure.md
    categories-and-tags.md
    roadmap.md
```

## Backend-документация

- [Backend architecture](./backend/architecture.md)
- [Структура базы данных](./backend/database.md)
- [Авторизация и роли](./backend/auth-and-roles.md)
- [Расчёт КБЖУ](./backend/nutrition-calculation.md)
- [Миграции и seed-данные](./backend/migrations-and-seeds.md)
- [API](./backend/api.md)

## Product-документация

- [Структура рецепта](./product/recipe-structure.md)
- [Категории и теги](./product/categories-and-tags.md)
- [План развития проекта](./product/roadmap.md)

## Текущее состояние

На текущем этапе проект находится в стадии настройки backend-инфраструктуры и подключения базы данных.

Уже принято и зафиксировано:

- база данных: PostgreSQL;
- ORM: TypeORM;
- backend: NestJS;
- frontend: Next.js;
- пакетный менеджер: Yarn;
- структура документации проекта;
- базовая структура будущих сущностей базы данных;
- подход к ролям, модерации, избранному и расчёту КБЖУ.

Проделано в рамках этапа подключения базы данных:

- переустановлен PostgreSQL для чистой локальной разработки;
- выбрана локальная версия PostgreSQL 16;
- создана локальная база данных `recipes_app_dev`;
- pgAdmin 4 используется как графический клиент для просмотра PostgreSQL;
- зафиксировано, что pgAdmin не является сервером базы данных;
- зафиксировано, что PostgreSQL работает как служба Windows и не требует запуска pgAdmin при каждой разработке;
- добавлены переменные окружения для подключения к PostgreSQL;
- подготовлен `database config` в backend;
- `databaseConfig` добавлен в общий `configLoaders`;
- подготовлен `getTypeOrmConfig` для подключения TypeORM через `ConfigService`;
- подключение TypeORM выполняется через `TypeOrmModule.forRootAsync`;
- принято решение использовать `synchronize: false` и создавать структуру базы через миграции.

Текущая ближайшая задача:

- подключить `TypeOrmModule` в `AppModule`;
- проверить запуск backend;
- убедиться, что backend успешно подключается к базе `recipes_app_dev`;
- после проверки перейти к настройке TypeORM DataSource и миграций.

## Принцип разработки

Проект проектируется с учётом будущего расширения, но реализуется поэтапно.

Основной принцип:

```txt
Проектируем шире, реализуем уже.
```

Это значит, что в документации заранее фиксируются будущие возможности, но в MVP реализуется только минимальный рабочий функционал.

<!-- FIRST_CATEGORY_MIGRATION_STAGE_START -->
## Обновление: первая entity и первая миграция

На этапе настройки базы данных создана первая бизнес-сущность проекта:

- `Category`;
- путь: `backend/src/modules/categories/entities/category.entity.ts`;
- таблица в PostgreSQL: `categories`.

Для сущности `Category` сгенерирована и применена первая TypeORM-миграция:

- `CreateCategoriesTable`;
- путь миграций: `backend/src/database/migrations`.

Миграция создаёт таблицу `categories` и уникальный индекс для поля `slug`.

Текущий подтверждённый рабочий цикл:

```txt
TypeORM entity → migration:generate → migration:run → PostgreSQL
```

Команда проверки состояния миграций:

```bash
yarn --cwd backend migration:show
```

После применения миграции таблица `categories` доступна в базе `recipes_app_dev`.

Следующий шаг — перейти от проверки миграций к созданию полноценного модуля категорий:

- `CategoriesModule`;
- `CategoriesService`;
- `CategoriesController`;
- подключение `TypeOrmModule.forFeature([Category])`;
- первый API для получения списка категорий.
<!-- FIRST_CATEGORY_MIGRATION_STAGE_END -->

<!-- CATEGORIES_API_SWAGGER_STAGE_START -->
## Обновление: модуль категорий, seed-данные и Swagger

После создания первой сущности `Category` и применения первой миграции добавлен первый полноценный backend-модуль проекта — `CategoriesModule`.

На текущем этапе реализовано:

- создан `CategoriesModule`;
- создан `CategoriesService`;
- создан `CategoriesController`;
- модуль категорий подключён в `AppModule`;
- добавлена ручка получения активных категорий;
- добавлен seed-скрипт для стартового наполнения таблицы `categories`;
- подключён Swagger/OpenAPI для документации API;
- стандартные `AppController` и `AppService`, созданные NestJS по умолчанию, удалены как лишний стартовый код.

Backend теперь имеет первый рабочий вертикальный слой:

```txt
PostgreSQL → TypeORM Repository → CategoriesService → CategoriesController → HTTP API
```

С учётом глобального API-префикса ручка категорий доступна по адресу:

```txt
GET /{apiPrefix}/categories
```

Если `apiPrefix=api`, итоговый путь:

```txt
GET /api/categories
```

Swagger UI доступен по адресу:

```txt
/{apiPrefix}/swagger
```

Если `apiPrefix=api`, итоговый путь:

```txt
/api/swagger
```
<!-- CATEGORIES_API_SWAGGER_STAGE_END -->

<!-- TAGS_STAGE_START -->
## Обновление: справочник тегов

После реализации справочника категорий добавлен второй справочник MVP — теги.

На текущем этапе реализовано:

- создана сущность `Tag`;
- создана таблица `tags`;
- для `slug` добавлен уникальный индекс;
- создан `TagsModule`;
- создан `TagsService`;
- создан `TagsController`;
- создан `TagResponseDto`;
- добавлена ручка получения активных тегов;
- ручка тегов описана в Swagger/OpenAPI;
- seed-скрипт расширен стартовыми тегами;
- справочники категорий и тегов теперь формируют основу будущей фильтрации рецептов.

Backend теперь содержит два базовых публичных справочника:

```txt
GET /{apiPrefix}/categories
GET /{apiPrefix}/tags
```

Если `apiPrefix=api`, фактические пути:

```txt
GET /api/categories
GET /api/tags
```

Категории используются как основные разделы рецептов, а теги — как дополнительные признаки: способ приготовления, состав, назначение, диетические особенности и сценарии использования.

Ближайшие следующие шаги:

- добавить справочник единиц измерения;
- добавить справочник ингредиентов;
- перейти к проектированию сущности рецепта;
- связать рецепты с категориями, тегами и ингредиентами.
<!-- TAGS_STAGE_END -->

<!-- UNITS_STAGE_START -->
## Обновление: справочник единиц измерения

После справочников категорий и тегов добавлен справочник единиц измерения `units`.

На этом этапе реализована базовая инфраструктура для будущего состава рецептов и расчёта КБЖУ:

- создана сущность `Unit`;
- создан enum `UnitType` со значениями `mass`, `volume`, `count`;
- создана таблица `units`;
- добавлен уникальный индекс по `slug`;
- добавлены поля `name`, `short_name`, `slug`, `type`, `conversion_factor_to_base`, `sort_order`, `is_active`, `created_at`, `updated_at`;
- добавлены `UnitsModule`, `UnitsService`, `UnitsController`;
- добавлен `UnitResponseDto`;
- добавлена публичная ручка получения активных единиц измерения;
- ручка описана в Swagger/OpenAPI;
- seed-скрипт расширен стартовыми единицами измерения;
- seed для `units` выполняется через `upsert` по `slug`.

Публичная ручка:

```txt
GET /{apiPrefix}/units
```

Если `apiPrefix=api`, фактический путь:

```txt
GET /api/units
```

Актуальный адрес Swagger/OpenAPI:

```txt
http://localhost:5000/api/docs
```

Единицы измерения пока являются самостоятельным справочником.

Пересчёты вида `1 яйцо = 50 г`, `1 ст. л. муки = 25 г` на этом этапе не реализуются, потому что такие значения зависят от конкретного ингредиента. Для этого позже будет отдельная таблица связок:

```txt
ingredient_unit_conversions
```
<!-- UNITS_STAGE_END -->

<!-- INGREDIENTS_STAGE_START -->
## Обновление: справочник ингредиентов

После справочника единиц измерения добавлен отдельный справочник ингредиентов.

На этом этапе реализовано:

- создана сущность `Ingredient`;
- создана таблица `ingredients`;
- добавлены поля КБЖУ на 100 г продукта:
  - `calories_per_100g`;
  - `proteins_per_100g`;
  - `fats_per_100g`;
  - `carbohydrates_per_100g`;
- добавлены стандартные поля справочника:
  - `name`;
  - `slug`;
  - `description`;
  - `sort_order`;
  - `is_active`;
  - `created_at`;
  - `updated_at`;
- создан `IngredientResponseDto`;
- созданы `IngredientsModule`, `IngredientsService`, `IngredientsController`;
- `IngredientsModule` подключён в `AppModule`;
- добавлена публичная ручка получения активных ингредиентов;
- ручка описана в Swagger/OpenAPI;
- seed-скрипт расширен стартовыми ингредиентами;
- заполнение ингредиентов выполняется через `upsert` по `slug`.

Публичная ручка:

```txt
GET /{apiPrefix}/ingredients
```

Если `apiPrefix=api`, фактический путь:

```txt
GET /api/ingredients
```

Актуальный адрес Swagger/OpenAPI:

```txt
http://localhost:5000/api/docs
```

Справочник ингредиентов нужен как основа будущего расчёта КБЖУ рецептов.

На текущем этапе ингредиенты существуют отдельно от рецептов. Связь ингредиентов с рецептами будет добавляться позже через таблицу состава рецепта.
<!-- INGREDIENTS_STAGE_END -->

<!-- INGREDIENT_UNIT_CONVERSIONS_STAGE_START -->
## Обновление: конверсии ингредиентов в граммы

После справочников единиц измерения и ингредиентов добавлена таблица конверсий ингредиентов в граммы:

```txt
ingredient_unit_conversions
```

Эта таблица нужна для случаев, когда количество ингредиента указывается не напрямую в граммах, а через единицы вроде:

- `1 шт.`;
- `1 ч. л.`;
- `1 ст. л.`;
- `1 мл`.

Обычный справочник единиц измерения не может сам определить вес продукта в граммах, потому что вес зависит от конкретного ингредиента.

Примеры:

```txt
1 куриное яйцо = 55 г
1 банан = 120 г
1 ст. л. оливкового масла = 13.5 г
1 ч. л. оливкового масла = 4.5 г
1 ст. л. молока = 15 г
```

На этом этапе реализовано:

- создана сущность `IngredientUnitConversion`;
- создана таблица `ingredient_unit_conversions`;
- добавлена связь с `Ingredient`;
- добавлена связь с `Unit`;
- добавлено поле `grams_per_unit`;
- добавлены служебные поля `description`, `sort_order`, `is_active`, `created_at`, `updated_at`;
- добавлена уникальность пары `ingredient_id + unit_id`;
- добавлены `IngredientUnitConversionsModule`, `IngredientUnitConversionsService`, `IngredientUnitConversionsController`;
- добавлен `IngredientUnitConversionResponseDto`;
- модуль подключён в `AppModule`;
- добавлена публичная ручка получения активных конверсий;
- ручка описана в Swagger/OpenAPI;
- добавлен seed-файл `ingredient-unit-conversions.seed.ts`;
- общий `run-seeds.ts` расширен заполнением конверсий через преобразование `ingredientSlug` и `unitSlug` в реальные `ingredientId` и `unitId`.

Публичная ручка:

```txt
GET /{apiPrefix}/ingredient-unit-conversions
```

Если `apiPrefix=api`, фактический путь:

```txt
GET /api/ingredient-unit-conversions
```

Актуальный адрес Swagger/OpenAPI:

```txt
http://localhost:5000/api/docs
```

Этот этап подготавливает базу для будущей таблицы состава рецепта `recipe_ingredients` и автоматического расчёта КБЖУ.
<!-- INGREDIENT_UNIT_CONVERSIONS_STAGE_END -->

<!-- RECIPES_STAGE_START -->
## Обновление: базовый слой рецептов

После справочников категорий, тегов, единиц измерения, ингредиентов и конверсий добавлен базовый слой рецептов.

Реализована центральная сущность проекта — `Recipe` — и таблица:

```txt
recipes
```

Рецепт связан с категорией через `category_id`, имеет публичный `slug`, базовую информацию для карточки и детальной страницы, время приготовления, количество порций, сложность, статус публикации и поля КБЖУ.

Добавлены enum-значения:

- `RecipeStatus`:
  - `draft`;
  - `pending_review`;
  - `published`;
  - `rejected`;
  - `archived`;
- `RecipeDifficulty`:
  - `easy`;
  - `medium`;
  - `hard`;
- `NutritionCalculationMode`:
  - `manual`;
  - `calculated`.

На текущем этапе рецепты заполняются стартовыми seed-данными, а КБЖУ указаны вручную через режим `manual`.

Автоматический расчёт по ингредиентам будет подключаться на следующем большом этапе после добавления состава рецепта:

```txt
recipe_ingredients
```

Также добавлены:

- `recipe_tags` — явная связующая таблица между `recipes` и `tags`;
- `recipe_steps` — шаги приготовления рецепта.

Публичные ручки рецептов:

```txt
GET /{apiPrefix}/recipes
GET /{apiPrefix}/recipes/:slug
```

Если `apiPrefix=api`, фактические пути:

```txt
GET /api/recipes
GET /api/recipes/:slug
```

Список рецептов отдаёт данные для карточек:

- базовую информацию;
- категорию;
- теги;
- КБЖУ на 100 г.

Детальная ручка дополнительно отдаёт:

- полное описание;
- общие КБЖУ;
- вес готового блюда;
- шаги приготовления.

Актуальный адрес Swagger/OpenAPI:

```txt
http://localhost:5000/api/docs
```
<!-- RECIPES_STAGE_END -->
