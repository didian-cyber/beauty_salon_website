# Beauty&Tochka - Сайт салона красоты

Веб-приложение для салона красоты "Beauty&Tochka", состоящее из клиентской части и административной панели.

## Описание проекта

Проект состоит из трех основных частей:

1. **beauty-client** - клиентское приложение для посетителей салона
2. **beauty-admin** - административная панель для управления услугами, мастерами и записями
3. **beauty-ui** - общая библиотека UI компонентов

### Функциональность

#### Клиентское приложение:
- Просмотр услуг салона
- Просмотр мастеров с фотографиями и работами
- Онлайн-запись на услуги
- Адаптивный дизайн

#### Административная панель:
- Управление услугами (добавление, редактирование, удаление)
- Управление мастерами (добавление, редактирование, удаление, загрузка фото)
- Управление записями клиентов (просмотр, изменение статуса, удаление)
- Статистика салона

## Технологии

- **React** 19.2.0
- **TypeScript** 5.9.3
- **Vite** 7.1.7
- **React Router** 6.0.0
- **Jest** 30.2.0
- **ESLint** 9.36.0

## Требования

- Node.js 19+
- npm или yarn

## Установка и запуск

### Установка зависимостей

```bash
npm install

cd beauty-client && npm install
cd ../beauty-admin && npm install
cd ../beauty-ui && npm install
```

### Запуск в режиме разработки

```bash
cd beauty-client
npm run dev

cd beauty-admin
npm run dev
```

### Сборка проекта

```bash
cd beauty-client
npm run build

cd beauty-admin
npm run build
```

### Тестирование

```bash
npm run test

npm run test:coverage
```

### Линтинг

```bash
npm run lint

npm run lint:fix
```

## Структура проекта

```
beauty_salon_website/
├── beauty-client/          # Клиентское приложение
│   ├── src/
│   │   ├── pages/          # Страницы приложения
│   │   ├── components/     # Компоненты
│   │   └── ...
│   └── package.json
├── beauty-admin/           # Административная панель
│   ├── src/
│   │   ├── pages/          # Страницы админки
│   │   ├── components/     # Компоненты
│   │   └── ...
│   └── package.json
└── beauty-ui/              # UI библиотека
    ├── src/
    │   ├── Button/
    │   ├── Modal/
    │   └── ...
    └── package.json
```

## Использование

### Клиентское приложение

1. Откройте http://localhost:3000
2. Просмотрите услуги и мастеров
3. Запишитесь на услугу через форму записи

### Административная панель

1. Откройте http://localhost:3001
2. Войдите в систему (логин: admin, пароль: 1234)
3. Управляйте услугами, мастерами и записями

## Хранение данных

Все данные хранятся в localStorage браузера:
- `beautyServices` - услуги
- `beautyMasters` - мастера
- `beautyBookings` - записи клиентов

## Скриншоты

### Главная страница клиентского приложения
![Главная страница](screens/home/image1.png)
![Главная страница](screens/home/image2.png)
![Главная страница](screens/home/image3.png)

### Страница услуг
![Услуги](screens/services/image1.png)
![Услуги](screens/services/image2.png)
![Услуги](screens/services/image3.png)
![Услуги](screens/services/image4.png)

### Страница мастеров
![Мастера](screens/masters/image1.png)
![Мастера](screens/masters/image2.png)
![Мастера](screens/masters/image3.png)

### Форма записи
![Запись](screens/booking/image1.png)
![Запись](screens/booking/image2.png)
![Запись](screens/booking/image3.png)
![Запись](screens/booking/image4.png)
![Запись](screens/booking/image5.png)

### Административная панель - Вход
![Админка - Вход](screens/admin-dashboard/image.png)

### Административная панель - Статистика
![Админка - Статистика](screens/admin-dashboard/image1.png)

### Административная панель - Управление услугами
![Админка - Услуги](screens/admin-services/image1.png)
![Админка - Услуги](screens/admin-services/image2.png)
![Админка - Услуги](screens/admin-services/image3.png)

### Административная панель - Управление мастерами
![Админка - Мастера](screens/admin-masters/image1.png)
![Админка - Мастера](screens/admin-masters/image2.png)
![Админка - Мастера](screens/admin-masters/image3.png)

### Административная панель - Управление записями
![Админка - Записи](screens/admin-booking/image.png)

## Разработка

Проект использует:
- ES6 модули
- TypeScript для типизации
- ESLint для проверки кода
- Jest для тестирования
- Vite для сборки

## Лицензия

Проект создан в учебных целях.
