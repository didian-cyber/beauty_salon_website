# Архитектура проекта

## Обзор
Система состоит из трех независимых проектов в монорепозитории:

### beauty-client - клиентское SPA для пользователей салона красоты

beauty-client/
├── public/
├── src/
│ ├── components/
│ │ ├── common/
│ │ └── layout/
│ ├── pages/
│ │ ├── Home/ 
│ │ ├── Services/ 
│ │ ├── Masters/ 
│ │ ├── Booking/ 
│ │ └── Contacts/ 
│ ├── App.css
│ ├── App.tsx
│ ├── App.test.tsx
│ ├── index.css
│ └── main.tsx
├── package.json
├── eslint.config.js
├── jest.config.ts
├── vite.config.js
└── tsconfig.json


### beauty-admin - административная панель салона

beauty-admin/
├── src/
│ ├── components/
│ ├── pages/
│ │ ├── Login/
│ │ ├── Dashboard/
│ │ ├── MastersManagement/
│ │ ├── ServicesManagement/
│ │ └── BookingManagement/
│ ├── App.css
│ ├── App.tsx
│ ├── App.test.tsx
│ └── main.tsx
├── package.json
├── eslint.config.js
├── jest.config.ts
├── vite.config.js
└── tsconfig.json

### beauty-ui - библиотека UI-компонентов

beauty-ui/
├── src/
│ ├── MasterPhotoCard/
│ ├── ServiceCard/ 
│ ├── Button/ 
│ ├── Modal/ 
│ ├── CategoryTabs/ 
│ └── index.ts
├── package.json
├── eslint.config.js
├── jest.config.ts
├── vite.config.js
└── tsconfig.json

## Технологический стек

### Runtime зависимости
- **react** ^19.2.0
- **react-dom** ^19.2.0
- **react-router-dom** ^6.0.0
- **@beauty/ui** - Локальная библиотека UI-компонентов

### Dev зависимости
- **typescript** ~5.9.3
- **vite** ^7.1.11
- **eslint** ^9.36.0

## Компоненты

### MasterPhotoCard
- **Назначение**: Карточка мастера с фото-слайдером работ
- **Пропсы**:
  - `masterPhoto: string` - фото мастера
  - `workPhotos: string[]` - массив фото работ
  - `onClick?: () => void` - обработчик клика
- **Особенности**: Слайдер с навигацией, hover-эффекты

### ServiceCard
- **Назначение**: Карточка услуги с изображением и описанием
- **Пропсы**:
  - `backgroundImage: string` - фоновое изображение
  - `title: string` - название услуги
  - `description: string` - описание
  - `isSelected: boolean` - состояние выбора
  - `onClick: () => void` - обработчик клика
- **Особенности**: Анимации при hover, состояние выбора

### BookingForm

- **Назначение**: Форма онлайн-записи
- **Пропсы**:

  - `service: Service` - выбранная услуга
  - `master: Master` - выбранный мастер
  - `onSubmit: (bookingData) => void` - отправка формы
- **Поля**: Имя, телефон, дата, время, комментарий

### Modal

- **Назначение**: Модальное окно для форм и уведомлений
- **Пропсы**:

  - `isOpen: boolean` - состояние открытия
  - `onClose: () => void` - закрытие модалки
  - `children: ReactNode` - содержимое

### Header

- **Назначение**: Навигация по сайту
- **Элементы**: Логотип, меню (Главная, Услуги, Мастера, Запись)

## Структура роутинга

### Клиентское приложение
/
├── /services (Услуги)
├── /masters (Мастера)
└── /booking (Запись)


### Административная панель

/admin
├── /login (Вход)
├── /services (Управление услугами)
├── /masters (Управление мастерами)
└── /bookings (Управление записями)


## Хранение данных
Данные хранятся в локальных JSON-файлах. Состояние управляется через React hooks (useState, useContext). Административная панель поддерживает CRUD-операции с сохранением в локальном состоянии.