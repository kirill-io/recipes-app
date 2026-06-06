# Backend

Backend-часть проекта **ВкусноТут**.

## Описание

Backend отвечает за серверную логику приложения:

- работу с рецептами;
- категории и теги рецептов;
- ингредиенты и единицы измерения;
- расчёт пищевой ценности;
- пользователей;
- избранные рецепты;
- роли и модерацию;
- будущую админку.

Проект разрабатывается как часть fullstack-приложения `recipes-app`.

## Стек

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Yarn

## Расположение

Backend находится в папке:

```txt
backend/
```

Корневая структура проекта:

```txt
recipes-app/
  backend/
  frontend/
  docs/
  README.md
```

## Документация

Документация по backend и общей архитектуре проекта хранится в папке `docs`.

Основные документы:

- [Общая документация](../docs/README.md)
- [Backend architecture](../docs/backend/architecture.md)
- [Структура базы данных](../docs/backend/database.md)
- [Авторизация и роли](../docs/backend/auth-and-roles.md)
- [Расчёт КБЖУ](../docs/backend/nutrition-calculation.md)
- [Миграции и seed-данные](../docs/backend/migrations-and-seeds.md)
- [API](../docs/backend/api.md)
- [Структура рецепта](../docs/product/recipe-structure.md)
- [Категории и теги](../docs/product/categories-and-tags.md)
- [План развития проекта](../docs/product/roadmap.md)

## Текущее состояние

На текущем этапе:

- создано backend-приложение на NestJS;
- настроен запуск backend из корня проекта;
- подключена базовая конфигурация через `.env`;
- настроены базовые инструменты разработки;
- настроены алиасы для production-сборки через `module-alias`;
- выбран стек базы данных: PostgreSQL + TypeORM;
- проектируется структура базы данных;
- проектируются сущности рецептов, пользователей, ингредиентов, категорий, тегов и избранного.

## Установка зависимостей

Из папки `backend`:

```bash
yarn install
```

Из корня проекта:

```bash
yarn install:back
```

## Переменные окружения

Backend использует файл `.env`.

Файл `.env` не должен попадать в репозиторий.

Для примера переменных окружения используется файл:

```txt
backend/.env.example
```

Текущие базовые переменные:

```env
NODE_ENV=development
PORT=5000
```

Планируемые переменные для подключения PostgreSQL:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=recipes_app
```

## Запуск

### Запуск в режиме разработки

Из папки `backend`:

```bash
yarn start:dev
```

Из корня проекта:

```bash
yarn dev:back
```

### Обычный запуск

Из папки `backend`:

```bash
yarn start
```

Из корня проекта:

```bash
yarn start:back
```

### Сборка

Из папки `backend`:

```bash
yarn build
```

Из корня проекта:

```bash
yarn build:back
```

### Запуск production-сборки

Из папки `backend`:

```bash
yarn start:prod
```

На текущем этапе production-запуск использует команду:

```bash
node dist/src/main
```

## Линтинг и форматирование

### Проверка кода

Из папки `backend`:

```bash
yarn lint
```

Из корня проекта:

```bash
yarn lint:back
```

### Форматирование

Из папки `backend`:

```bash
yarn format
```

## Доступные backend-скрипты

Скрипты находятся в `backend/package.json`.

| Скрипт             | Назначение                                     |
| ------------------ | ---------------------------------------------- |
| `yarn build`       | Собирает backend-приложение                    |
| `yarn format`      | Форматирует файлы через Prettier               |
| `yarn start`       | Запускает backend в обычном режиме             |
| `yarn start:dev`   | Запускает backend в режиме разработки          |
| `yarn start:debug` | Запускает backend в debug-режиме               |
| `yarn start:prod`  | Запускает собранное production-приложение      |
| `yarn lint`        | Запускает ESLint с автоматическим исправлением |

## База данных

Планируемая база данных:

```txt
PostgreSQL
```

Планируемая ORM:

```txt
TypeORM
```

Основные принципы работы с базой:

- структура базы изменяется через миграции;
- `synchronize` не используется в production;
- сущности TypeORM не отдаются напрямую через API;
- для входящих данных используются DTO;
- для публичной отдачи данных используются response DTO или мапперы;
- ингредиенты хранятся в отдельном справочнике;
- КБЖУ рецептов может вводиться вручную или рассчитываться по ингредиентам.

Подробнее:

- [Структура базы данных](../docs/backend/database.md)
- [Расчёт КБЖУ](../docs/backend/nutrition-calculation.md)
- [Миграции и seed-данные](../docs/backend/migrations-and-seeds.md)

## Основные сущности

Планируемые сущности backend:

- User
- Recipe
- Category
- Tag
- Ingredient
- Unit
- IngredientUnitConversion
- RecipeIngredient
- RecipeStep
- FavoriteRecipe

На будущие этапы:

- UserAuthAccount
- EmailVerificationToken
- PasswordResetToken
- RecipeImage
- RecipeModerationHistory

## Роли пользователей

Планируемые роли:

- `USER`
- `TRUSTED_AUTHOR`
- `MODERATOR`
- `ADMIN`
- `SUPER_ADMIN`

Подробнее:

- [Авторизация и роли](../docs/backend/auth-and-roles.md)

## План ближайших backend-этапов

1. Подключить PostgreSQL.

2. Подключить TypeORM.

3. Настроить конфигурацию базы данных.

4. Настроить миграции.

5. Описать базовые entity.

6. Создать первую миграцию.

7. Добавить seed-данные:
   - категории;
   - теги;
   - единицы измерения;
   - базовые ингредиенты.

8. Реализовать первый API для рецептов:
   - получение списка рецептов;
   - получение одного рецепта по `slug`;
   - фильтрация по категориям и тегам.

## Статус

Backend находится на этапе подключения базы данных, настройки ORM и проектирования основных сущностей приложения.
