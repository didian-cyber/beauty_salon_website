import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@beauty/ui'
import { ServiceTable } from '../../components/ServicesTable/ServicesTable'
import { 
  getServicesByCategory, 
  getCategoryName,
  serviceCategories 
} from './ServicesData'
import './ServicesDetail.css'

export function ServiceDetail(): React.JSX.Element {
  const { category } = useParams<{ category: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    getServicesByCategory(category || '')
  }, [category])

  const services = getServicesByCategory(category || '')
  const categoryName = getCategoryName(category || '')

  if (!category || services.length === 0) {
    return (
      <div className="service-detail-container">
        <h2>Услуга не найдена</h2>
        <Button
          onClick={() => navigate('/services')}
          className="back-button"
        >
          ← Вернуться к услугам
        </Button>
      </div>
    )
  }

  const handleBookNow = (serviceName: string) => {
    navigate('/booking', { state: { service: serviceName } })
  }

  const handleBackToServices = () => {
    navigate('/services')
  }

  return (
    <div className="service-detail-container">
      <div className="service-header">
        <Button 
          onClick={handleBackToServices}
          className="back-button"
        >
          ← Назад к услугам
        </Button>
        
        <div className="category-navigation">
          {serviceCategories.map((cat) => (
            <Button
              key={cat.id}
              active={cat.id === category}
              onClick={() => navigate(`/services/${cat.id}`)}
              className="master-category-btn" 
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      <ServiceTable 
        services={services}
        categoryName={categoryName}
        onBookNow={handleBookNow}
      />

      <div className="service-info">
        <div className="info-card">
          <h3>⭐ В чем разница?</h3>
          <p><strong>Мастер</strong> - специалист с опытом от 1 года</p>
          <p><strong>Топ-мастер</strong> - ведущий специалист с опытом от 3 лет</p>
        </div>
      </div>
    </div>
  )
}