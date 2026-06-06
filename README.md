# ВкусноТут

MVP сайта с рецептами на Next.js, NestJS и PostgreSQL.

## О проекте

**ВкусноТут** — сайт для хранения, просмотра и управления рецептами.

Проект разрабатывается как fullstack-приложение с разделением на клиентскую и серверную части.

## Техническое название проекта

`recipes-app`

## Возможный slug/domain

`vkusno-tut`

## Структура проекта

```txt
recipes-app/
  backend/   # серверная часть на NestJS
  frontend/  # клиентская часть на Next.js
```

## Технологии

### Frontend

- Next.js
- React
- TypeScript

### Backend

- NestJS
- TypeScript
- PostgreSQL

### Инструменты

- Yarn
- Git / GitHub
- Concurrently

## Текущее состояние

На текущем этапе:

- создан корневой проект `recipes-app`;
- создан GitHub-репозиторий;
- добавлена базовая структура проекта;
- создано backend-приложение на NestJS;
- добавлены корневые скрипты для управления backend-приложением без перехода в папку `backend`.

Frontend-приложение пока не создано и будет добавлено на следующем этапе.

## Установка зависимостей

### Установить зависимости backend

Из корня проекта:

```bash
yarn install:back
```

Команда выполняет установку зависимостей внутри папки `backend`.

Аналогично ручному варианту:

```bash
cd backend
yarn install
```

## Запуск проекта

### Запустить backend в режиме разработки

Из корня проекта:

```bash
yarn dev:back
```

Команда запускает NestJS-приложение в режиме разработки.

Аналогично ручному варианту:

```bash
cd backend
yarn start:dev
```

## Доступные корневые скрипты

Скрипты находятся в корневом `package.json`.

```json
{
  "install:back": "yarn --cwd backend install",
  "dev:back": "yarn --cwd backend start:dev",
  "start:back": "yarn --cwd backend start",
  "build:back": "yarn --cwd backend build",
  "lint:back": "yarn --cwd backend lint"
}
```

### Описание скриптов

| Скрипт              | Назначение                                   |
| ------------------- | -------------------------------------------- |
| `yarn install:back` | Устанавливает зависимости backend-приложения |
| `yarn dev:back`     | Запускает backend в режиме разработки        |
| `yarn start:back`   | Запускает backend в обычном режиме           |
| `yarn build:back`   | Собирает backend-приложение                  |
| `yarn lint:back`    | Запускает проверку кода backend-приложения   |

## Backend

Backend-приложение находится в папке:

```txt
backend/
```

Основной стек backend:

- NestJS;
- TypeScript;
- PostgreSQL.

На текущем этапе backend создан и готовится к дальнейшей настройке: подключению конфигурации, базы данных, ORM и основных модулей приложения.

## Frontend

Frontend-приложение будет находиться в папке:

```txt
frontend/
```

Планируемый стек frontend:

- Next.js;
- React;
- TypeScript.

Frontend будет добавлен после базовой настройки backend-приложения.

## План ближайших этапов

1. Создать backend-приложение на NestJS.
2. Настроить запуск backend из корня проекта.
3. Подключить конфигурацию через `.env`.
4. Подключить PostgreSQL.
5. Настроить ORM.
6. Спроектировать базовые сущности:
   - пользователь;
   - рецепт;
   - категория;
   - ингредиент.

7. Создать frontend-приложение на Next.js.
8. Настроить взаимодействие frontend и backend.

## Статус проекта

Проект находится на начальном этапе разработки.

Сейчас реализуется MVP-версия приложения.
