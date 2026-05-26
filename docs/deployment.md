# Подробная инструкция деплоя на VPS

Проект собирается как статический сайт Next.js и отдается из Docker-контейнера с Nginx. На публичной части нет backend, базы данных, форм, cookies, аналитики, пикселей, callback-виджетов и CRM-скриптов.

Целевая схема:

```text
Пользователь -> HTTPS 443 -> Nginx на сервере -> 127.0.0.1:3000 -> Docker container tekyon-site -> static HTML/CSS/JS
```

## 1. Что нужно до начала

Нужен VPS с Linux. Инструкция ниже рассчитана на Ubuntu 22.04/24.04.

Также нужны:

- доступ по SSH к серверу;
- домен `tekyon.ru`;
- DNS-доступ к домену;
- открытые порты `80` и `443`;
- установленный Git, если проект будет загружаться через репозиторий.

## 2. Настроить DNS

В панели домена создайте записи:

```text
A     tekyon.ru       SERVER_IP
A     www.tekyon.ru   SERVER_IP
```

Если используется IPv6, можно дополнительно добавить `AAAA`.

Проверка с локального компьютера:

```bash
nslookup tekyon.ru
nslookup www.tekyon.ru
```

Обе записи должны указывать на IP сервера.

## 3. Подключиться к серверу

```bash
ssh root@SERVER_IP
```

Если используется отдельный пользователь:

```bash
ssh deploy@SERVER_IP
```

Дальше команды с `sudo` выполняются от пользователя с правами администратора.

## 4. Установить системные пакеты

```bash
sudo apt update
sudo apt install -y ca-certificates curl git nginx certbot python3-certbot-nginx
```

Установите Docker:

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Запустите сервисы:

```bash
sudo systemctl enable --now docker nginx
docker --version
docker compose version
```

## 5. Подготовить директорию проекта

```bash
sudo mkdir -p /opt/tekyon-site
sudo chown -R $USER:$USER /opt/tekyon-site
cd /opt/tekyon-site
```

## 6. Загрузить проект на сервер

Вариант через Git:

```bash
git clone REPOSITORY_URL .
```

Если проект загружается архивом, скопируйте файлы в `/opt/tekyon-site`. В корне должны быть:

```text
Dockerfile
docker-compose.yml
package.json
package-lock.json
src/
public/
nginx/default.conf
deploy/nginx-reverse-proxy.conf
.env.production.example
```

Проверьте:

```bash
ls -la
```

## 7. Создать production `.env`

Не переносите старый локальный `.env`, где могли остаться переменные backend, базы данных или SMTP.

Создайте новый:

```bash
cp .env.production.example .env
nano .env
```

Содержимое должно быть таким:

```env
NEXT_PUBLIC_SITE_URL=https://www.tekyon.ru
APP_HOST=127.0.0.1
APP_PORT=3000
```

Почему так:

- `NEXT_PUBLIC_SITE_URL` нужен для canonical URL и sitemap.
- `APP_HOST=127.0.0.1` закрывает контейнер от прямого доступа из интернета.
- `APP_PORT=3000` открывает сайт только локально для host Nginx.

## 8. Проверить проект перед запуском

Если на сервере установлен Node.js, можно выполнить полную проверку:

```bash
npm ci
npm run predeploy
```

`predeploy` делает:

- ESLint;
- тесты;
- production build;
- проверку статического HTML на формы, поля ввода, iframe, внешние скрипты, трекеры и ссылку `/cases`.

Если Node.js на сервере не установлен, этот шаг можно выполнить локально до загрузки проекта. Docker все равно соберет проект внутри контейнера.

## 9. Собрать и запустить Docker-контейнер

```bash
docker compose up -d --build
```

Проверить состояние:

```bash
docker compose ps
```

Ожидаемо:

```text
tekyon-site   tekyon-site:latest   Up ... (healthy)   127.0.0.1:3000->80/tcp
```

Проверить healthcheck:

```bash
curl -I http://127.0.0.1:3000/healthz
```

Ожидаемый ответ:

```text
HTTP/1.1 204 No Content
```

Проверить главную:

```bash
curl -I http://127.0.0.1:3000/
```

## 10. Выпустить SSL-сертификат

До выпуска сертификата DNS уже должен указывать на сервер.

```bash
sudo certbot --nginx -d www.tekyon.ru -d tekyon.ru
```

На вопрос о redirect HTTP -> HTTPS выбирайте redirect.

Проверьте, где Certbot создал сертификат:

```bash
sudo ls -la /etc/letsencrypt/live/
```

Обычно путь будет:

```text
/etc/letsencrypt/live/www.tekyon.ru/fullchain.pem
/etc/letsencrypt/live/www.tekyon.ru/privkey.pem
```

Если путь отличается, его нужно указать в Nginx-конфиге.

## 11. Настроить host Nginx reverse proxy

Скопируйте готовый пример:

```bash
sudo cp /opt/tekyon-site/deploy/nginx-reverse-proxy.conf /etc/nginx/sites-available/tekyon.ru
```

Откройте файл:

```bash
sudo nano /etc/nginx/sites-available/tekyon.ru
```

Проверьте:

- `server_name tekyon.ru www.tekyon.ru;`
- `proxy_pass http://127.0.0.1:3000;`
- пути `ssl_certificate` и `ssl_certificate_key`.

Включите сайт:

```bash
sudo ln -sf /etc/nginx/sites-available/tekyon.ru /etc/nginx/sites-enabled/tekyon.ru
```

Если включен дефолтный сайт Nginx и он мешает, отключите его:

```bash
sudo rm -f /etc/nginx/sites-enabled/default
```

Проверить конфиг:

```bash
sudo nginx -t
```

