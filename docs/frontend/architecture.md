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

<!-- FRONTEND_THEME_ARCHITECTURE_STAGE_START -->
## Архитектура переключения темы

Для темы используется связка:

- `next-themes`;
- `ThemeProvider`;
- CSS-класс на `html`;
- CSS variables в `theme.css`;
- `ThemeSwitcher`.

### ThemeProvider

Провайдер темы находится в:

```txt
src/providers/theme-provider.tsx
```

Он является client component и оборачивает `ThemeProvider` из `next-themes`.

В `src/app/layout.tsx` приложение оборачивается в проектный `ThemeProvider`.

Базовая конфигурация:

```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  enableColorScheme
  disableTransitionOnChange
  storageKey="vkusno-tut-theme"
>
  {children}
</ThemeProvider>
```

`attribute="class"` нужен, потому что тёмная тема в `theme.css` описана через класс `.dark`.

`defaultTheme="system"` означает, что при первом заходе тема берётся из системных настроек пользователя.

`storageKey="vkusno-tut-theme"` задаёт ключ `localStorage`, где хранится выбранная тема.

### CSS-тема

Цвета темы описаны в:

```txt
src/styles/theme.css
```

Светлая тема находится в `:root`.

Тёмная тема находится в `.dark`.

Компоненты используют не прямые hex-цвета, а семантические Tailwind-классы:

```txt
bg-background
text-foreground
bg-card
text-card-foreground
border-border
bg-primary
```

### UI primitive Switch

Универсальный переключатель находится в:

```txt
src/ui/switch.tsx
```

`Switch` построен на Radix `@radix-ui/react-switch`.

Он отвечает только за базовое поведение переключателя:

- `checked`;
- `unchecked`;
- `disabled`;
- `onCheckedChange`.

`Switch` не знает ничего про тему приложения.

Для кастомизации в нём есть необязательный prop:

```ts
thumbIcon?: ReactNode
```

Через него `ThemeSwitcher` передаёт иконку солнца или луны.

В текущем MVP `Switch` намеренно оставлен простым:

- без `data-slot`;
- без дополнительных aria-атрибутов внутри UI primitive;
- стили задаются через `cn()`;
- длинные Tailwind-классы разбиваются на несколько смысловых строк.

### Project component ThemeSwitcher

Компонент переключения темы находится в:

```txt
src/components/theme-switcher/
  index.ts
  theme-switcher.tsx
```

`ThemeSwitcher` — это проектный компонент. Он знает про `next-themes` и использует:

- `resolvedTheme`;
- `setTheme`.

`resolvedTheme` нужен, чтобы при `theme="system"` понимать фактическое состояние интерфейса: `light` или `dark`.

Для безопасного рендера используется hook:

```txt
src/hooks/use-is-client.ts
```

Он помогает не рендерить UI, завязанный на client-only данных, до перехода в клиентское состояние.

При `!isClient` компонент `ThemeSwitcher` возвращает `null`.

Для MVP `ThemeSwitcher` реализован как компактный двухпозиционный switch:

- `checked = true` для тёмной темы;
- `checked = false` для светлой темы;
- при переключении вызывается `setTheme('dark')` или `setTheme('light')`;
- иконка `Sun` или `Moon` передаётся в `Switch` через `thumbIcon`.
<!-- FRONTEND_THEME_ARCHITECTURE_STAGE_END -->

<!-- FRONTEND_HEADER_LOGO_ARCHITECTURE_STAGE_START -->
## Header, Container и Logo

### Разделение `ui`, `components`, `modules`

Во frontend MVP принято разделение:

```txt
src/ui
  Низкоуровневые UI primitives, которые не знают о предметной области:
  button, switch, input, card.

src/components
  Небольшие переиспользуемые проектные компоненты:
  container, icon, logo, theme-switcher.

src/modules
  Крупные зоны интерфейса приложения:
  header, будущий catalog, recipe-detail.
```

Компоненты в `src/components` и `src/modules` хранятся по принципу “каждый компонент в своей папке”:

```txt
component-name/
  component-name.tsx
  index.ts
```

`index.ts` используется для barrel export и не содержит JSX.

### Container

`Container` — это общая обёртка для ограничения ширины и центрирования контента.

Он отвечает только за:

- `mx-auto`;
- `w-full`;
- `max-width`.

На текущем этапе мобильные отступы не фиксируются в самом `Container`. Адаптивные `padding`/`margin` будут дорабатываться отдельно.

`Container` используется внутри крупных секций:

- `Header`;
- main content;
- footer, если он появится.

### Header

`Header` находится в:

```txt
src/modules/header
```

`Header` является крупным модулем приложения.

Он содержит:

- ссылку на главную страницу через логотип;
- `Logo`;
- `ThemeSwitcher`.

Логотип обёрнут в:

```tsx
<Link href="/" />
```

Это нужно, потому что логотип в шапке должен вести на главную страницу.

Нижняя линия `Header` реализуется через:

```txt
border-b border-border
```

Цвет `border-border` берётся из CSS theme tokens и меняется между light/dark темами.

### Logo

`Logo` находится в:

```txt
src/components/logo
```

Логотип состоит из двух частей:

- SVG icon;
- текст `ВкусноТут`.

Текст не зашивается внутрь SVG.

Это позволяет:

- менять цвет текста через тему;
- управлять шрифтом через `font-logo`;
- скрывать текст при необходимости;
- отдельно менять размер SVG-иконки;
- использовать SVG-иконку без текста.

Компонент `Logo` поддерживает:

- `withText`;
- `iconClassName`;
- `textClassName`;
- `className`.

Назначение props:

- `className` управляет корневой обёрткой;
- `iconClassName` управляет размером и цветом SVG-иконки;
- `textClassName` управляет текстом логотипа;
- `withText` включает или выключает текстовую часть логотипа.

### Icon

`Icon` находится в:

```txt
src/components/icon
```

Он принимает SVG-компонент и рендерит его внутри общей обёртки.

Такой подход позволяет единообразно управлять размерами и цветами кастомных SVG.

Пример использования по смыслу:

```tsx
<Icon icon={LogoIcon} className="size-9 text-brand" />
```

SVG должен использовать `currentColor`, чтобы цвет можно было задавать через Tailwind:

```svg
stroke="currentColor"
```

или:

```svg
fill="currentColor"
```
<!-- FRONTEND_HEADER_LOGO_ARCHITECTURE_STAGE_END -->
