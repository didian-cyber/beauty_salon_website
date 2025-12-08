import React, { useState } from 'react'
import { Button, Modal } from '@beauty/ui'

export function Booking(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeButton, setActiveButton] = useState<string | null>(null)

  return (
    <section className="section">
      <h2 className="section-title">Онлайн-запись</h2>
      <p style={{ 
        textAlign: 'center', 
        marginBottom: '2rem', 
        color: '#2c2c2c',
        fontSize: '1.1rem',
        lineHeight: '1.6'
      }}>
        Запишитесь на удобное для вас время онлайн. Выберите услугу, мастера и время приема.
      </p>

      <div style={{ 
        textAlign: 'center', 
        marginTop: '2rem'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center', 
          flexWrap: 'wrap' 
        }}>
          <Button 
            onClick={() => {
              setActiveButton('form')
              setIsModalOpen(true)
            }}
            active={activeButton === 'form'}
          >
            Открыть форму записи
          </Button>
          
          <Button 
            onClick={() => setActiveButton('slots')}
            active={activeButton === 'slots'}
          >
            Посмотреть свободные окна
          </Button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setActiveButton(null)
          }}
          title="Форма записи на услугу"
          size="medium"
        >
          <div>
            <p>Это демонстрация модального окна для формы записи.</p>
            <p>Здесь будет форма с полями:</p>
            <ul>
              <li>Имя</li>
              <li>Телефон</li>
              <li>Услуга</li>
              <li>Мастер</li>
              <li>Дата и время</li>
            </ul>
            
            <div style={{ 
              display: 'flex', 
              gap: '0.75rem', 
              justifyContent: 'flex-end', 
              marginTop: '1.5rem' 
            }}>
              <Button onClick={() => {
                setIsModalOpen(false)
                setActiveButton(null)
              }}>
                Отмена
              </Button>
              
              <Button onClick={() => {
                alert('Форма отправлена!')
                setIsModalOpen(false)
                setActiveButton(null)
              }}>
                Отправить заявку
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  )
}