Перезагрузить Nginx:

```bash
sudo systemctl reload nginx
```

## 12. Настроить firewall

Если используется UFW:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

Не открывайте порт `3000` наружу. Он должен быть доступен только на `127.0.0.1`.

## 13. Проверить сайт после публикации

```bash
curl -I https://www.tekyon.ru/
curl -I https://www.tekyon.ru/healthz
curl -I https://tekyon.ru/
```

Ожидаемо:

- `https://www.tekyon.ru/` возвращает `200`;
- `https://www.tekyon.ru/healthz` возвращает `204`;
- `https://tekyon.ru/` редиректит на `https://www.tekyon.ru/`.

Проверить удаленную страницу кейсов:

```bash
curl -I https://www.tekyon.ru/cases/
```

Ожидаемо: `404`.

Проверить sitemap:

```bash
curl -s https://www.tekyon.ru/sitemap.xml | grep cases && echo "unexpected /cases link"
```

Если команда ничего не вывела, ссылки на `/cases` нет.

Проверить, что нет интерфейса сбора данных:

```bash
curl -s https://www.tekyon.ru/ | grep -Ei '<form|<input|<textarea|<select|<iframe' && echo "unexpected data collection UI"
```

Если команда ничего не вывела, запрещенные элементы не найдены на главной.

Проверить security headers:

```bash
curl -I https://www.tekyon.ru/ | grep -Ei 'content-security-policy|x-frame-options|x-content-type-options|referrer-policy|permissions-policy|strict-transport-security'
```

Должны быть заголовки:

- `Content-Security-Policy`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- `Strict-Transport-Security`

## 14. Проверить в браузере

Откройте:

- `https://www.tekyon.ru/`
- `https://www.tekyon.ru/services/`
- `https://www.tekyon.ru/pricing/`
- `https://www.tekyon.ru/process/`
- `https://www.tekyon.ru/about/`
- `https://www.tekyon.ru/faq/`
- `https://www.tekyon.ru/contact/`
- `https://www.tekyon.ru/legal/privacy-policy/`
- `https://www.tekyon.ru/legal/no-personal-data-collection/`
- `https://www.tekyon.ru/legal/requisites/`
- `https://www.tekyon.ru/legal/public-offer/`

В DevTools проверьте:

- Network: нет запросов к Яндекс.Метрике, Google Analytics, пикселям, CRM, callback-сервисам, calltracking и iframe-виджетам.
- Application -> Cookies: сайт не устанавливает cookies.
- Application -> Local Storage / Session Storage: сайт не создает идентификаторы пользователя.
- Elements: нет `form`, `input`, `textarea`, `select`, `iframe`.

## 15. Обновление сайта

Для нового релиза:

```bash
cd /opt/tekyon-site
git pull
npm ci
npm run predeploy
docker compose up -d --build
docker image prune -f
```

Проверить:

```bash
docker compose ps
curl -I https://www.tekyon.ru/healthz
```

## 16. Откат на предыдущую версию

Если используется Git:

```bash
cd /opt/tekyon-site
git log --oneline -5
git checkout COMMIT_HASH
docker compose up -d --build
```

После отката:

```bash
curl -I https://www.tekyon.ru/
curl -I https://www.tekyon.ru/healthz
```

## 17. Полезные команды диагностики

Логи контейнера:

```bash
docker compose logs -f app
```

Перезапуск контейнера:

```bash
docker compose restart
```

Остановить сайт:

```bash
docker compose down
```

Проверить Nginx:

```bash
sudo nginx -t
sudo systemctl status nginx
sudo journalctl -u nginx -n 100 --no-pager
```

Проверить сертификаты:

```bash
sudo certbot certificates
sudo certbot renew --dry-run
```

## 18. Частые проблемы

### Сайт не открывается по домену

Проверьте DNS:

```bash
nslookup www.tekyon.ru
```

Проверьте firewall:

```bash
sudo ufw status
```

Проверьте Nginx:

```bash
sudo nginx -t
sudo systemctl status nginx
```

### `curl http://127.0.0.1:3000/healthz` не отвечает

Проверьте контейнер:

```bash
docker compose ps
docker compose logs app --tail=100
```

Пересоберите:

```bash
docker compose up -d --build
```

### В sitemap остался localhost

Проверьте `.env`:

```bash
cat .env
```

Должно быть:

```env
NEXT_PUBLIC_SITE_URL=https://www.tekyon.ru
```

После изменения пересоберите:

```bash
docker compose up -d --build
```

### Certbot не выпускает сертификат

Проверьте:

- DNS уже указывает на сервер;
- порт `80` открыт;
- Nginx запущен;
- нет другого сервиса на портах `80` и `443`.

Команды:

```bash
sudo ss -tulpn | grep -E ':80|:443'
sudo nginx -t
sudo systemctl reload nginx
```

## 19. Финальный чеклист

- DNS `tekyon.ru` и `www.tekyon.ru` указывают на сервер.
- Docker-контейнер `tekyon-site` запущен и healthy.
- Контейнер слушает только `127.0.0.1:3000`, не публичный `0.0.0.0:3000`.
- `https://www.tekyon.ru/` открывается.
- `https://tekyon.ru/` редиректит на `https://www.tekyon.ru/`.
- `/healthz` возвращает `204`.
- `/cases/` возвращает `404`.
- В sitemap нет `/cases`.
- На сайте нет форм и полей ввода.
- Нет cookies, аналитики, пикселей, iframe-виджетов и внешних tracker-скриптов.
- Контакты ведут только на `mailto:hello@tekyon.ru`.
- Юридические страницы доступны.
- SSL-сертификат установлен и автообновление Certbot работает.
