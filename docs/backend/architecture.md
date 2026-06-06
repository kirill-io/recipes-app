# Backend architecture

Документ описывает планируемую архитектуру backend-части проекта **ВкусноТут**.

## Стек backend

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Yarn

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
  database/

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
- связи описываются через entity;
- сложная логика не должна находиться внутри entity.

### 5. Конфигурация через env

Конфигурация приложения берётся из переменных окружения.

Базовые переменные:

```env
NODE_ENV=development
PORT=5000
```

Планируемые переменные для PostgreSQL:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=recipes_app
```

### 6. Авторизация и роли

В будущем backend должен поддерживать:

- регистрацию;
- вход по email/password;
- подтверждение email;
- вход через внешние сервисы;
- роли пользователей;
- модерацию пользовательских рецептов.

Подробнее:

- [Авторизация и роли](./auth-and-roles.md)

### 7. Расчёт КБЖУ

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

На текущем этапе архитектура фиксируется в документации.

Ближайшие технические шаги:

1. Подключить PostgreSQL.
2. Подключить TypeORM.
3. Настроить database module.
4. Настроить миграции.
5. Создать первые entity.
6. Создать первую миграцию.
