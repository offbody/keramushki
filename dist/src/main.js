const services = [
  {
    title: 'Мастер-классы',
    icon: '/assets/icons/master.svg',
    text: 'Два часа ручной лепки с понятным маршрутом: от мягкого пласта до чаши, подсвечника или тарелки с фактурой. Мы помогаем с формой, сушкой, обжигом и глазурью.',
    detail: 'для новичков и тех, кто давно хотел попробовать',
  },
  {
    title: 'Детская студия',
    icon: '/assets/icons/child.svg',
    text: 'Лепим зверей, домики, кружки и тайные сокровищницы. Дети учатся держать материал в руках, придумывать сюжет и видеть, как маленький кусочек глины становится вещью.',
    detail: 'бережный формат от 5 лет',
  },
  {
    title: 'Девичники и свидания',
    icon: '/assets/icons/date.svg',
    text: 'Тихий стол, теплый свет, глина вместо спешки. Можно сделать парные чашки, кольцевницы, подсвечники или тарелки с отпечатками трав и собственными символами.',
    detail: 'камерно, красиво, с фото после занятия',
  },
  {
    title: 'Дни рождения',
    icon: '/assets/icons/birth.svg',
    text: 'Готовим праздничный стол для компании, выбираем общую тему и помогаем каждому гостю уйти с личной керамической работой после обжига.',
    detail: 'для детей, подростков и взрослых',
  },
];

const gallery = [
  {
    src: '/assets/gallery/workshop-table.jpg',
    title: 'Большой стол для лепки',
    note: 'Доски, скалки, губки и инструменты уже ждут гостей.',
  },
  {
    src: '/assets/gallery/workshop-class.jpg',
    title: 'Зеленая комната',
    note: 'Растения, мягкий свет и спокойный темп ручной работы.',
  },
  {
    src: '/assets/gallery/workshop-shelves.jpg',
    title: 'Полки с глазурями',
    note: 'Образцы, баночки, кисти и керамика после первого обжига.',
  },
  {
    src: '/assets/gallery/workshop-evening.jpg',
    title: 'Вечерняя лепка',
    note: 'Теплые гирлянды, глиняные плитки и чашки для камерных встреч.',
  },
  {
    src: '/assets/gallery/workshop-glazes.jpg',
    title: 'Материалы под рукой',
    note: 'Все, что нужно для фактуры, формы и первого слоя цвета.',
  },
];

const reviews = [
  {
    quote:
      'Пришла просто попробовать, а ушла с ощущением, что наконец-то выключила шум в голове. Чашка получилась неровная, но самая любимая.',
    name: 'Алина',
    meta: 'мастер-класс по ручной лепке',
  },
  {
    quote:
      'Детский день рождения прошел спокойно и очень красиво. Никто не скучал, даже взрослые включились и лепили свои тарелки.',
    name: 'Марина',
    meta: 'праздник на 9 гостей',
  },
  {
    quote:
      'Мы делали парные подсвечники на свидании. Очень нежный формат: не нужно быть художником, мастера ведут и помогают ровно там, где нужно.',
    name: 'Илья и Соня',
    meta: 'керамическое свидание',
  },
];

const studioPhone = '+79289758535';
const studioTelegramPhone = studioPhone.replace(/\D/g, '');

const lessonPeopleLimits = {
  'Взрослый мастер-класс': 6,
  'Детская студия': 6,
  'Семейное занятие': 6,
  'Индивидуальное занятие': 4,
  'Тематическое событие (день рождения, свидание, девичник и т.п)': 10,
};

const navItems = [
  ['Галерея', '#gallery'],
  ['Услуги', '#services'],
  ['Запись', '#booking'],
  ['Отзывы', '#reviews'],
];

