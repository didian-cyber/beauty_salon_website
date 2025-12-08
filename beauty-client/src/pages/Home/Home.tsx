import React, { useState } from 'react'
import { Button } from '@beauty/ui'

export function Home(): React.JSX.Element {
  const [clickCount, setClickCount] = useState(0)
  const [activeButton, setActiveButton] = useState<boolean>(false)

  const handleButtonClick = () => {
    setActiveButton(true)
    setClickCount(clickCount + 1)
  }

  return (
    <section className="section">
      <h2 className="section-title">Добро пожаловать в Beauty&tochka</h2>
      <p style={{ 
        textAlign: 'center', 
        marginBottom: '2rem', 
        color: '#2c2c2c',
        fontSize: '1.2rem',
        lineHeight: '1.8'
      }}>
        Салон красоты премиум-класса. Мы предлагаем широкий спектр услуг для вашей красоты и ухода за собой.
      </p>
      
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h3 style={{ 
          marginBottom: '1.5rem', 
          color: '#2c2c2c',
          fontSize: '1.5rem',
          fontWeight: 600
        }}>
          Демонстрация компонента Button:
        </h3>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button 
            onClick={handleButtonClick}
            active={activeButton}
          >
            Кнопка
          </Button>
        </div>
        {clickCount > 0 && (
          <p style={{ 
            marginTop: '1.5rem', 
            color: '#2c2c2c',
            fontSize: '1.1rem',
            fontWeight: 500
          }}>
            Кнопка нажата {clickCount} раз(а)
          </p>
        )}
      </div>
    </section>
  )
}