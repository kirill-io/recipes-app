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
