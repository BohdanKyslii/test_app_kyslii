# Покрокова інструкція

## Крок 1 — Створи публічний репозиторій на GitHub
Зайди на https://github.com/new
- Вкажи назву репозиторію (наприклад, `test_app_kyslii`)
- Обери **Public**
- Можна одразу згенерувати `.gitignore`/README, або зробити це локально пізніше
- Натисни **Create repository**
- Скопіюй URL репозиторію (виду `https://github.com/<акаунт>/<назва>.git`) — він знадобиться у кроках нижче

## Крок 2 — Створи локальну директорію проєкту
```
mkdir Будь-яка_назва_папки
cd Будь-яка_назва_папки
```

## Крок 3 — Ініціалізуй npm-проєкт
```
npm init
```
Заповни поля, коли утиліта запитає (Enter — лишити значення за замовчуванням):
```
package name: (test_app_kyslii)
version: (1.0.0)
description: test app to vercel kyslii
entry point: (index.js)
test command: app_vercel
git repository: https://github.com/BohdanKyslii/test_app_kyslii.git   ← URL з Кроку 1
keywords: vercel
author: Kysliy_B
license: (ISC)
type: (commonjs)
```
Це створить файл `package.json`:
```json
{
  "name": "test_app_kyslii",
  "version": "1.0.0",
  "description": "test app to vercel kyslii",
  "main": "index.js",
  "scripts": {
    "test": "app_vercel"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/BohdanKyslii/test_app_kyslii.git"
  },
  "keywords": ["vercel"],
  "author": "Kysliy_B",
  "license": "ISC",
  "type": "commonjs",
  "bugs": {
    "url": "https://github.com/BohdanKyslii/test_app_kyslii/issues"
  },
  "homepage": "https://github.com/BohdanKyslii/test_app_kyslii#readme"
}
```

## Крок 4 — Встанови залежності
```
npm install express
npm install --save-dev typescript @types/express @types/node
```

## Крок 5 — Створи структуру проєкту
Створи такі директорії та файли:

- **`src/app.ts`** — основний файл Express-застосунку: створення `app`, ендпоінти (`/`, `/health`, `/products`), `app.listen(3000)` для локального запуску (обгорнутий у перевірку `if (!process.env.VERCEL)`), а в кінці `export default app`.
- **`api/index.ts`** — точка входу для Vercel; імпортує `app` із `src/app.ts` і реекспортує його як serverless-функцію:
  ```ts
  import app from '../src/app.ts';
  export default app;
  ```
- **`tsconfig.json`** — конфігурація TypeScript-компілятора (target, module, strict-режим тощо).
- **`vercel.json`** — конфігурація деплою: направляє всі запити (`/health`, `/products`, `/`) на serverless-функцію в `api/index.ts`.
- **`.gitignore`** — виключає з git `node_modules/`, `.idea/`, `.vercel/`, `*.log`.

