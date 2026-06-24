# Frontend architecture

<!-- FRONTEND_ARCHITECTURE_STAGE_START -->
## Текущая frontend-архитектура

Frontend находится в папке `frontend` и является отдельным Next.js-приложением внутри общего репозитория.

Принятое решение: не использовать FSD на этапе MVP.

Причина: FSD добавил бы лишнюю сложность и высокий порог входа, а текущая цель — быстро собрать понятный публичный интерфейс рецептов на современном Next.js App Router.

### Базовая структура frontend

```txt
frontend/
  src/
    app/
      layout.tsx
      page.tsx
    components/
      ui/
    lib/
      utils.ts
    hooks/
```

### Планируемая структура ближайших frontend-этапов

```txt
frontend/
  src/
    app/
      layout.tsx
      page.tsx
      recipes/
        page.tsx
        [slug]/
          page.tsx

    components/
      ui/
      layout/
        header.tsx
        footer.tsx
        page-container.tsx
      recipes/
        recipe-card.tsx
        recipe-list.tsx
        recipe-filters.tsx
        recipe-search.tsx
        recipe-detail.tsx
        recipe-ingredients.tsx
        recipe-steps.tsx
        recipe-nutrition.tsx

    lib/
      api/
        api-client.ts
        categories-api.ts
        tags-api.ts
        recipes-api.ts
      constants/
        routes.ts
        recipe.ts
      utils.ts

    types/
      api.ts
      category.ts
      tag.ts
      recipe.ts

    providers/
      query-provider.tsx

    hooks/
      use-debounce.ts
```

### Назначение основных директорий

- `src/app` — маршруты App Router, layouts, loading/error-страницы и server components;
- `src/components/ui` — компоненты shadcn/ui, которые добавляются через CLI и хранятся в проекте;
- `src/components/layout` — общие layout-компоненты приложения;
- `src/components/recipes` — компоненты каталога и детальной страницы рецептов;
- `src/lib/api` — функции работы с backend API;
- `src/lib/constants` — константы приложения;
- `src/types` — DTO и типы ответов backend;
- `src/providers` — клиентские провайдеры, например TanStack Query;
- `src/hooks` — небольшие переиспользуемые React-хуки.

### Получение данных

Для публичных страниц каталога и детальной страницы рецепта базово планируется использовать server-side data fetching через `fetch` в App Router.

TanStack Query оставлен в стеке для будущих клиентских сценариев:

- избранное;
- авторизация;
- создание и редактирование рецептов;
- мутации;
- инвалидация данных.

### Фильтры каталога

Фильтры каталога должны храниться в URL query-параметрах, потому что backend уже поддерживает фильтры:

```txt
GET /api/recipes?category=...
GET /api/recipes?tag=...
GET /api/recipes?search=...
GET /api/recipes?difficulty=...
```

Для работы с query-параметрами выбран `nuqs`.
<!-- FRONTEND_ARCHITECTURE_STAGE_END -->

<!-- FRONTEND_STYLES_ARCHITECTURE_STAGE_START -->
## Архитектура глобальных стилей

Для frontend принята отдельная структура глобальных стилей:

```txt
src/styles/
  globals.css
  theme.css
  base.css
```

### `globals.css`

`src/styles/globals.css` — единая точка входа глобальных CSS-стилей.

Он подключается один раз в `src/app/layout.tsx`:

```ts
import '@/styles/globals.css'
```

Внутри `globals.css` подключаются Tailwind, shadcn и внутренние CSS-файлы проекта:

```css
@import 'tailwindcss';
@import 'tw-animate-css';
@import 'shadcn/tailwind.css';

@import './theme.css';
@import './base.css';
```

Назначение импортов:

- `tailwindcss` — подключает Tailwind CSS v4;
- `tw-animate-css` — добавляет animation utilities, которые используются shadcn-компонентами;
- `shadcn/tailwind.css` — подключает shared Tailwind v4 utilities для выбранного shadcn preset `radix-nova`;
- `theme.css` — хранит дизайн-токены и light/dark темы;
- `base.css` — хранит базовые стили приложения.

### `theme.css`

`src/styles/theme.css` отвечает за дизайн-токены.

В нём используется:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Это задаёт работу Tailwind-варианта `dark:` через CSS-класс `.dark`.

Также используется блок:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}
```

`@theme inline` связывает CSS-переменные проекта с Tailwind utility-классами.

Например, после объявления `--color-background` можно использовать классы:

```txt
bg-background
text-background
border-background
```

Реальные значения цветов хранятся в:

- `:root` — светлая тема по умолчанию;
- `.dark` — значения переменных для тёмной темы.

Цвета называются по роли в интерфейсе, а не по конкретному оттенку.

Примеры токенов:

- `--background`;
- `--foreground`;
- `--card`;
- `--primary`;
- `--muted`;
- `--border`;
- `--brand`;
- `--success`.

Такой подход позволяет использовать один и тот же класс в компонентах:

```tsx
<div className="bg-card text-card-foreground border border-border" />
```

и получать разные значения в светлой и тёмной теме.

### `base.css`

`src/styles/base.css` содержит только базовые правила всего приложения:

- `html`;
- `body`;
- `a`;
- `button`;
- `input`;
- `textarea`;
- `select`;
- `::selection`.

На этом этапе не используется агрессивный reset списков, заголовков и параграфов.

Tailwind уже подключает свой базовый слой, а списки ингредиентов и шагов рецепта могут быть нужны как настоящие семантические списки.

Принятое правило: стили конкретных компонентов не добавлять в `base.css`.

Для компонентов использовать:

- Tailwind-классы;
- shadcn/ui;
- при необходимости CSS Modules.
<!-- FRONTEND_STYLES_ARCHITECTURE_STAGE_END -->
