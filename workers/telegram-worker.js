const lessonPeopleLimits = {
  'Взрослый мастер-класс': 6,
  'Детская студия': 6,
  'Семейное занятие': 6,
  'Индивидуальное занятие': 4,
  'Тематическое событие (день рождения, свидание, девичник и т.п)': 10,
};

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

function getCorsHeaders(request, env) {
  const requestOrigin = request.headers.get('Origin');
  const allowedOrigin = env.ALLOWED_ORIGIN || requestOrigin || '*';

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function sendJson(payload, status, corsHeaders) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function validateBooking(body) {
  const lessonType = asText(body.lessonType);
  const date = asText(body.date);
  const people = Number(body.people);
  const name = asText(body.name);
  const phone = asText(body.phone);
  const comment = asText(body.comment);

  if (!Object.hasOwn(lessonPeopleLimits, lessonType)) {
    return { error: 'Выберите тип занятия из списка.' };
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { error: 'Укажите дату занятия.' };
  }

  if (!Number.isInteger(people) || people < 1 || people > lessonPeopleLimits[lessonType]) {
    return { error: `Количество гостей для этого формата должно быть от 1 до ${lessonPeopleLimits[lessonType]}.` };
  }

  if (!/^\+?\d{11}$/.test(phone)) {
    return { error: 'Введите телефон в формате +78001234567 или 88001234567.' };
  }

  if (name.length < 2) {
    return { error: 'Укажите имя.' };
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

export default {
  async fetch(request, env) {
    const corsHeaders = getCorsHeaders(request, env);
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (url.pathname !== '/api/booking' && url.pathname !== '/') {
      return sendJson({ message: 'Endpoint не найден.' }, 404, corsHeaders);
    }

    if (request.method !== 'POST') {
      return sendJson({ message: 'Метод не поддерживается.' }, 405, corsHeaders);
    }

    let body;

    try {
      body = await request.json();
    } catch {
      return sendJson({ message: 'Не удалось прочитать данные формы.' }, 400, corsHeaders);
    }

    const validation = validateBooking(body);

    if (validation.error) {
      return sendJson({ message: validation.error }, 400, corsHeaders);
    }

    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      return sendJson({ message: 'Telegram для заявок пока не настроен.' }, 500, corsHeaders);
    }

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text: buildTelegramMessage(validation.data),
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      },
    );

    if (!telegramResponse.ok) {
      return sendJson(
        { message: 'Не получилось отправить заявку в Telegram. Попробуйте еще раз.' },
        502,
        corsHeaders,
      );
    }

    return sendJson(
      { message: 'Заявка отправлена. Мы скоро свяжемся с вами.' },
      200,
      corsHeaders,
    );
  },
};
