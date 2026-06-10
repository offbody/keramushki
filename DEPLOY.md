# Деплой и Telegram заявки

## 1. Загрузка проекта на GitHub

В папке проекта выполните:

```bash
git init
git add .
git commit -m "Initial Ceramushki site"
```

Создайте новый пустой репозиторий на GitHub, затем выполните команды, которые GitHub покажет для `push an existing repository`, например:

```bash
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

Секреты Telegram не храните в GitHub. Файлы `.env`, `.env.local` и `.env.*.local` уже добавлены в `.gitignore`.

## 2. Настройка облачного хостинга

Подключите GitHub-репозиторий в панели хостинга.

Обычно нужны такие настройки:

```text
Framework preset: Vite / React
Install command: npm install
Build command: npm run build
Output directory: dist
Node.js version: 20.19+ или 24
```

Если хостинг спрашивает путь к serverless functions, оставьте стандартный `/api`. В проекте endpoint заявки находится в `api/booking.js`.

## 3. Создание Telegram-бота

1. Откройте Telegram.
2. Найдите `@BotFather`.
3. Отправьте команду:

```text
/newbot
```

4. Задайте название, например:

```text
Керамушки заявки
```

5. Задайте username, который заканчивается на `bot`, например:

```text
ceramushki_booking_bot
```

6. BotFather выдаст токен. Это значение для:

```text
TELEGRAM_BOT_TOKEN
```

## 4. Получение TELEGRAM_CHAT_ID

Напишите любое сообщение вашему новому боту, например:

```text
тест
```

Откройте в браузере ссылку, подставив токен:

```text
https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getUpdates
```

Найдите в ответе:

```json
"chat": {
  "id": 123456789
}
```

Это число и есть:

```text
TELEGRAM_CHAT_ID
```

Если в ответе:

```json
{"ok":true,"result":[]}
```

значит бот пока не получил новых сообщений. Отправьте ему `/start` или любое сообщение и снова откройте `getUpdates`.

## 5. Если заявки должны приходить в группу

1. Добавьте бота в группу.
2. Напишите в группу любое сообщение.
3. Если бот не видит сообщения, напишите:

```text
/start@username_вашего_бота
```

4. Снова откройте:

```text
https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getUpdates
```

У группового `chat.id` часто отрицательное значение, например:

```text
-1001234567890
```

## 6. Переменные окружения на хостинге

В панели хостинга откройте раздел `Environment Variables` и добавьте:

```text
TELEGRAM_BOT_TOKEN=токен от BotFather
TELEGRAM_CHAT_ID=id чата или группы
```

Не добавляйте `TELEGRAM_DRY_RUN` на продакшене. Эта переменная нужна только для локальной проверки без реальной отправки в Telegram.

После добавления переменных сделайте redeploy.

## 7. Проверка после деплоя

1. Откройте сайт на боевом домене.
2. Перейдите к форме записи.
3. Отправьте тестовую заявку.
4. Проверьте, что сообщение пришло в Telegram.

Если форма показывает ошибку, проверьте:

- правильно ли указан `TELEGRAM_BOT_TOKEN`;
- правильно ли указан `TELEGRAM_CHAT_ID`;
- добавлен ли бот в группу, если заявки идут в группу;
- не включен ли `TELEGRAM_DRY_RUN` на продакшене.
