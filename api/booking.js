const allowedLessonTypes = new Set([
  'Взрослый мастер-класс',
  'Детская студия',
  'Семейное занятие',
  'Индивидуальное занятие',
  'Тематическое событие (день рождения, свидание, девичник и т.п)',
]);

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.end(JSON.stringify(payload));
}

async function readBody(request) {
  if (request.body instanceof Uint8Array) {
    return JSON.parse(new TextDecoder().decode(request.body) || '{}');
  }

  if (request.body && typeof request.body === 'object') {
    return request.body;
  }

  if (typeof request.body === 'string') {
    return JSON.parse(request.body || '{}');
  }

  let rawBody = '';

  for await (const chunk of request) {
    rawBody += chunk;
  }

  return JSON.parse(rawBody || '{}');
}

function asText(value) {
  return String(value || '').trim();
}

function escapeHtml(value) {
  return asText(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function formatDate(value) {
  const date = asText(value);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  const [year, month, day] = date.split('-').map(Number);

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function validateBooking(body) {
  const lessonType = asText(body.lessonType);
  const date = asText(body.date);
  const people = Number(body.people);
  const name = asText(body.name);
  const phone = asText(body.phone);
  const comment = asText(body.comment);

  if (!allowedLessonTypes.has(lessonType)) {
    return { error: 'Выберите тип занятия из списка.' };
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { error: 'Укажите дату занятия.' };
  }

  if (!Number.isInteger(people) || people < 1 || people > 12) {
    return { error: 'Количество гостей должно быть от 1 до 12.' };
  }

  if (name.length < 2) {
    return { error: 'Укажите имя.' };
  }

  if (phone.length < 6) {
    return { error: 'Укажите телефон для связи.' };
  }

  return {
    data: {
      lessonType,
      date,
      people,
      name,
      phone,
      comment,
    },
  };
}

function buildTelegramMessage(data) {
  const lines = [
    '<b>Новая заявка в Керамушки</b>',
    '',
    `<b>Занятие:</b> ${escapeHtml(data.lessonType)}`,
    `<b>Дата:</b> ${escapeHtml(formatDate(data.date))}`,
    `<b>Гостей:</b> ${escapeHtml(data.people)}`,
    `<b>Имя:</b> ${escapeHtml(data.name)}`,
    `<b>Телефон:</b> ${escapeHtml(data.phone)}`,
  ];

  if (data.comment) {
    lines.push(`<b>Комментарий:</b> ${escapeHtml(data.comment)}`);
  }

  lines.push('', '<i>Отправлено с сайта</i>');

  return lines.join('\n');
}

export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.statusCode = 204;
    response.end();
    return;
  }

  if (request.method !== 'POST') {
    sendJson(response, 405, { message: 'Метод не поддерживается.' });
    return;
  }

  let body;

  try {
    body = await readBody(request);
  } catch {
    sendJson(response, 400, { message: 'Не удалось прочитать данные формы.' });
    return;
  }

  const validation = validateBooking(body);

  if (validation.error) {
    sendJson(response, 400, { message: validation.error });
    return;
  }

  const message = buildTelegramMessage(validation.data);

  if (process.env.TELEGRAM_DRY_RUN === 'true') {
    sendJson(response, 200, {
      message: 'Заявка принята в тестовом режиме.',
      preview: message,
    });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    sendJson(response, 500, {
      message: 'Telegram для заявок пока не настроен.',
    });
    return;
  }

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    if (!telegramResponse.ok) {
      throw new Error(await telegramResponse.text());
    }

    sendJson(response, 200, {
      message: 'Заявка отправлена. Мы скоро свяжемся с вами.',
    });
  } catch {
    sendJson(response, 502, {
      message: 'Не получилось отправить заявку в Telegram. Попробуйте еще раз.',
    });
  }
}
