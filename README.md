# TOKYON TECH / TEKYON

Статический сайт-визитка IT-компании без форм обратной связи, регистрации, подписки, онлайн-чата, backend-приема заявок, базы данных посетителей, cookies, аналитики и рекламных трекеров.

Связь с компанией доступна только через прямые ссылки:

- `mailto:hello@tekyon.ru`
- `https://t.me/czzttt`

## Стек

- Next.js App Router
- TypeScript
- Static export в `out/`
- Docker + Nginx
- Vitest
- ESLint / Prettier

## Локальная разработка

```bash
npm install
npm run dev
```

Локально сайт откроется на `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

`npm run build` формирует статический экспорт в каталоге `out/`.

## Проверка перед публикацией

```bash
npm run predeploy
```

Команда запускает:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run check:static`

`check:static` проверяет HTML в `out/` на запрещенные элементы: формы, поля ввода, textarea, select, iframe, внешние скрипты, tracker-runtime и ссылки на удаленный раздел `/cases`.

## Docker

```bash
cp .env.production.example .env
docker compose up -d --build
```

По умолчанию контейнер доступен только на `127.0.0.1:3000`, чтобы публичный доступ шел через Nginx reverse proxy на сервере.

Проверка:

```bash
curl -I http://127.0.0.1:3000/healthz
curl -I http://127.0.0.1:3000/
```

## Деплой

Подробная инструкция для VPS: [docs/deployment.md](docs/deployment.md).

Пример host Nginx reverse proxy: [deploy/nginx-reverse-proxy.conf](deploy/nginx-reverse-proxy.conf).

## Модель данных

- Публичная часть не содержит `form`, `input`, `textarea`, `select` и `submit`.
- Нет endpoint для приема обращений.
- Нет PostgreSQL, Prisma, таблиц заявок, админки, авторизации и auth-cookie.
- Нет Яндекс.Метрики, Google Analytics, пикселей, callback-виджетов, CRM-скриптов и iframe-виджетов.