const icons = {
  arrow:
    '<path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path>',
  calendar:
    '<path d="M8 2v4"></path><path d="M16 2v4"></path><path d="M3 10h18"></path><rect x="3" y="4" width="18" height="18" rx="2"></rect>',
  minus: '<path d="M5 12h14"></path>',
  plus: '<path d="M12 5v14"></path><path d="M5 12h14"></path>',
  spark:
    '<path d="M12 3 9.9 8.7 4 11l5.9 2.3L12 19l2.1-5.7L20 11l-5.9-2.3L12 3Z"></path>',
  flower:
    '<path d="M12 13c2.8 0 5-2.2 5-5-2.8 0-5 2.2-5 5Z"></path><path d="M12 13c-2.8 0-5-2.2-5-5 2.8 0 5 2.2 5 5Z"></path><path d="M12 13c0 2.8-2.2 5-5 5 0-2.8 2.2-5 5-5Z"></path><path d="M12 13c0 2.8 2.2 5 5 5 0-2.8-2.2-5-5-5Z"></path><path d="M12 3v18"></path>',
  users:
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.9"></path><path d="M16 3.1a4 4 0 0 1 0 7.8"></path>',
};

function icon(name) {
  return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`;
}

function render() {
  document.querySelector('#root').innerHTML = `
    <div class="site-shell">
      <header class="site-header" data-header>
        <a class="brand" href="#top" aria-label="Керамушки">
          <img class="brand-full" src="/assets/logo-night.svg" alt="Керамушки" />
          <img class="brand-compact" src="/assets/logo-cer.svg" alt="Керамушки" />
        </a>
        <nav class="main-nav" aria-label="Навигация">
          ${navItems.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}
        </nav>
        <div class="contact-dropdown" data-contact-dropdown>
          <button class="contact-dropdown-toggle" type="button" data-contact-dropdown-toggle aria-expanded="false" aria-haspopup="menu">
            ${studioPhone}
          </button>
          <div class="contact-dropdown-menu" data-contact-dropdown-menu role="menu" hidden>
            <button type="button" data-contact-action="call" role="menuitem">Позвонить</button>
            <button type="button" data-contact-action="telegram" role="menuitem">Написать в Telegram</button>
          </div>
        </div>
        <button class="contact-mobile-trigger" type="button" data-contact-sheet-open aria-haspopup="dialog">
          ${studioPhone}
        </button>
        <a class="header-action" href="#booking">Записаться</a>
      </header>

      <div class="contact-sheet" data-contact-sheet role="dialog" aria-modal="true" aria-labelledby="contact-sheet-title" hidden>
        <button class="contact-sheet-backdrop" type="button" data-contact-sheet-close aria-label="Закрыть"></button>
        <div class="contact-sheet-panel">
          <p id="contact-sheet-title">${studioPhone}</p>
          <button type="button" data-contact-action="call">Позвонить</button>
          <button type="button" data-contact-action="telegram">Написать в Telegram</button>
          <button class="contact-sheet-cancel" type="button" data-contact-sheet-close>Отмена</button>
        </div>
      </div>

      <main id="top">
        <section class="hero" aria-label="Керамическая мастерская Керамушки">
          <picture class="hero-media">
            <img src="/assets/hero-background.png" alt="" width="1672" height="941" />
          </picture>
          <div class="hero-overlay" aria-hidden="true"></div>
          <div class="hero-content">
            <p class="eyebrow hero-eyebrow">Керамическая мастерская</p>
            <h1>Керамушки</h1>
            <p class="hero-lead">
              Лепим чашки, тарелки, и то, что Вам самим нравится.<br />
              Создаем маленькие ритуалы и большие поводы встретиться за одним столом.
            </p>
            <div class="hero-actions">
              <a class="button button-ghost" href="#gallery">Смотреть мастерскую ${icon('arrow')}</a>
              <a class="button button-primary" href="#booking">${icon('calendar')} Забронировать занятие</a>
            </div>
          </div>
        </section>

        <section class="intro section-block">
          <div class="intro-copy">
            <p class="eyebrow">О мастерской</p>
            <h2>Тут глина не требует идеальности.<br />Она просит внимания.</h2>
          </div>
          <div class="intro-text">
            <p>
              В «Керамушках» можно прийти без опыта и сделать предмет, к которому потом хочется прикасаться каждый день. Мы показываем технику, помогаем с формой и бережно доводим работу до обжига.
            </p>
            <p>
              Пространство собрано вокруг большого стола: здесь удобно учиться, праздновать, разговаривать и молчать, пока руки заняты глиной.
            </p>
          </div>
        </section>

        <section class="gallery section-block" id="gallery">
          <div class="section-heading">
            <p class="eyebrow">Галерея</p>
            <h2>Мастерская, где на полках живут инструменты, глазури и будущие любимые чашки.</h2>
          </div>
          <div class="gallery-grid">
            ${gallery
              .map(
                (item, index) => `
                  <figure class="gallery-item gallery-item-${index + 1}">
                    <img src="${item.src}" alt="${item.title}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async" width="1350" height="1800" />
                    <figcaption>
                      <strong>${item.title}</strong>
                      <span>${item.note}</span>
                    </figcaption>
                  </figure>
                `,
              )
              .join('')}
          </div>
        </section>

        <section class="founder section-block" id="founder">
          <figure class="founder-portrait">
            <img src="/assets/farida-badrakova.jpg" alt="Фарида Бадракова" loading="lazy" decoding="async" width="853" height="1280" />
          </figure>
          <div class="founder-copy">
            <p class="eyebrow">Основатель</p>
            <h2>Фарида Бадракова</h2>
            <p class="founder-lead">
              Я открыла «Керамушки», чтобы у каждого было место, где можно замедлиться, потрогать глину руками и снова услышать себя.
            </p>
            <p>
              На занятиях я рядом на каждом шаге: показываю технику, помогаю найти форму и поддерживаю идею, даже если вы впервые держите глину. Мне важно, чтобы отсюда уносили не просто чашку или тарелку, а теплое воспоминание о времени, которое получилось посвятить себе.
            </p>
          </div>
        </section>

        <section class="services section-block" id="services">
          <div class="section-heading">
            <p class="eyebrow">Услуги</p>
            <h2>Форматы для первого касания и для любимой традиции.</h2>
          </div>
          <div class="service-grid">
            ${services
              .map(
                (service) => `
                  <article class="service-card">
                    <img class="service-card-icon" src="${service.icon}" alt="" />
                    <h3>${service.title}</h3>
                    <p>${service.text}</p>
                    <small>${service.detail}</small>
                  </article>
                `,
              )
              .join('')}
          </div>
        </section>

        <section class="booking section-block" id="booking">
          <div class="booking-copy">
            <p class="eyebrow">Запись</p>
            <h2>Выберите занятие, дату и размер компании.</h2>
            <p>
              После заявки мы уточним время, подскажем формат работы и подготовим стол под вашу компанию.
            </p>
          </div>
          <form class="booking-form" data-booking-form>
            <label>
              <span>Тип занятия</span>
              <select name="lessonType" required>
                <option value="Взрослый мастер-класс">Взрослый мастер-класс</option>
                <option value="Детская студия">Детская студия</option>
                <option value="Семейное занятие">Семейное занятие</option>
                <option value="Индивидуальное занятие">Индивидуальное занятие</option>
                <option value="Тематическое событие (день рождения, свидание, девичник и т.п)">Тематическое событие (день рождения, свидание, девичник и т.п)</option>
              </select>
            </label>
            <label class="date-label">
              <span>Дата</span>
              <span class="date-control">
                <input name="date" type="date" required />
                <span class="date-icon">${icon('calendar')}</span>
              </span>
            </label>
            <div class="people-field">
              <span>Количество человек</span>
              <div class="stepper">
                <button type="button" data-step="-1" aria-label="Уменьшить количество">${icon('minus')}</button>
                <output data-people-output>2</output>
                <button type="button" data-step="1" aria-label="Увеличить количество">${icon('plus')}</button>
              </div>
              <small data-people-limit></small>
              <input name="people" type="hidden" value="2" />
            </div>
            <label>
              <span>Имя</span>
              <input name="name" type="text" autocomplete="name" placeholder="Как к вам обращаться" required />
            </label>
            <label>
              <span>Телефон</span>
              <input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+7" maxlength="12" pattern="\\+?\\d{11}" required />
            </label>
            <label class="form-wide">
              <span>Комментарий</span>
              <textarea name="comment" rows="4" placeholder="Время, повод или пожелания по занятию"></textarea>
            </label>
            <button class="button button-submit" type="submit">${icon('spark')} Отправить заявку</button>
            <p class="booking-result" data-booking-result role="status" hidden></p>
          </form>
        </section>

        <section class="reviews section-block" id="reviews">
          <div class="section-heading">
            <p class="eyebrow">Отзывы</p>
            <h2>Самое ценное происходит между<br />«я не умею» и «это сделала я».</h2>
          </div>
          <div class="review-grid">
            ${reviews
              .map(
                (review) => `
                  <article class="review-card">
                    <p>«${review.quote}»</p>
                    <div>
                      <strong>${review.name}</strong>
                      <span>${review.meta}</span>
                    </div>
                  </article>
                `,
              )
              .join('')}
          </div>
        </section>
      </main>

      <footer class="footer">
        <div>
          <img src="/assets/logo-night.svg" alt="Керамушки" />
          <p>Керамическая мастерская для ручной лепки, праздников и тихих встреч с глиной.</p>
        </div>
        <a class="button button-primary" href="#booking">${icon('calendar')} Записаться</a>
      </footer>
    </div>
  `;
}

function initHeader() {
  const header = document.querySelector('[data-header]');

  if (!header) {
    return;
  }

  const syncHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
}

function initContactChoice() {
  const dropdown = document.querySelector('[data-contact-dropdown]');
  const dropdownToggle = document.querySelector('[data-contact-dropdown-toggle]');
  const dropdownMenu = document.querySelector('[data-contact-dropdown-menu]');
  const sheet = document.querySelector('[data-contact-sheet]');
  const sheetOpenButton = document.querySelector('[data-contact-sheet-open]');
  const sheetCloseButtons = document.querySelectorAll('[data-contact-sheet-close]');
  const sheetActionButtons = document.querySelectorAll('[data-contact-action]');

  function runContactAction(action) {
    if (action === 'call') {
      window.location.href = `tel:${studioPhone}`;
      return;
    }

    if (action === 'telegram') {
      window.location.href = `tg://resolve?phone=${studioTelegramPhone}`;
      window.setTimeout(() => {
        if (document.visibilityState === 'visible') {
          window.location.href = `https://t.me/+${studioTelegramPhone}`;
        }
      }, 700);
    }
  }

  function closeDropdown() {
    if (!dropdown || !dropdownToggle || !dropdownMenu) {
      return;
    }

    dropdown.classList.remove('is-open');
    dropdownToggle.setAttribute('aria-expanded', 'false');
    dropdownMenu.hidden = true;
  }

  function openDropdown() {
    if (!dropdown || !dropdownToggle || !dropdownMenu) {
      return;
    }

    dropdown.classList.add('is-open');
    dropdownToggle.setAttribute('aria-expanded', 'true');
    dropdownMenu.hidden = false;
  }

  function toggleDropdown() {
    if (dropdownMenu?.hidden) {
      openDropdown();
    } else {
      closeDropdown();
    }
  }

  function openSheet() {
    if (!sheet) {
      return;
    }

    sheet.hidden = false;
    document.body.classList.add('has-contact-sheet');
  }

  function closeSheet() {
    if (!sheet) {
      return;
    }

    sheet.hidden = true;
    document.body.classList.remove('has-contact-sheet');
  }

  dropdownToggle?.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleDropdown();
  });

  dropdownMenu?.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  sheetOpenButton?.addEventListener('click', openSheet);

  sheetCloseButtons.forEach((button) => {
    button.addEventListener('click', closeSheet);
  });

  sheetActionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.contactAction;
      closeDropdown();
      closeSheet();
      runContactAction(action);
    });
  });

  window.addEventListener('click', (event) => {
    if (dropdown && !dropdown.contains(event.target)) {
      closeDropdown();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDropdown();

      if (sheet && !sheet.hidden) {
        closeSheet();
      }
    }
  });
}

