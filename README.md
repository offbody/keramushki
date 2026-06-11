# Керамушки

Сайт керамической мастерской с галереей, описанием форматов занятий, блоком основателя и формой записи.

Форма отправляет заявку на endpoint `/api/booking`, а endpoint пересылает данные в Telegram через Bot API.

## Локальный запуск

```bash
npm install
npm run dev
```

Если в локальной среде нет `npm`, можно использовать dependency-free preview:

```bash
node scripts/build-static.mjs
TELEGRAM_DRY_RUN=true node scripts/preview.mjs
```

## Сборка

Для Vite/React-хостинга:

```bash
npm run build
```

Папка результата: `dist`.

Для облачного Node-сервера после сборки запускайте:

```bash
npm run start
```

Сервер сам возьмет порт из переменной `PORT`, отдаст папку `dist` и обработает `/api/booking`.

## Настройки хостинга

- Framework preset: `Node.js`, `Vite` или `React`
- Install command: `npm install`
- Build command: `npm run build`
- Start command: `npm run start`
- Output directory: `dist`, если хостинг работает в статическом режиме
- Node.js: `20.19+` или `24`

Подробная инструкция: [DEPLOY.md](./DEPLOY.md).

## Telegram заявки

Нужно добавить переменные окружения на хостинге:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Не добавляйте `TELEGRAM_DRY_RUN` на продакшене.

Пример переменных есть в `.env.example`.

## Структура

- `index.html` - входная HTML-страница
- `src/main.js` - контент страницы и клиентская логика формы
- `src/styles.css` - стили сайта
- `server.mjs` - production-сервер для облачного Node-деплоя
- `api/booking.js` - endpoint для Telegram-заявок
- `public/assets` - изображения, логотипы, шрифты
