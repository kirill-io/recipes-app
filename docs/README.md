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
