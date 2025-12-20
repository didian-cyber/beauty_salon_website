import React, { useEffect, useState } from 'react'
import './ServicesManagement.css'

interface Service {
  id: number
  category: string
  name: string
  description?: string
  time: string
  priceMaster: number
  priceTopMaster: number
  icon?: string
}

const categories = [
  { value: 'manicure', label: 'Маникюр' },
  { value: 'pedicure', label: 'Педикюр' },
  { value: 'haircut', label: 'Стрижка и окрашивание' },
  { value: 'lashes', label: 'Ресницы' },
  { value: 'brows', label: 'Брови' },
  { value: 'depilation', label: 'Депиляция' }
]

const initialServices: Service[] = [
  {
    id: 1,
    category: 'manicure',
    name: 'Маникюр и покрытие гель лак «Все включено»',
    description: 'Комплексный уход за ногтями с покрытием гель-лаком',
    time: '2ч 30мин',
    priceMaster: 2300,
    priceTopMaster: 2800,
  },
  {
    id: 2,
    category: 'manicure',
    name: 'Маникюр без покрытия',
    description: 'Гигиенический маникюр без декоративного покрытия',
    time: '1ч',
    priceMaster: 1800,
    priceTopMaster: 2200,
  },
  {
    id: 3,
    category: 'manicure',
    name: 'Японский маникюр P.Shine',
    description: 'Технология японского маникюра для здоровых ногтей',
    time: '2ч',
    priceMaster: 2100,
    priceTopMaster: 2600,
  },
  {
    id: 4,
    category: 'manicure',
    name: 'Наращивание ногтей',
    description: 'Наращивание ногтей гелем или акрилом',
    time: '3ч',
    priceMaster: 3300,
    priceTopMaster: 3800,
  },
  {
    id: 5,
    category: 'pedicure',
    name: 'Полный педикюр с покрытием гель лак',
    description: 'Полный комплекс ухода за стопами с покрытием',
    time: '2ч',
    priceMaster: 2800,
    priceTopMaster: 3300,
  },
  {
    id: 6,
    category: 'pedicure',
    name: 'Педикюр «Пальчики» с покрытием гель лак',
    description: 'Уход только за пальцами ног с покрытием',
    time: '1ч',
    priceMaster: 1800,
    priceTopMaster: 2200,
  },
  {
    id: 7,
    category: 'pedicure',
    name: 'Педикюр без покрытия ногтей',
    description: 'Гигиенический педикюр без декоративного покрытия',
    time: '1ч 30мин',
    priceMaster: 2000,
    priceTopMaster: 2500,
  },
  {
    id: 8,
    category: 'pedicure',
    name: 'Японский педикюр',
    description: 'Японская технология ухода за стопами',
    time: '2ч',
    priceMaster: 2500,
    priceTopMaster: 3000,
  },
  {
    id: 9,
    category: 'pedicure',
    name: 'Пленочный педикюр',
    description: 'Педикюр с использованием специальных пленок',
    time: '1ч 30мин',
    priceMaster: 2200,
    priceTopMaster: 2700,
  },
  {
    id: 10,
    category: 'haircut',
    name: 'Стрижка женская',
    description: 'Женская стрижка любой сложности',
    time: '1ч',
    priceMaster: 1500,
    priceTopMaster: 2000,
  },
  {
    id: 11,
    category: 'haircut',
    name: 'Стрижка мужская',
    description: 'Мужская стрижка и оформление',
    time: '45мин',
    priceMaster: 1200,
    priceTopMaster: 1600,
  },
  {
    id: 12,
    category: 'haircut',
    name: 'Стрижка детская',
    description: 'Детская стрижка для мальчиков и девочек',
    time: '45мин',
    priceMaster: 800,
    priceTopMaster: 1200,
  },
  {
    id: 13,
    category: 'haircut',
    name: 'Повседневная укладка на браш',
    description: 'Повседневная укладка с использованием браша',
    time: '45мин',
    priceMaster: 800,
    priceTopMaster: 1200,
  },
  {
    id: 14,
    category: 'haircut',
    name: 'Вечерняя укладка локоны/волны',
    description: 'Вечерняя укладка с созданием локонов или волн',
    time: '1ч',
    priceMaster: 1200,
    priceTopMaster: 1700,
  },
  {
    id: 15,
    category: 'haircut',
    name: 'Окрашивание коротких волос',
    description: 'Окрашивание волос до плеч',
    time: '2ч',
    priceMaster: 2200,
    priceTopMaster: 2700,
  },
  {
    id: 16,
    category: 'haircut',
    name: 'Окрашивание средних волос',
    description: 'Окрашивание волос до лопаток',
    time: '2ч 30мин',
    priceMaster: 2800,
    priceTopMaster: 3300,
  },
  {
    id: 17,
    category: 'haircut',
    name: 'Тотал блонд короткие волосы',
    description: 'Полное осветление коротких волос',
    time: '3ч 30мин',
    priceMaster: 4500,
    priceTopMaster: 5200,
  },
  {
    id: 18,
    category: 'haircut',
    name: 'Тотал блонд длинные волосы',
    description: 'Полное осветление длинных волос',
    time: '4ч 30мин',
    priceMaster: 6800,
    priceTopMaster: 7500,
  },
  {
    id: 19,
    category: 'haircut',
    name: 'Обесцвечивание коротких волос',
    description: 'Обесцвечивание волос до плеч',
    time: '3ч',
    priceMaster: 3800,
    priceTopMaster: 4500,
  },
  {
    id: 20,
    category: 'haircut',
    name: 'Обесцвечивание длинных волос',
    description: 'Обесцвечивание волос до лопаток',
    time: '4ч',
    priceMaster: 5800,
    priceTopMaster: 6500,
  },
  {
    id: 21,
    category: 'lashes',
    name: 'Ламинирование ресниц',
    description: 'Ламинирование для придания объема и изгиба',
    time: '1ч',
    priceMaster: 1800,
    priceTopMaster: 2300,
  },
  {
    id: 22,
    category: 'lashes',
    name: 'Наращивание Classic',
    description: 'Классическое наращивание 1:1',
    time: '2ч',
    priceMaster: 2500,
    priceTopMaster: 3000,
  },
  {
    id: 23,
    category: 'lashes',
    name: 'Наращивание объем 1,5D',
    description: 'Объемное наращивание 1.5D',
    time: '2ч 30мин',
    priceMaster: 2800,
    priceTopMaster: 3300,
  },
  {
    id: 24,
    category: 'lashes',
    name: 'Наращивание объем 2D',
    description: 'Объемное наращивание 2D',
    time: '3ч',
    priceMaster: 3200,
    priceTopMaster: 3700,
  },
  {
    id: 25,
    category: 'lashes',
    name: 'Наращивание объем 3D',
    description: 'Объемное наращивание 3D',
    time: '3ч 30мин',
    priceMaster: 3800,
    priceTopMaster: 4300,
  },
  {
    id: 26,
    category: 'lashes',
    name: 'Наращивание объем 4D',
    description: 'Объемное наращивание 4D',
    time: '4ч',
    priceMaster: 4200,
    priceTopMaster: 4700,
  },
  {
    id: 27,
    category: 'lashes',
    name: 'Наращивание «Уголки»',
    description: 'Наращивание только внешних уголков',
    time: '1ч 30мин',
    priceMaster: 1800,
    priceTopMaster: 2300,
  },
  {
    id: 28,
    category: 'lashes',
    name: 'Снятие ресниц без последующего наращивания',
    description: 'Аккуратное снятие нарощенных ресниц',
    time: '30мин',
    priceMaster: 500,
    priceTopMaster: 700,
  },
  {
    id: 29,
    category: 'brows',
    name: 'Коррекция бровей',
    description: 'Коррекция формы бровей',
    time: '30мин',
    priceMaster: 600,
    priceTopMaster: 800,
  },
  {
    id: 30,
    category: 'brows',
    name: 'Окрашивание краской',
    description: 'Окрашивание бровей краской',
    time: '30мин',
    priceMaster: 700,
    priceTopMaster: 900,
  },
  {
    id: 31,
    category: 'brows',
    name: 'Долговременная укладка',
    description: 'Долговременная укладка бровей',
    time: '1ч',
    priceMaster: 1500,
    priceTopMaster: 1800,
  },
  {
    id: 32,
    category: 'depilation',
    name: 'Комплекс 1 (подмышки, бикини, голень)',
    description: 'Комплексная депиляция зон',
    time: '1ч 30мин',
    priceMaster: 3200,
    priceTopMaster: 3700,
  },
  {
    id: 33,
    category: 'depilation',
    name: 'Комплекс 2 (подмышки, бикини, ноги полностью)',
    description: 'Полная депиляция ног',
    time: '2ч',
    priceMaster: 4200,
    priceTopMaster: 4700,
  },
  {
    id: 34,
    category: 'depilation',
    name: 'Комплекс 3 (подмышки, бикини, ноги, руки)',
    description: 'Полная депиляция тела',
    time: '2ч 30мин',
    priceMaster: 5200,
    priceTopMaster: 5700,
  },
  {
    id: 35,
    category: 'depilation',
    name: 'Комплекс 4 (лицо полностью)',
    description: 'Депиляция лица',
    time: '1ч',
    priceMaster: 1800,
    priceTopMaster: 2300,
  }
]

