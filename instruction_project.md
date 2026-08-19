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
https://<назва-проєкту>.vercel.app/health
https://<назва-проєкту>.vercel.app/products
```

## Крок 12 — Надішли посилання
Скинь готове посилання `https://<назва-проєкту>.vercel.app` (за умовою завдання).
