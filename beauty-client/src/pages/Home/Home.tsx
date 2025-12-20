import React, { useState } from 'react'
import { Button } from '@beauty/ui'
import { useNavigate } from 'react-router-dom'
import './Home.css'

export function Home(): React.JSX.Element {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const reviews = [
    {
      id: 1,
      text: "Эта студия радикально отличается от девичьих салонов в Казани. Очень стильное место, с крутым сервисом и комфортной ненавязчивой атмосферой. Когда я зашла, первое, что у меня спросили — «хотите вина?». Крутая опция для вечера выходного дня! Всё очень понравилось. Одним словом — стиль! Таких крутых девичьих студий в Казани я больше не встречала.",
      author: "Анна, 28 лет"
    },
    {
      id: 2,
      text: "Лучший салон красоты в городе! Мастера — настоящие профессионалы. Всегда ухожу довольной и красивой. Особенно нравятся процедуры по уходу за лицом.",
      author: "Елена, 32 года"
    },
    {
      id: 3,
      text: "Атмосфера просто волшебная! Чувствуешь себя особенной с первой минуты. Очень внимательный персонал и качественные услуги. Рекомендую всем подругам!",
      author: "Мария, 25 лет"
    }
  ]

  const handleButtonClick = (path: string) => {
    navigate(path)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="home-section">
      <div className="welcome-container">
        <h2 className="section-title">Добро пожаловать в Beauty&tochka</h2>
        <p className="welcome-text">
          Салон красоты премиум-класса. Мы предлагаем широкий спектр услуг для вашей красоты и ухода за собой.
        </p>
        
        <div className="action-buttons">
          <Button 
            onClick={() => handleButtonClick('/services')}
            className="action-button services-button"
          >
            Выбрать услугу
          </Button>
          
          <Button 
            onClick={() => handleButtonClick('/masters')}
            className="action-button masters-button"
          >
            Выбрать мастера
          </Button>
          
          <Button 
            onClick={() => handleButtonClick('/booking')}
            className="action-button booking-button"
          >
            Записаться
          </Button>
        </div>
      </div>

      <div className="reviews-section">
        <h2 className="reviews-title">Вам понравится</h2>
        <p className="reviews-subtitle">Что говорят о студии наши любимые гости</p>
        
        <div className="slider-container">
          <button 
            className="slider-arrow prev-arrow" 
            onClick={prevSlide}
            aria-label="Предыдущий отзыв"
          >
            ‹
          </button>
          
          <div className="slider-track">
            {reviews.map((review, index) => (
              <div 
                key={review.id}
                className={`review-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                <div className="review-content">
                  <div className="quote-icon">&quot;</div>
                  <p className="review-text">{review.text}</p>
                  <p className="review-author">{review.author}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="slider-arrow next-arrow" 
            onClick={nextSlide}
            aria-label="Следующий отзыв"
          >
            ›
          </button>
        </div>
        
        <div className="slider-dots">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Перейти к отзыву ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}