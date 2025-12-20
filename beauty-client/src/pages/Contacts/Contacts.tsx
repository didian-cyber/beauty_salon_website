import React from 'react'

export function Contacts(): React.JSX.Element {
  return (
    <section className="section">
      <h2 className="section-title">Контакты</h2>
      <div style={{ textAlign: 'center', color: '#2c2c2c' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
          Свяжитесь с нами для записи на услуги
        </p>
        <div style={{ marginTop: '2rem', lineHeight: '2' }}>
          <p><strong>Адрес:</strong> г. Казань, ул. Пушкина, д. Колотушкина</p>
          <p><strong>Телефон:</strong> +7 (111) 222-33-44</p>
          <p><strong>Email:</strong> beauty&tochka@gmail.com</p>
          <p><strong>Время работы:</strong> Пн-Вс: 9:00 - 22:00</p>
        </div>
      </div>
    </section>
  )
}