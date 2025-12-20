import React, { useEffect, useState } from 'react'
import './MastersManagement.css'

interface Master {
  id: string
  name: string
  photo: string
  works: string[]
  position: string
  experience: string
  category: string[]
}

const categories = [
  { value: 'manicure', label: 'Маникюр' },
  { value: 'pedicure', label: 'Педикюр' },
  { value: 'brows', label: 'Брови' },
  { value: 'lashes', label: 'Ресницы' },
  { value: 'haircut', label: 'Парикмахер' },
  { value: 'depilation', label: 'Депиляция' }
]

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

const STORAGE_KEY = 'beautyMasters'
const MAX_FILE_SIZE = 5 * 1024 * 1024

export function MastersManagement(): React.JSX.Element {
  const [masters, setMasters] = useState<Master[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMaster, setEditingMaster] = useState<Master | null>(null)
  const [formData, setFormData] = useState<Partial<Master>>({
    name: '',
    photo: '',
    position: '',
    experience: '',
    category: [],
    works: []
  })
  const [workPhotoUrl, setWorkPhotoUrl] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadMasters()
  }, [])

  const loadMasters = (): void => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)

      if (stored) {
        const parsed: Master[] = JSON.parse(stored)

        if (parsed.length > 0) {
          setMasters(parsed)

          return
        }
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMasters))
      setMasters(initialMasters)
    } catch {
      setMasters(initialMasters)
    }
  }

  const saveMasters = (newMasters: Master[]): void => {
    const existingIds = new Set(newMasters.map(m => m.id))
    const missingInitials = initialMasters.filter(m => !existingIds.has(m.id))
    const allMasters = missingInitials.length > 0 ? [...missingInitials, ...newMasters] : newMasters

    localStorage.setItem(STORAGE_KEY, JSON.stringify(allMasters))
    setMasters(allMasters)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) newErrors.name = 'Имя обязательно'
    if (!formData.position?.trim()) newErrors.position = 'Должность обязательна'
    if (!formData.experience?.trim()) newErrors.experience = 'Опыт работы обязателен'
    if (!formData.photo?.trim()) newErrors.photo = 'Фото мастера обязательно'
    if (!formData.category || formData.category.length === 0) newErrors.category = 'Выберите хотя бы одну категорию'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    if (!validateForm()) return

    const newMasters = [...masters]

    if (editingMaster) {
      const index = newMasters.findIndex(m => m.id === editingMaster.id)

      if (index !== -1) {
        newMasters[index] = { ...editingMaster, ...formData } as Master
      }
    } else {
      newMasters.push({
        id: `master-${Date.now()}`,
        name: formData.name!,
        photo: formData.photo!,
        position: formData.position!,
        experience: formData.experience!,
        category: formData.category || [],
        works: formData.works || []
      })
    }
    saveMasters(newMasters)
    handleCloseModal()
  }

  const handleEdit = (master: Master): void => {
    setEditingMaster(master)
    setFormData(master)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string): void => {
    if (window.confirm('Вы уверены, что хотите удалить этого мастера?')) {
      saveMasters(masters.filter(m => m.id !== id))
    }
  }

  const handleCloseModal = (): void => {
    setIsModalOpen(false)
    setEditingMaster(null)
    setFormData({ name: '', photo: '', position: '', experience: '', category: [], works: [] })
    setWorkPhotoUrl('')
    setErrors({})
  }

  const handleAddWorkPhoto = (): void => {
    if (workPhotoUrl.trim()) {
      setFormData({ ...formData, works: [...(formData.works || []), workPhotoUrl.trim()] })
      setWorkPhotoUrl('')
    }
  }

  const handleRemoveWorkPhoto = (index: number): void => {
    setFormData({ ...formData, works: (formData.works || []).filter((_, i) => i !== index) })
  }

  const handleCategoryChange = (categoryValue: string, checked: boolean): void => {
    const current = formData.category || []

    setFormData({
      ...formData,
      category: checked ? [...current, categoryValue] : current.filter(c => c !== categoryValue)
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'work'): void => {
    const file = e.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение')

      return
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('Размер файла не должен превышать 5MB')

      return
    }

    const reader = new FileReader()

    reader.onload = (event) => {
      const base64 = event.target?.result as string

      if (type === 'photo') {
        setFormData({ ...formData, photo: base64 })
      } else {
        setWorkPhotoUrl(base64)
      }
    }

    reader.onerror = () => alert('Ошибка при чтении файла')
    reader.readAsDataURL(file)
  }

  const handleImageError = (masterId: string): void => {
    setImageErrors(prev => new Set(prev).add(masterId))
  }

  const getImageSrc = (photo: string): string => {
    if (photo.startsWith('data:') || photo.startsWith('http')) return photo

    return photo.startsWith('/') ? photo : `/${photo}`
  }

  return (
    <div className="masters-management">
      <div className="page-header">
        <h1 className="page-title">Управление мастерами</h1>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} type="button">
          ➕ Добавить мастера
        </button>
      </div>

      {masters.length === 0 ? (
        <div className="empty-state">
          <p>Мастера отсутствуют. Добавьте первого мастера.</p>
        </div>
      ) : (
        <div className="masters-grid">
          {masters.map((master) => (
            <div key={master.id} className="master-card">
              <div className="master-photo">
                {!imageErrors.has(master.id) ? (
                  <img
                    src={getImageSrc(master.photo)}
                    alt={master.name}
                    onError={() => handleImageError(master.id)}
                    loading="lazy"
                  />
                ) : (
                  <div className="photo-placeholder">
                    <span>📷</span>
                    <span>{master.name}</span>
                  </div>
                )}
              </div>
              <div className="master-info">
                <h3 className="master-name">{master.name}</h3>
                <p className="master-position">{master.position}</p>
                <p className="master-experience">{master.experience}</p>
                <p className="master-categories">Категории: {master.category.join(', ')}</p>
                <p className="master-works-count">Фото работ: {master.works.length}</p>
              </div>
              <div className="master-actions">
                <button className="btn btn-sm btn-edit" onClick={() => handleEdit(master)} type="button">
                  Редактировать
                </button>
                <button className="btn btn-sm btn-delete" onClick={() => handleDelete(master.id)} type="button">
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingMaster ? 'Редактировать мастера' : 'Добавить мастера'}</h2>
              <button className="modal-close" onClick={handleCloseModal} type="button">×</button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Имя *</label>
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
                <label htmlFor="position">Должность *</label>
                <input
                  id="position"
                  type="text"
                  value={formData.position || ''}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Например: Мастер ногтевого сервиса"
                  className={errors.position ? 'error' : ''}
                />
                {errors.position && <span className="error-message">{errors.position}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="experience">Опыт работы *</label>
                <input
                  id="experience"
                  type="text"
                  value={formData.experience || ''}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="Например: Опыт работы: с 2022 года"
                  className={errors.experience ? 'error' : ''}
                />
                {errors.experience && <span className="error-message">{errors.experience}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="photo">Фото мастера *</label>
                <div className="file-upload-section">
                  <input
                    id="photo-file"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'photo')}
                    className="file-input"
                  />
                  <label htmlFor="photo-file" className="file-input-label">📷 Выбрать файл</label>
                  <span className="file-input-hint">или</span>
                  <input
                    id="photo"
                    type="text"
                    value={formData.photo || ''}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    placeholder="/nails_master.png или выберите файл выше"
                    className={errors.photo ? 'error' : ''}
                  />
                </div>
                {errors.photo && <span className="error-message">{errors.photo}</span>}
                {formData.photo && (
                  <img src={getImageSrc(formData.photo)} alt="Preview" className="photo-preview" />
                )}
              </div>

              <div className="form-group">
                <label>Категории *</label>
                <div className="checkbox-group">
                  {categories.map((cat) => (
                    <label key={cat.value} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={(formData.category || []).includes(cat.value)}
                        onChange={(e) => handleCategoryChange(cat.value, e.target.checked)}
                      />
                      <span>{cat.label}</span>
                    </label>
                  ))}
                </div>
                {errors.category && <span className="error-message">{errors.category}</span>}
              </div>

              <div className="form-group">
                <label>Фото работ</label>
                <div className="file-upload-section">
                  <input
                    id="work-photo-file"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'work')}
                    className="file-input"
                  />
                  <label htmlFor="work-photo-file" className="file-input-label">📷 Выбрать файл</label>
                  <span className="file-input-hint">или</span>
                  <input
                    type="text"
                    value={workPhotoUrl}
                    onChange={(e) => setWorkPhotoUrl(e.target.value)}
                    placeholder="/masterNails/m1.1.png или выберите файл выше"
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleAddWorkPhoto}
                  >
                    Добавить
                  </button>
                </div>
                {formData.works && formData.works.length > 0 && (
                  <div className="works-photos-list">
                    {formData.works.map((work, index) => (
                      <div key={index} className="work-photo-item">
                        <img src={getImageSrc(work)} alt={`Work ${index + 1}`} />
                        <button
                          type="button"
                          className="btn btn-sm btn-delete"
                          onClick={() => handleRemoveWorkPhoto(index)}
                        >
                          Удалить
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Отмена
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingMaster ? 'Сохранить' : 'Добавить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
