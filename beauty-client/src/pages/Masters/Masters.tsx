import React, { useState } from 'react'
import { MasterPhotoCard, Button } from '@beauty/ui' 
import './Masters.css'

type MasterCategoryKey = 'nails' | 'brows' | 'hair' | 'depilation'

interface Master {
  id: string
  name: string
  photo: string
  works: string[]
  position: string
  experience: string
}

export function Masters(): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<MasterCategoryKey>('nails')

  const masterCategories = [
    { id: 'nails', name: 'Мастера маникюра и педикюра' },
    { id: 'brows', name: 'Бровисты и лашмейкеры' },
    { id: 'hair', name: 'Парикмахеры' },
    { id: 'depilation', name: 'Мастера депиляции' }
  ]

  const masters: Record<MasterCategoryKey, Master[]> = {
    nails: [
      {
        id: 'maria',
        name: 'Мария',
        photo: '/nails_master.png',
        works: [
          '/masterNails/m1.1.png',
          '/masterNails/m1.2.png',
          '/masterNails/m1.3.png',
          '/masterNails/m1.4.png'
        ],
        position: 'Мастер ногтевого сервиса',
        experience: 'Опыт работы: с 2022 года'
      },
      {
        id: 'sofia',
        name: 'София',
        photo: '/nails_top_master.png',
        works: [
          '/masterNails/m2.1.png',
          '/masterNails/m2.2.png',
          '/masterNails/m2.3.png',
          '/masterNails/m2.4.png'
        ],
        position: 'Топ мастер ногтевого сервиса',
        experience: 'Опыт работы: с 2019 года'
      }
    ],
    brows: [
      {
        id: 'olga',
        name: 'Ольга',
        photo: '/browMaster.png',
        works: [
          '/masterBrows/b1.1.png',
          '/masterBrows/b1.2.png',
          '/masterBrows/b1.3.png'
        ],
        position: 'Мастер бровист и мастер по ламинированию ресниц',
        experience: 'Опыт работы: с 2021 года'
      },
      {
        id: 'victoria',
        name: 'Виктория',
        photo: '/browTopMaster.png',
        works: [
          '/masterBrows/b2.1.png',
          '/masterBrows/b2.2.png',
          '/masterBrows/b2.3.png'
        ],
        position: 'Эксперт по ламинированию и наращиванию ресниц',
        experience: 'Опыт работы: с 2018 года'
      }
    ],
    hair: [
      {
        id: 'anna',
        name: 'Анна',
        photo: '/hairMaster.png',
        works: [
          '/masterHair/m1.1.png',
          '/masterHair/m1.2.png'
        ],
        position: 'Стилист по волосам',
        experience: 'Опыт работы: с 2020 года'
      },
      {
        id: 'elena',
        name: 'Елена',
        photo: '/haitTopMaster.png',
        works: [
          '/masterHair/m2.1.png',
          '/masterHair/m2.2.png',
          '/masterHair/m2.3.png'
        ],
        position: 'Топ-стилист',
        experience: 'Опыт работы: с 2017 года'
      }
    ],
    depilation: [
      {
        id: 'irina',
        name: 'Ирина',
        photo: '/depilationMaster.png',
        works: [],
        position: 'Мастер депиляции',
        experience: 'Опыт работы: с 2021 года'
      },
      {
        id: 'natalia',
        name: 'Наталья',
        photo: '/depilationTopMaster.png',
        works: [],
        position: 'Специалист по лазерной эпиляции',
        experience: 'Опыт работы: с 2020 года'
      }
    ]
  }

  const currentMasters = masters[selectedCategory]

  return (
    <section className="section">
      <h2 className="section-title">Наши мастера</h2>
      
      <div className="master-categories">
        {masterCategories.map((category) => (
          <Button
            key={category.id}
            active={selectedCategory === category.id} 
            onClick={() => setSelectedCategory(category.id as MasterCategoryKey)}
            className="master-category-btn" 
          >
            {category.name}
          </Button>
        ))}
      </div>

      <h3 className="master-category-title">
        {masterCategories.find(cat => cat.id === selectedCategory)?.name}:
      </h3>

      <div className="masters-grid">
        {currentMasters.map((master) => (
          <div key={master.id} className="master-card">
            <MasterPhotoCard
              masterPhoto={master.photo}
              workPhotos={master.works}
              masterName={master.name}
            />
            <div className="master-info">
              <h4 className="master-name">{master.name}</h4>
              <p className="master-position">{master.position}</p>
              <p className="master-experience">{master.experience}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}