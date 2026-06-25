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

<!-- FRONTEND_FONTS_AND_THEME_TOOLING_STAGE_START -->
## Шрифты и тема frontend

### Подключение шрифта

Для подключения шрифтов используется встроенный механизм Next.js:

```txt
next/font
```

Выбран основной шрифт интерфейса:

```txt
Nunito Sans
```

Причины выбора:

- мягче и дружелюбнее, чем Inter;
- подходит для рецептурного/food-интерфейса;
- поддерживает кириллицу;
- хорошо читается в интерфейсах, карточках, фильтрах и описаниях рецептов.

Конфигурация шрифта хранится в:

```txt
src/config/fonts.ts
```

Пример:

```ts
import { Nunito_Sans } from 'next/font/google'

export const nunitoSans = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-nunito-sans',
  display: 'swap',
})
```

Файл находится в `src/config`, а не в `src/styles`, потому что `next/font` — это TypeScript-конфигурация Next.js, а не CSS-файл.

В `layout.tsx` шрифт подключается через CSS-переменную:

```tsx
<html lang="ru" className={nunitoSans.variable}>
  <body>{children}</body>
</html>
```

В `theme.css` шрифт пробрасывается в Tailwind:

```css
@theme inline {
  --font-sans: var(--font-nunito-sans);
}
```

В `base.css` основной шрифт применяется к `body`:

```css
body {
  font-family: var(--font-nunito-sans), system-ui, sans-serif;
}
```

### Тема и цвета

Цвета вынесены в:

```txt
src/styles/theme.css
```

Используется связка:

```txt
CSS variables + Tailwind @theme inline + light/dark themes
```

Семантические токены:

- `background`;
- `foreground`;
- `card`;
- `card-foreground`;
- `popover`;
- `popover-foreground`;
- `primary`;
- `primary-foreground`;
- `secondary`;
- `secondary-foreground`;
- `muted`;
- `muted-foreground`;
- `accent`;
- `accent-foreground`;
- `destructive`;
- `border`;
- `input`;
- `ring`;
- `brand`;
- `brand-soft`;
- `success`;
- `surface-1`;
- `surface-2`.

`@theme inline` нужен, чтобы Tailwind создавал utility-классы на основе токенов:

```txt
bg-background
text-foreground
bg-card
text-card-foreground
border-border
bg-brand
text-success
```

Светлая тема находится в `:root`.

Тёмная тема находится в `.dark`.

### Правило расширения темы

Если цвет нужен только в CSS через `var(...)`, достаточно добавить его в:

- `:root`;
- `.dark`.

Если цвет нужен как Tailwind-класс, например `bg-warning`, нужно добавить его в три места:

```css
@theme inline {
  --color-warning: var(--warning);
}

:root {
  --warning: #f59e0b;
}

.dark {
  --warning: #f59e0b;
}
```
<!-- FRONTEND_FONTS_AND_THEME_TOOLING_STAGE_END -->

<!-- FRONTEND_THEME_TOOLING_STAGE_START -->
## Theme tooling

### next-themes

Для переключения темы используется пакет:

```txt
next-themes
```

Основная настройка находится в `src/app/layout.tsx` через проектный `ThemeProvider`.

Тема применяется через CSS-класс на `html`, потому что Tailwind/CSS-тема проекта использует `.dark`.

Ключ хранения темы:

```txt
vkusno-tut-theme
```

Тема хранится на клиенте в `localStorage`.

Backend для темы не используется, потому что на текущем MVP это локальная UI-настройка пользователя.

### useIsClient

Для компонентов, которым нужны client-only значения, добавлен hook:

```txt
src/hooks/use-is-client.ts
```

Он использует `useSyncExternalStore` и возвращает:

```txt
false — во время серверного/первичного рендера
true  — когда код уже безопасно выполняется на клиенте
```

Hook используется в `ThemeSwitcher`, потому что `next-themes` читает тему из client-only окружения.

### cn

Общая утилита `cn` хранится в:

```txt
src/lib/utils.ts
```

Она объединяет:

- `clsx`;
- `tailwind-merge`.

`clsx` собирает `className` из строк, условий и объектов.

`tailwind-merge` убирает конфликтующие Tailwind-классы.

### components.json

`components.json` должен соответствовать текущей структуре frontend:

```json
{
  "tailwind": {
    "css": "src/styles/globals.css"
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

`src/ui` используется для низкоуровневых UI primitives.

`src/components` используется для проектных компонентов:

- layout;
- recipes;
- theme-switcher;
- другие прикладные компоненты.
<!-- FRONTEND_THEME_TOOLING_STAGE_END -->
