# Frontend tooling

<!-- FRONTEND_TOOLING_STAGE_START -->
## Базовые инструменты frontend

Frontend использует Yarn v1 и отдельный `package.json` внутри папки `frontend`.

Основной стек frontend:

- Next.js App Router;
- React;
- TypeScript;
- Tailwind CSS;
- shadcn/ui;
- React Hook Form;
- Zod;
- `@hookform/resolvers`;
- TanStack Query;
- `nuqs`;
- `sonner`;
- `lucide-react`.

### Scripts frontend

В `frontend/package.json` используются scripts:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "typegen": "next typegen",
  "typecheck": "next typegen && tsc --noEmit",
  "format": "prettier . --write",
  "format:check": "prettier . --check",
  "validate": "yarn lint && yarn typecheck && yarn format:check"
}
```

Script `validate` используется вместо `check`, потому что в Yarn v1 команда `yarn check` является встроенной командой Yarn и может конфликтовать с пользовательским script.

### Корневые scripts

В корневом `package.json` добавлены proxy-команды для frontend:

```json
{
  "dev:front": "yarn --cwd frontend dev",
  "build:front": "yarn --cwd frontend build",
  "start:front": "yarn --cwd frontend start",
  "lint:front": "yarn --cwd frontend lint",
  "lint:front:fix": "yarn --cwd frontend lint:fix",
  "typecheck:front": "yarn --cwd frontend typecheck",
  "format:front": "yarn --cwd frontend format",
  "format:front:check": "yarn --cwd frontend format:check",
  "validate:front": "yarn --cwd frontend validate"
}
```

Также есть общий запуск backend и frontend через `concurrently`:

```json
{
  "dev": "concurrently -n BACK,FRONT -c blue,green \"yarn dev:back\" \"yarn dev:front\""
}
```

### ESLint

Frontend использует ESLint flat config в файле:

```txt
frontend/eslint.config.mjs
```

К базовым конфигам Next.js подключён `eslint-config-prettier`, чтобы ESLint не конфликтовал с Prettier по форматированию.

Идея конфигурации:

```ts
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintConfigPrettier,

  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
```

### Prettier

Prettier настроен через корневой `.prettierrc`.

Принятые правила форматирования:

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

Для frontend рекомендуется иметь отдельный файл:

```txt
frontend/.prettierignore
```

Это нужно, потому что команды форматирования запускаются с рабочей директорией `frontend`.

### TypeScript

В `frontend/tsconfig.json` включён строгий режим:

```json
{
  "strict": true
}
```

`allowJs` отключён, потому что frontend ведётся на TypeScript.

Alias для импортов:

```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

`baseUrl` не используется, потому что для текущей конфигурации `paths` он не нужен.

### Next config и Turbopack

Так как в репозитории есть несколько lock-файлов, Next.js/Turbopack может предупреждать о неявном определении workspace root.

Для frontend в `frontend/next.config.ts` задан root Turbopack:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
```

### shadcn/ui

Для UI выбран shadcn/ui с компонентной базой Radix и пресетом `radix-nova`.

Компоненты shadcn/ui добавляются через CLI и сохраняются в:

```txt
src/components/ui
```

`components.json` содержит алиасы:

```json
{
  "components": "@/components",
  "utils": "@/lib/utils",
  "ui": "@/components/ui",
  "lib": "@/lib",
  "hooks": "@/hooks"
}
```

Пакет `shadcn` должен находиться в `devDependencies`, а не в `dependencies`, потому что это инструмент разработки.

В текущем пресете используется импорт:

```ts
import 'shadcn/tailwind.css'
```

Поэтому полностью удалять пакет `shadcn` нельзя.

Компоненты, добавленные на старте:

- `button`;
- `input`;
- `card`;
- `badge`;
- `skeleton`;
- `separator`;
- `sonner`.

### VS Code

Для workspace настроены:

- форматирование при сохранении;
- Prettier как formatter по умолчанию;
- ESLint auto fix on save;
- автоматическое определение ESLint working directories;
- TypeScript SDK из `frontend/node_modules`.

Актуальные настройки VS Code для TypeScript:

```json
{
  "js/ts.tsdk.path": "frontend/node_modules/typescript/lib",
  "js/ts.tsdk.promptToUseWorkspaceVersion": true
}
```
<!-- FRONTEND_TOOLING_STAGE_END -->