function initBooking() {
  const form = document.querySelector('[data-booking-form]');
  const lessonSelect = form?.elements.lessonType;
  const peopleInput = form?.elements.people;
  const dateInput = form?.elements.date;
  const phoneInput = form?.elements.phone;
  const output = document.querySelector('[data-people-output]');
  const result = document.querySelector('[data-booking-result]');
  const limitHint = document.querySelector('[data-people-limit]');
  const stepButtons = form?.querySelectorAll('[data-step]');
  let people = 2;

  if (!form || !lessonSelect || !peopleInput || !dateInput || !phoneInput || !output || !result || !limitHint || !stepButtons) {
    return;
  }

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const toInputDate = (date) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
    return localDate.toISOString().slice(0, 10);
  };
  dateInput.min = toInputDate(today);
  dateInput.value = toInputDate(tomorrow);

  function getPeopleMax() {
    return lessonPeopleLimits[lessonSelect.value] || 6;
  }

  function syncPeopleControls() {
    const max = getPeopleMax();
    limitHint.textContent = `До ${max} ${max === 1 ? 'человека' : 'человек'}`;

    stepButtons.forEach((button) => {
      const step = Number(button.dataset.step);
      button.disabled = step < 0 ? people <= 1 : people >= max;
    });
  }

  function setPeople(value) {
    people = Math.min(getPeopleMax(), Math.max(1, value));
    peopleInput.value = String(people);
    output.textContent = String(people);
    syncPeopleControls();
  }

  function normalizePhone(value) {
    const raw = String(value || '').trim();
    const startsWithPlus = raw.startsWith('+');
    const digits = raw.replace(/\D/g, '').slice(0, 11);

    return startsWithPlus ? `+${digits}` : digits;
  }

  function validatePhone() {
    const digits = phoneInput.value.replace(/\D/g, '');
    const isValid = digits.length === 11 && /^\+?\d{11}$/.test(phoneInput.value);

    phoneInput.setCustomValidity(
      isValid ? '' : 'Введите 11 цифр телефона: +78001234567 или 88001234567.',
    );
  }

  lessonSelect.addEventListener('change', () => {
    setPeople(people);
  });

  phoneInput.addEventListener('input', () => {
    phoneInput.value = normalizePhone(phoneInput.value);
    validatePhone();
  });

  phoneInput.addEventListener('blur', () => {
    if (phoneInput.value === '+') {
      phoneInput.value = '';
    }
  });

  stepButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setPeople(people + Number(button.dataset.step));
    });
  });

  setPeople(people);

  function showResult(message, state = 'info') {
    result.hidden = false;
    result.dataset.state = state;
    result.textContent = message;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    validatePhone();

    if (!form.reportValidity()) {
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const data = Object.fromEntries(new FormData(form).entries());
    data.people = String(people);

    submitButton.disabled = true;
    form.setAttribute('aria-busy', 'true');
    showResult('Отправляем заявку...', 'info');

    try {
      const bookingEndpoint =
        window.CERAMUSHKI_BOOKING_ENDPOINT ||
        undefined ||
        '/api/booking';

      const response = await fetch(bookingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.message || 'Не получилось отправить заявку.');
      }

      showResult(payload.message || 'Заявка отправлена. Мы скоро свяжемся с вами.', 'success');
      form.reset();
      dateInput.value = toInputDate(tomorrow);
      setPeople(2);
    } catch (error) {
      showResult(error.message || 'Не получилось отправить заявку. Попробуйте еще раз.', 'error');
    } finally {
      submitButton.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
}

function initHashScroll() {
  if (!window.location.hash) {
    return;
  }

  window.requestAnimationFrame(() => {
    document.querySelector(window.location.hash)?.scrollIntoView();
    window.dispatchEvent(new Event('scroll'));
  });
}

render();
initHeader();
initContactChoice();
initBooking();
initHashScroll();
