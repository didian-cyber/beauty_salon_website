import React from 'react'
import { Button } from '@beauty/ui'
import './ServicesTable.css'

export interface Service {
  id: number
  name: string
  description?: string
  time: string
  priceMaster: number
  priceTopMaster: number
}

export interface ServiceTableProps {
  services: Service[]
  categoryName: string
  onBookNow: (serviceName: string) => void
}

export const ServiceTable: React.FC<ServiceTableProps> = ({ 
  services, 
  categoryName, 
  onBookNow 
}) => {
  return (
    <div className="service-table-container">
      <div className="table-header">
        <h2 className="category-title">{categoryName}</h2>
      </div>
      
      <div className="table-scroll-container">
        <table className="service-table">
          <thead>
            <tr className="table-header-row">
              <th className="service-column">
                <span className="column-title">УСЛУГА</span>
              </th>
              <th className="time-column">
                <span className="column-title">ВРЕМЯ</span>
              </th>
              <th className="price-column">
                <span className="column-title">МАСТЕР</span>
              </th>
              <th className="price-column">
                <span className="column-title">ТОП МАСТЕР</span>
              </th>
              <th className="action-column">
                <span className="column-title">ЗАПИСЬ</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="service-row">
                <td className="service-cell">
                  <div className="service-info">
                    <div className="service-details">
                      <div className="service-name">{service.name}</div>
                      {service.description && (
                        <div className="service-description">
                          {service.description}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="time-cell">
                  <div className="time-badge">{service.time}</div>
                </td>
                <td className="price-cell">
                  <div className="price-value master-price">
                    {service.priceMaster.toLocaleString()}₽
                  </div>
                </td>
                <td className="price-cell">
                  <div className="price-value top-master-price">
                    {service.priceTopMaster.toLocaleString()}₽
                  </div>
                </td>
                <td className="action-cell">
                  <Button
                    onClick={() => onBookNow(service.name)}
                    className="book-now-button"
                  >
                    Записаться
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="table-footer">
        <div className="price-note">
          <span>Первая цена — Мастер, вторая — Топ Мастер</span>
        </div>
      </div>
    </div>
  )
}