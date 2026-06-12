#!/usr/bin/env bash

set -e

ARCHITECTURE_FILE="docs/backend/architecture.md"
MIGRATIONS_FILE="docs/backend/migrations-and-seeds.md"
ROADMAP_FILE="docs/product/roadmap.md"

remove_block() {
  local file="$1"
  local start_marker="$2"
  local end_marker="$3"

  if [ -f "$file" ]; then
    sed -i "/$start_marker/,/$end_marker/d" "$file"
  fi
}

mkdir -p docs/backend docs/product

remove_block "$ARCHITECTURE_FILE" "<!-- TYPEORM_DATASOURCE_STAGE_START -->" "<!-- TYPEORM_DATASOURCE_STAGE_END -->"
remove_block "$MIGRATIONS_FILE" "<!-- TYPEORM_DATASOURCE_STAGE_START -->" "<!-- TYPEORM_DATASOURCE_STAGE_END -->"
remove_block "$ROADMAP_FILE" "<!-- TYPEORM_DATASOURCE_STAGE_START -->" "<!-- TYPEORM_DATASOURCE_STAGE_END -->"

cat >> "$ARCHITECTURE_FILE" <<'DOC'

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
DOC

cat >> "$MIGRATIONS_FILE" <<'DOC'

<!-- TYPEORM_DATASOURCE_STAGE_START -->
## Текущий этап: настройка TypeORM DataSource

На текущем этапе начата настройка инфраструктуры миграций.

Проделано:

- создана папка для database-инфраструктуры;
- создан файл `src/database/data-source.ts`;
- добавлена папка `src/database/migrations`;
- установлен пакет `dotenv` в backend;
- DataSource настроен на чтение `.env` и `.env.local`;
- DataSource переиспользует существующий `databaseConfig`;
- для DataSource используется относительный импорт `../config/database`;
- исправлена ошибка `Cannot find module '@config'` при запуске TypeORM CLI;
- добавлены команды миграций в `backend/package.json`;
- команда `migration:show` успешно выполняется.

### Почему нужен `dotenv`

Обычное NestJS-приложение читает env-файлы через:

```ts
ConfigModule.forRoot({
  envFilePath: ['.env.local', '.env'],
})
```

Но TypeORM CLI не запускает NestJS-приложение, поэтому `ConfigModule` не выполняется.

Для CLI env-файлы загружаются напрямую в `data-source.ts`:

```ts
config({ path: '.env' })
config({ path: '.env.local', override: true })
```

### Почему не используется `@config`

Alias `@config` работает в обычном backend-запуске, потому что в `main.ts` подключён:

```ts
import 'module-alias/register'
```

При запуске миграций `main.ts` не запускается.

Поэтому TypeORM CLI не знает про alias `@config`.

В `data-source.ts` используется относительный импорт:

```ts
import { databaseConfig } from '../config/database'
```

### Текущая проверка

Команда:

```bash
yarn --cwd backend migration:show
```

успешно завершилась.

Это подтверждает, что:

- TypeORM CLI видит `data-source.ts`;
- env-файлы загружаются;
- конфиг базы собирается;
- команда миграций запускается без ошибки.

### Следующий шаг

Следующий технический шаг:

1. Создать первую entity.
2. Сгенерировать первую миграцию.
3. Применить миграцию.
4. Проверить появление таблиц в pgAdmin.

Первой простой сущностью для проверки можно сделать `CategoryEntity`, потому что категории нужны для структуры рецептов и имеют простую модель данных.
<!-- TYPEORM_DATASOURCE_STAGE_END -->
DOC

cat >> "$ROADMAP_FILE" <<'DOC'

<!-- TYPEORM_DATASOURCE_STAGE_START -->
## Обновление по этапу 2: TypeORM DataSource и миграции

Статус этапа **"База данных и ORM"**: в процессе.

Дополнительно проделано:

- создан TypeORM DataSource для CLI;
- установлена зависимость `dotenv` в backend;
- настроено чтение `.env` и `.env.local` для миграций;
- добавлены команды миграций в `backend/package.json`;
- исправлена проблема с alias `@config` в `data-source.ts`;
- команда `migration:show` успешно выполняется;
- подтверждено, что TypeORM CLI готов к дальнейшей работе с миграциями.

Ближайшие задачи:

- создать первую entity;
- сгенерировать первую миграцию;
- применить миграцию;
- проверить таблицы в базе `recipes_app_dev`;
- после этого перейти к полноценному описанию базовых сущностей проекта.
<!-- TYPEORM_DATASOURCE_STAGE_END -->
DOC

echo "Документация по TypeORM DataSource и миграциям обновлена."
