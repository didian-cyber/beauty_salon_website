import React, { useState, useEffect } from 'react'
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
  category: string[]
}

const initialMasters: Master[] = [
  {
    id: 'maria',
    name: 'Мария',
    photo: '/nails_master.png',
    works: ['/masterNails/m1.1.png', '/masterNails/m1.2.png', '/masterNails/m1.3.png', '/masterNails/m1.4.png'],
    position: 'Мастер ногтевого сервиса',
    experience: 'Опыт работы: с 2022 года',
    category: ['manicure', 'pedicure']
  },
  {
    id: 'sofia',
    name: 'София',
    photo: '/nails_top_master.png',
    works: ['/masterNails/m2.1.png', '/masterNails/m2.2.png', '/masterNails/m2.3.png', '/masterNails/m2.4.png'],
    position: 'Топ мастер ногтевого сервиса',
    experience: 'Опыт работы: с 2019 года',
    category: ['manicure', 'pedicure']
  },
  {
    id: 'olga',
    name: 'Ольга',
    photo: '/browMaster.png',
    works: ['/masterBrows/b1.1.png', '/masterBrows/b1.2.png', '/masterBrows/b1.3.png'],
    position: 'Мастер бровист и мастер по ламинированию ресниц',
    experience: 'Опыт работы: с 2021 года',
    category: ['brows', 'lashes']
  },
  {
    id: 'victoria',
    name: 'Виктория',
    photo: '/browTopMaster.png',
    works: ['/masterBrows/b2.1.png', '/masterBrows/b2.2.png', '/masterBrows/b2.3.png'],
    position: 'Эксперт по ламинированию и наращиванию ресниц',
    experience: 'Опыт работы: с 2018 года',
    category: ['brows', 'lashes']
  },
  {
    id: 'anna',
    name: 'Анна',
    photo: '/hairMaster.png',
    works: ['/masterHair/m1.1.png', '/masterHair/m1.2.png'],
    position: 'Стилист по волосам',
    experience: 'Опыт работы: с 2020 года',
    category: ['haircut']
  },
  {
    id: 'elena',
    name: 'Елена',
    photo: '/haitTopMaster.png',
    works: ['/masterHair/m2.1.png', '/masterHair/m2.2.png', '/masterHair/m2.3.png'],
    position: 'Топ-стилист',
    experience: 'Опыт работы: с 2017 года',
    category: ['haircut']
  },
  {
    id: 'irina',
    name: 'Ирина',
    photo: '/depilationMaster.png',
    works: [],
    position: 'Мастер депиляции',
    experience: 'Опыт работы: с 2021 года',
    category: ['depilation']
  },
  {
    id: 'natalia',
    name: 'Наталья',
    photo: '/depilationTopMaster.png',
    works: [],
    position: 'Специалист по лазерной эпиляции',
    experience: 'Опыт работы: с 2020 года',
    category: ['depilation']
  }
]

const loadMasters = (): Master[] => {
  try {
    const stored = localStorage.getItem('beautyMasters')

    if (stored) {
      const storedMasters: Master[] = JSON.parse(stored)

      if (storedMasters.length > 0) {
        const storedIds = new Set(storedMasters.map((m) => m.id))
        const missingInitials = initialMasters.filter(m => !storedIds.has(m.id))

        if (missingInitials.length > 0) {
          const completeMasters = [...storedMasters, ...missingInitials]

          localStorage.setItem('beautyMasters', JSON.stringify(completeMasters))

          return completeMasters
        }

        return storedMasters
      }
    }
  } catch {
    // Ignore
  }

  if (initialMasters.length > 0) {
    localStorage.setItem('beautyMasters', JSON.stringify(initialMasters))

    return initialMasters
  }

  return []
}

const groupMastersByCategory = (masters: Master[]): Record<MasterCategoryKey, Master[]> => {
  const grouped: Record<MasterCategoryKey, Master[]> = {
    nails: [],
    brows: [],
    hair: [],
    depilation: []
  }

  masters.forEach(master => {
    if (master.category.includes('manicure') || master.category.includes('pedicure')) {
      grouped.nails.push(master)
    }

    if (master.category.includes('brows') || master.category.includes('lashes')) {
      grouped.brows.push(master)
    }

    if (master.category.includes('haircut')) {
      grouped.hair.push(master)
    }

    if (master.category.includes('depilation')) {
      grouped.depilation.push(master)
    }
  })

  return grouped
}

export function Masters(): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<MasterCategoryKey>('nails')
  const [groupedMasters, setGroupedMasters] = useState<Record<MasterCategoryKey, Master[]>>({
    nails: [],
    brows: [],
    hair: [],
    depilation: []
  })

  useEffect(() => {
    const loadedMasters = loadMasters()

    setGroupedMasters(groupMastersByCategory(loadedMasters))
  }, [])

  const masterCategories = [
    { id: 'nails' as MasterCategoryKey, name: 'Мастера маникюра и педикюра' },
    { id: 'brows' as MasterCategoryKey, name: 'Бровисты и лашмейкеры' },
    { id: 'hair' as MasterCategoryKey, name: 'Парикмахеры' },
    { id: 'depilation' as MasterCategoryKey, name: 'Мастера депиляции' }
  ]

  const currentMasters = groupedMasters[selectedCategory] || []

  return (
    <section className="section">
      <h2 className="section-title">Наши мастера</h2>
      
      <div className="master-categories">
        {masterCategories.map((category) => (
          <Button
            key={category.id}
            active={selectedCategory === category.id} 
            onClick={() => setSelectedCategory(category.id)}
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
        {currentMasters.length === 0 ? (
          <p>Мастера в этой категории отсутствуют</p>
        ) : (
          currentMasters.map((master) => (
            <div key={master.id} className="master-card">
              <MasterPhotoCard
                masterPhoto={master.photo}
                workPhotos={master.works || []}
                masterName={master.name}
              />
              <div className="master-info">
                <h4 className="master-name">{master.name}</h4>
                <p className="master-position">{master.position}</p>
                <p className="master-experience">{master.experience}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}