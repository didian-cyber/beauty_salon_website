import React, { useState } from 'react'

import { ServiceCard } from '@beauty/ui'

import './Services.css'

export function Services(): React.JSX.Element {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const services = [
    {
      id: 'manicure',
      title: 'Маникюр',
      description: 'Создаем ногти, которые подчеркнут вашу индивидуальность',
      image: '/manicure.png'
    },
    {
      id: 'pedicure',
      title: 'Педикюр',
      description: 'Мы уделяем особое внимание стерильности и безопасности процедур',
      image: '/pedicure.png'
    },
    {
      id: 'haircut',
      title: 'Стрижка и окрашивание',
      description: 'Современные стрижки и окрашивание волос',
      image: '/hair.png'
    },
    {
      id: 'lashes',
      title: 'Ресницы',
      description: 'Наращивание и ламинирование ресниц',
      image: '/lashes.png'
    },
    {
      id: 'brows',
      title: 'Брови',
      description: 'Коррекция и окрашивание бровей',
      image: '/brows.png'
    },
    {
      id: 'depilation',
      title: 'Депиляция',
      description: 'Удаление нежелательных волос эффективными безопасными методами',
      image: '/depilation.png'
    }
  ]

  return (
    <section className="section">
      <h2 className="section-title">Услуги</h2>
      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            backgroundImage={service.image}
            title={service.title}
            description={service.description}
            onClick={() => setSelectedService(service.title)}
            isSelected={selectedService === service.title}
          />
        ))}
      </div>
    </section>
  )
}