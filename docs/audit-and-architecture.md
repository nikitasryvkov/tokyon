# Compliance-аудит и целевая архитектура

## Целевое состояние

Сайт TOKYON TECH / TEKYON работает как статический информационный сайт-визитка. Он не принимает обращения через интерфейс, не хранит данные посетителей и не использует аналитику или рекламные трекеры.

## Разрешенные элементы

- Статические страницы услуг, тарифов, FAQ и юридических документов.
- Обычные навигационные ссылки.
- Прямая ссылка `mailto:hello@tekyon.ru`.
- Текстовые блоки с реквизитами.

## Удаленные элементы риска

- Форма обратной связи и компонент `ContactForm`.
- Endpoint `/api/contact`.
- Административная панель и auth-cookie.
- Prisma, PostgreSQL, миграции и таблица `contact_requests`.
- Email notification backend.
- Валидация и rate limiting для форм.
- `localStorage` для переключения темы.

## Архитектура

```text
src/app                 статические страницы Next.js App Router
src/components          публичные UI-компоненты без форм ввода
src/lib/content.ts      статический контент, реквизиты и юридические тексты
src/lib/public-data.ts  функции чтения статического контента
out                     результат статического экспорта
Dockerfile              Nginx static hosting
```

## Security baseline

Security headers должны задаваться на уровне Nginx/VPS:

- `Content-Security-Policy`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`

Перед публикацией нужно проверить отсутствие cookies, форм, трекеров, iframe и сторонних виджетов в production-сборке.