export function ServicesManagement(): React.JSX.Element {
  const [services, setServices] = useState<Service[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    category: 'manicure',
    description: '',
    time: '',
    priceMaster: 0,
    priceTopMaster: 0,
    icon: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = (): void => {
    try {
      const stored = localStorage.getItem('beautyServices')

      if (stored) {
        setServices(JSON.parse(stored))
      } else {
        localStorage.setItem('beautyServices', JSON.stringify(initialServices))
        setServices(initialServices)
      }
    } catch {
      setServices(initialServices)
    }
  }

  const saveServices = (newServices: Service[]): void => {
    localStorage.setItem('beautyServices', JSON.stringify(newServices))
    setServices(newServices)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) newErrors.name = 'Название обязательно'
    if (!formData.time?.trim()) newErrors.time = 'Время выполнения обязательно'
    if (!formData.priceMaster || formData.priceMaster < 0) newErrors.priceMaster = 'Цена мастера должна быть неотрицательной'
    if (!formData.priceTopMaster || formData.priceTopMaster < 0) newErrors.priceTopMaster = 'Цена топ-мастера должна быть неотрицательной'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    
    if (!validateForm()) return

    const newServices = [...services]
    
    if (editingService) {
      const index = newServices.findIndex(s => s.id === editingService.id)

      if (index !== -1) {
        newServices[index] = { ...editingService, ...formData } as Service
      }
    } else {
      const newService: Service = {
        id: Date.now(),
        name: formData.name!,
        category: formData.category!,
        description: formData.description,
        time: formData.time!,
        priceMaster: formData.priceMaster!,
        priceTopMaster: formData.priceTopMaster!,
        icon: formData.icon
      }

      newServices.push(newService)
    }

    saveServices(newServices)
    handleCloseModal()
  }

  const handleEdit = (service: Service): void => {
    setEditingService(service)
    setFormData(service)
    setIsModalOpen(true)
  }

  const handleDelete = (id: number): void => {
    if (window.confirm('Вы уверены, что хотите удалить эту услугу?')) {
      const newServices = services.filter(s => s.id !== id)

      saveServices(newServices)
    }
  }

  const handleCloseModal = (): void => {
    setIsModalOpen(false)
    setEditingService(null)
    setFormData({
      name: '',
      category: 'manicure',
      description: '',
      time: '',
      priceMaster: 0,
      priceTopMaster: 0,
      icon: ''
    })
    setErrors({})
  }

  const getCategoryLabel = (category: string): string => {
    return categories.find(c => c.value === category)?.label || category
  }

  return (
    <div className="services-management">
      <div className="page-header">
        <h1 className="page-title">Управление услугами</h1>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
          type="button"
        >
          ➕ Добавить услугу
        </button>
      </div>

      {services.length === 0 ? (
        <div className="empty-state">
          <p>Услуги отсутствуют. Добавьте первую услугу.</p>
        </div>
      ) : (
        <div className="services-table-container">
          <table className="services-table">
            <thead>
              <tr>
                <th>Название</th>
                <th>Категория</th>
                <th>Описание</th>
                <th>Время</th>
                <th>Цена (мастер)</th>
                <th>Цена (топ)</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td>{getCategoryLabel(service.category)}</td>
                  <td className="description-cell">{service.description || '-'}</td>
                  <td>{service.time}</td>
                  <td>{service.priceMaster} ₽</td>
                  <td>{service.priceTopMaster} ₽</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-sm btn-edit"
                        onClick={() => handleEdit(service)}
                        type="button"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-sm btn-delete"
                        onClick={() => handleDelete(service.id)}
                        type="button"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingService ? 'Редактировать услугу' : 'Добавить услугу'}</h2>
              <button className="modal-close" onClick={handleCloseModal} type="button">
                ×
              </button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Название *</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="category">Категория *</label>
                <select
                  id="category"
                  value={formData.category || 'manicure'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Описание</label>
                <textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="time">Время выполнения *</label>
                  <input
                    id="time"
                    type="text"
                    value={formData.time || ''}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="Например: 1ч 30мин"
                    className={errors.time ? 'error' : ''}
                  />
                  {errors.time && <span className="error-message">{errors.time}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="priceMaster">Цена мастера (₽) *</label>
                  <input
                    id="priceMaster"
                    type="number"
                    min="0"
                    value={formData.priceMaster || ''}
                    onChange={(e) => setFormData({ ...formData, priceMaster: Number(e.target.value) })}
                    className={errors.priceMaster ? 'error' : ''}
                  />
                  {errors.priceMaster && <span className="error-message">{errors.priceMaster}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="priceTopMaster">Цена топ-мастера (₽) *</label>
                  <input
                    id="priceTopMaster"
                    type="number"
                    min="0"
                    value={formData.priceTopMaster || ''}
                    onChange={(e) => setFormData({ ...formData, priceTopMaster: Number(e.target.value) })}
                    className={errors.priceTopMaster ? 'error' : ''}
                  />
                  {errors.priceTopMaster && <span className="error-message">{errors.priceTopMaster}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="icon">Иконка (URL)</label>
                <input
                  id="icon"
                  type="text"
                  value={formData.icon || ''}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="URL изображения"
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Отмена
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingService ? 'Сохранить' : 'Добавить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}