## Крок 6 — Напиши ендпоінти
У `src/app.ts`:
- `GET /health` → повертає `true` (`res.json(true)`)
- `GET /products` → повертає масив продуктів (мінімум 3 об'єкти з `id`, `name`, `price`)

## Крок 7 — Перевір застосунок локально
```
node src/app.ts
```
В іншому терміналі:
```
curl http://localhost:3000/health
curl http://localhost:3000/products
```
`/health` має повернути `true`, `/products` — масив продуктів.

## Крок 8 — Ініціалізуй git локально та підключи до вже створеного репозиторію
```
git init
git add .
git commit -m "Initial commit: Express service with /health and /products"
git remote add origin https://github.com/BohdanKyslii/test_app_kyslii.git
git branch -M main
git push -u origin main
```

## Крок 9 — Підключи репозиторій до Vercel
- Зайди на https://vercel.com і залогінься (можна через GitHub-акаунт)
- Натисни **Add New → Project**
- Обери **Import Git Repository** і знайди свій репозиторій
- Framework Preset — залиш **Other**
- Build & Output Settings можна лишити порожніми/дефолтними — Vercel сам підхопить `api/index.ts` як serverless-функцію
- Натисни **Deploy**

Після цього кроку Vercel автоматично ставить webhook на репозиторій — з цього моменту **кожен `git push` у `main` тригерить новий деплой автоматично**, без ручних дій.

## Крок 10 — Дочекайся деплою
- Vercel покаже прогрес білду в реальному часі
- Якщо виникне помилка — скопіюй лог і розберись у причині (або звернись за допомогою)

## Крок 11 — Перевір ендпоінти на проді
```
https://test-app-kyslii.vercel.app/health
https://test-app-kyslii.vercel.app/products
```

## Крок 12 — Надішли посилання
Скинь готове посилання `https://<назва-проєкту>.vercel.app` (за умовою завдання).

## Крок 13 - Додатково (необов'язково) — підключи Vercel CLI та плагін для автоматизації
```
npx plugins add vercel/vercel-plugin
```

## Крок 14 — Доопрацювання головної сторінки (`GET /`)
Умова завдання вимагає тільки `/health` і `/products`, але для зручності перевірки додали на `/` невелику візуальну сторінку: кольоровий квадрат з написом, привітальний `alert` та дві кнопки, що відкривають `/health` і `/products` у нових вкладках. Нижче — розбір, за що відповідає кожна частина.

### CSS-клас `.box` (сам квадрат)
```css
.box {
    width: 260px;             /* ширина квадрата */
    height: 160px;            /* висота — робимо однаковою з width, якщо потрібен саме квадрат */
    background-color: #4CAF50; /* колір фону */
    color: #ffffff;            /* колір тексту всередині, контрастний до фону */
    display: flex;             /* вмикає flex-розкладку для дочірніх елементів */
    flex-direction: column;    /* дочірні елементи (текст, блок кнопок) йдуть один під одним */
    align-items: center;       /* вирівнює дочірні елементи по горизонталі (по центру) */
    justify-content: center;   /* вирівнює дочірні елементи по вертикалі (по центру) */
    gap: 12px;                 /* відстань між дочірніми елементами */
    font-family: sans-serif;   /* шрифт напису */
    text-align: center;        /* центрує сам текст всередині рядка */
    margin: 50px auto;         /* відступ зверху 50px + автоцентрування квадрата по горизонталі на сторінці */
    border-radius: 12px;       /* заокруглені кути квадрата */
}
```

### CSS-клас `.buttons` (рядок кнопок)
```css
.buttons {
    display: flex;       /* теж flex-контейнер, але для кнопок */
    flex-direction: row; /* на відміну від .box — кнопки йдуть у РЯДОК, а не одна під одною */
    gap: 12px;            /* відстань між кнопками */
}
```
Це окремий `<div>` усередині `.box`, тому що `.box` має `flex-direction: column` — якби кнопки лежали прямо в `.box`, вони теж стали б у стовпчик. Обгортка з власним `flex-direction: row` дозволяє мати вертикальний стек (текст → блок кнопок), де сам блок кнопок — горизонтальний.

### CSS `.box button` (стилі самих кнопок)
```css
.box button {
    padding: 8px 16px;        /* внутрішні відступи кнопки (зверху/знизу 8px, з боків 16px) */
    border: none;              /* прибирає стандартну рамку кнопки браузера */
    border-radius: 6px;        /* заокруглені кути кнопки */
    background-color: #ffffff; /* білий фон кнопки — контраст до зеленого .box */
    color: #4CAF50;            /* текст кнопки того ж кольору, що фон .box */
    font-weight: bold;         /* жирний текст для кращої читабельності */
    cursor: pointer;           /* курсор-рука при наведенні — сигналізує, що елемент клікабельний */
}
```

### HTML-структура
```html
<div class="box">
    Перевір ендпоінти на проді
    <div class="buttons">
        <button onclick="window.open('/health', '_blank')">Health</button>
        <button onclick="window.open('/products', '_blank')">Products</button>
    </div>
</div>
```
- Зовнішній `<div class="box">` — сам кольоровий квадрат, всередині якого текст і блок кнопок.
- `<div class="buttons">` — контейнер для двох кнопок, щоб вони стояли в один ряд (див. пояснення вище).
- `onclick="window.open('/health', '_blank')"` — при кліку відкриває `/health` у **новій вкладці** (`_blank` = новий контекст перегляду). Шлях відносний (`/health`, а не повний URL), тому кнопка коректно працює і локально (`localhost:3000`), і на задеплоєному домені Vercel — браузер сам підставляє поточний origin.

### `<script>` (привітальний alert)
```html
<script>
    window.onload = () => {
        alert('Вітаємо на сторінці!');
    };
</script>
```
- `window.onload` — подія, яка спрацьовує, коли сторінка (HTML + ресурси) повністю завантажилась у браузері.
- Всередині — стрілкова функція, яка викликає `alert(...)`, показуючи спливаюче вікно з привітанням. Спрацьовує один раз при кожному відкритті/оновленні сторінки.
