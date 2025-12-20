import React, { useState, useEffect } from 'react'
import { Button, Modal } from '@beauty/ui'
import { getServicesData, Service } from '../Services/ServicesData'
import './Booking.css'

interface BookingData {
  name: string
  phone: string
  service: string
  master: string
  date: string
  time: string
  notes?: string
}

interface Master {
  id: string
  name: string
  specialization: string
  category: string[]
}

interface MasterFromStorage {
  id: string
  name: string
  position?: string
  specialization?: string
  category?: string[]
}

interface BusySlot {
  date: string
  time: string
  masterId: string
  serviceId: string
  duration: string
}

const loadMastersFromStorage = (): Master[] => {
  try {
    const stored = localStorage.getItem('beautyMasters')

    if (stored) {
      const storedMasters: MasterFromStorage[] = JSON.parse(stored)

      return storedMasters.map((m) => ({
        id: m.id,
        name: m.name,
        specialization: m.position || m.specialization || '',
        category: m.category || []
      }))
    }
  } catch {
    // Ignore
  }

  return [
    { id: 'maria', name: 'Мария', specialization: 'Мастер ногтевого сервиса', category: ['manicure', 'pedicure'] },
    { id: 'sofia', name: 'София', specialization: 'Топ мастер ногтевого сервиса', category: ['manicure', 'pedicure'] },
    { id: 'olga', name: 'Ольга', specialization: 'Мастер бровист и мастер по ламинированию ресниц', category: ['brows', 'lashes'] },
    { id: 'victoria', name: 'Виктория', specialization: 'Эксперт по ламинированию и наращиванию ресниц', category: ['brows', 'lashes'] },
    { id: 'anna', name: 'Анна', specialization: 'Стилист по волосам', category: ['haircut'] },
    { id: 'elena', name: 'Елена', specialization: 'Топ-стилист', category: ['haircut'] },
    { id: 'irina', name: 'Ирина', specialization: 'Мастер депиляции', category: ['depilation'] },
    { id: 'natalia', name: 'Наталья', specialization: 'Специалист по лазерной эпиляции', category: ['depilation'] }
  ]
}

export function Booking(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeButton, setActiveButton] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    phone: '',
    service: '',
    master: '',
    date: '',
    time: '',
    notes: ''
  })
  
  const [errors, setErrors] = useState<Partial<BookingData>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [availableMasters, setAvailableMasters] = useState<Master[]>([])
  const [selectedServiceData, setSelectedServiceData] = useState<Service | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('manicure')
  const [busySlots, setBusySlots] = useState<BusySlot[]>([])
  const [allMasters, setAllMasters] = useState<Master[]>([])
  const [servicesData, setServicesData] = useState<Service[]>([])

  useEffect(() => {
    setServicesData(getServicesData())
    setAllMasters(loadMastersFromStorage())
  }, [])

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30'
  ]

  const groupedServices = servicesData.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = []
    }
    acc[service.category].push(service)

    return acc
  }, {} as Record<string, typeof servicesData>)

  const serviceCategories = [
    { id: 'manicure', name: 'Маникюр' },
    { id: 'pedicure', name: 'Педикюр' },
    { id: 'haircut', name: 'Стрижка и окрашивание' },
    { id: 'lashes', name: 'Ресницы' },
    { id: 'brows', name: 'Брови' },
    { id: 'depilation', name: 'Депиляция' }
  ]

  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    
    // Начинаем с сегодняшнего дня
    for (let i = 0; i < 21; i++) { 
      const date = new Date(today)

      date.setDate(today.getDate() + i)
      
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('ru-RU', { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'long' 
        }),
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        isToday: i === 0 
      })
    }
    
    return dates
  }

  const availableDates = getAvailableDates()

  const getCategoryByServiceId = (serviceId: string) => {
    const service = servicesData.find(s => s.id.toString() === serviceId)

    return service?.category || 'manicure'
  }

  const filterMastersByCategory = (category: string) => {
    return allMasters.filter(master => 
      master.category.includes(category)
    )
  }

  // конвертация времени в минуты
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number)

    return hours * 60 + minutes
  }

  // получение продолжительности услуги в минутах
  const getServiceDurationMinutes = (serviceTime: string): number => {
    const timeMatch = serviceTime.match(/(\d+)\s*ч\s*(\d*)/)
    let hours = 0
    let minutes = 0
    
    if (timeMatch) {
      hours = parseInt(timeMatch[1]) || 0
      minutes = parseInt(timeMatch[2]) || 0
    }
    
    return hours * 60 + minutes
  }

  // проверка, занят ли слот
  const isSlotBusy = (date: string, time: string, masterId: string, durationMinutes: number): boolean => {
    const slotStart = timeToMinutes(time)
    const slotEnd = slotStart + durationMinutes
    
    // Проверяем все занятые слоты мастера на эту дату
    const masterBusySlots = busySlots.filter(slot => 
      slot.date === date && slot.masterId === masterId
    )
    
    for (const busySlot of masterBusySlots) {
      const busyStart = timeToMinutes(busySlot.time)
      const busyDuration = getServiceDurationMinutes(busySlot.duration)
      const busyEnd = busyStart + busyDuration
      
      // Проверяем пересечение интервалов
      if (
        (slotStart >= busyStart && slotStart < busyEnd) || 
        (slotEnd > busyStart && slotEnd <= busyEnd) || 
        (slotStart <= busyStart && slotEnd >= busyEnd) 
      ) {
        return true
      }
    }
    
    return false
  }

  const isTimeInPast = (date: string, time: string): boolean => {
    const now = new Date()
    const today = now.toISOString().split('T')[0]
    
    if (date !== today) return false
    
    const [hours, minutes] = time.split(':').map(Number)
    const slotTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)
    
    const bufferMinutes = 30
    const nowWithBuffer = new Date(now.getTime() + bufferMinutes * 60000)
    
    return slotTime < nowWithBuffer
  }

  interface BookingFromStorage {
    date: string
    time: string
    master: string
    service: string
    serviceDuration?: string
  }

  const loadBusySlots = () => {
    try {
      const existingBookings: BookingFromStorage[] = JSON.parse(localStorage.getItem('beautyBookings') || '[]')
      const busySlotsData: BusySlot[] = existingBookings.map((booking) => ({
        date: booking.date,
        time: booking.time,
        masterId: booking.master,
        serviceId: booking.service,
        duration: booking.serviceDuration || '1ч'
      }))

      setBusySlots(busySlotsData)
    } catch {
      setBusySlots([])
    }
  }

  const getAvailableTimeSlots = () => {
    if (!formData.date || !formData.master || !formData.service) {
      return timeSlots
    }

    const service = servicesData.find(s => s.id.toString() === formData.service)

    if (!service) return timeSlots

    const serviceDuration = getServiceDurationMinutes(service.time)

    return timeSlots.filter(time => {
      if (isTimeInPast(formData.date, time)) return false
      if (isSlotBusy(formData.date, time, formData.master, serviceDuration)) return false

      const slotEndMinutes = timeToMinutes(time) + serviceDuration

      return slotEndMinutes <= 22 * 60
    })
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/

    return phoneRegex.test(phone.replace(/\s+/g, ''))
  }

  // Обработчик изменения полей формы
  const handleInputChange = (field: keyof BookingData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Очищаем ошибку при изменении поля
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }

    // Если изменилась услуга, обновляем доступных мастеров
    if (field === 'service') {
      const category = getCategoryByServiceId(value)

      setSelectedCategory(category)
      const filteredMasters = filterMastersByCategory(category)

      setAvailableMasters(filteredMasters)
      
      // Обнуляем выбранного мастера при смене услуги
      setFormData(prev => ({ ...prev, master: '', time: '' }))
      
      // Сохраняем данные выбранной услуги
      const service = servicesData.find(s => s.id.toString() === value)

      setSelectedServiceData(service || null)
    }

    // Если изменился мастер, обнуляем время
    if (field === 'master') {
      setFormData(prev => ({ ...prev, time: '' }))
    }

    // Если изменилась дата, обнуляем время
    if (field === 'date') {
      setFormData(prev => ({ ...prev, time: '' }))
    }
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    const filteredMasters = filterMastersByCategory(categoryId)

    setAvailableMasters(filteredMasters)
    setFormData(prev => ({ ...prev, service: '', master: '', time: '' }))
    setSelectedServiceData(null)
  }

  const handleTimeSlotSelect = (time: string) => {
    handleInputChange('time', time)
  }

  const validateForm = () => {
    const newErrors: Partial<BookingData> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя'
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Введите номер телефона'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона'
    }
    
    if (!formData.service) {
      newErrors.service = 'Выберите услугу'
    }
    
    if (!formData.master) {
      newErrors.master = 'Выберите мастера'
    }
    
    if (!formData.date) {
      newErrors.date = 'Выберите дату'
    }
    
    if (!formData.time) {
      newErrors.time = 'Выберите время'
    } else if (formData.master && formData.date && formData.service) {
      const service = servicesData.find(s => s.id.toString() === formData.service)

      if (service) {
        const serviceDuration = getServiceDurationMinutes(service.time)

        if (isSlotBusy(formData.date, formData.time, formData.master, serviceDuration)) {
          newErrors.time = 'Это время уже занято. Пожалуйста, выберите другое время.'
        }
      }
      
      if (isTimeInPast(formData.date, formData.time)) {
        newErrors.time = 'Это время уже прошло. Пожалуйста, выберите будущее время.'
      }
    }
    
    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // Сохранение в localStorage
  const saveToLocalStorage = (data: BookingData) => {
    try {
      const existingBookings = JSON.parse(localStorage.getItem('beautyBookings') || '[]')
      const bookingWithId = {
        ...data,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        serviceName: selectedServiceData?.name || 'Услуга',
        masterName: allMasters.find(m => m.id === data.master)?.name || 'Мастер',
        serviceDuration: selectedServiceData?.time || '1ч',
        status: 'pending' // Добавляем статус
      }

      existingBookings.push(bookingWithId)
      localStorage.setItem('beautyBookings', JSON.stringify(existingBookings))
      loadBusySlots()

      return true
    } catch {
      return false
    }
  }

  // Обработчик отправки формы
  const handleSubmit = () => {
    if (validateForm()) {
      const saved = saveToLocalStorage(formData)
      
      if (saved) {
        setIsSubmitted(true)
        setTimeout(() => {
          setIsModalOpen(false)
          setIsSubmitted(false)
          setActiveButton(null)
          setFormData({
            name: '',
            phone: '',
            service: '',
            master: '',
            date: '',
            time: '',
            notes: ''
          })
          setSelectedCategory('manicure')
          setSelectedServiceData(null)
        }, 2000)
      }
    }
  }

  // Маска для телефона
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')

    if (numbers.length <= 1) return numbers
    if (numbers.length <= 4) return `+7 (${numbers.slice(1, 4)}`
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}`
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}`

    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`
  }

  useEffect(() => {
    if (isModalOpen) {
      setAvailableMasters(filterMastersByCategory('manicure'))
      loadBusySlots()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, allMasters])

  const availableTimeSlots = getAvailableTimeSlots()

  return (
    <section className="section">
      <h2 className="section-title">Онлайн-запись</h2>
      <p className="booking-description">
        Запишитесь на удобное для вас время онлайн. Выберите услугу, мастера и время приема.
      </p>

      <div className="booking-actions">
        <div className="action-buttons">
          <Button 
            onClick={() => {
              setActiveButton('form')
              setIsModalOpen(true)
            }}
            active={activeButton === 'form'}
          >
            Открыть форму записи
          </Button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setActiveButton(null)
          }}
          title="Запись на услугу"
          size="large"
        >
          <div className="booking-form-container">
            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Запись успешно создана!</h3>
                <p>Ваша запись сохранена. Мы свяжемся с вами для подтверждения.</p>
                <div className="booking-details">
                  <p><strong>Детали записи:</strong></p>
                  <p>Услуга: {selectedServiceData?.name}</p>
                  <p>Мастер: {allMasters.find(m => m.id === formData.master)?.name}</p>
                  <p>Дата: {new Date(formData.date).toLocaleDateString('ru-RU')}</p>
                  <p>Время: {formData.time}</p>
                  {selectedServiceData && (
                    <p>Продолжительность: {selectedServiceData.time}</p>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="form-section">
                  <h3>Ваши данные</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Имя *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Введите ваше имя"
                        className={errors.name ? 'input-error' : ''}
                      />
                      {errors.name && (
                        <span className="error-message">{errors.name}</span>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label>
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                        placeholder="+7 (___) ___-__-__"
                        className={errors.phone ? 'input-error' : ''}
                      />
                      {errors.phone && (
                        <span className="error-message">{errors.phone}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Выберите услугу</h3>
                  
                  <div className="category-tabs-container">
                    <div className="category-tabs">
                      {serviceCategories.map((cat) => (
                        <Button
                          key={cat.id}
                          onClick={() => handleCategorySelect(cat.id)}
                          active={selectedCategory === cat.id}
                          className="category-tab-button"
                        >
                          {cat.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Услуга *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => handleInputChange('service', e.target.value)}
                        className={errors.service ? 'input-error' : ''}
                      >
                        <option value="">Выберите услугу</option>
                        {groupedServices[selectedCategory]?.map(service => (
                          <option key={service.id} value={service.id}>
                            {service.name} - {service.time}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <span className="error-message">{errors.service}</span>
                      )}
                      {selectedServiceData && (
                        <div className="service-info">
                          <p><strong>Описание:</strong> {selectedServiceData.description}</p>
                          <p><strong>Время:</strong> {selectedServiceData.time}</p>
                          <p><strong>Цена:</strong> Мастер: {selectedServiceData.priceMaster}₽, Топ-мастер: {selectedServiceData.priceTopMaster}₽</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label>
                        Мастер *
                      </label>
                      <select
                        value={formData.master}
                        onChange={(e) => handleInputChange('master', e.target.value)}
                        className={errors.master ? 'input-error' : ''}
                      >
                        <option value="">Выберите мастера</option>
                        {availableMasters.map(master => (
                          <option key={master.id} value={master.id}>
                            {master.name} - {master.specialization}
                          </option>
                        ))}
                      </select>
                      {errors.master && (
                        <span className="error-message">{errors.master}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Выберите дату и время</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Дата приема *
                      </label>
                      <select
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className={errors.date ? 'input-error' : ''}
                      >
                        <option value="">Выберите дату</option>
                        {availableDates.map(date => (
                          <option 
                            key={date.value} 
                            value={date.value}
                            className={date.isWeekend ? 'weekend-option' : ''}
                          >
                            {date.label} {date.isWeekend ? '(выходной)' : ''} {date.isToday ? '(сегодня)' : ''}
                          </option>
                        ))}
                      </select>
                      {errors.date && (
                        <span className="error-message">{errors.date}</span>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label>
                        Время приема *
                      </label>
                      <div className="time-slots-info">
                        {!formData.date || !formData.master || !formData.service ? (
                          <p className="time-slots-hint">
                            {!formData.date && 'Выберите дату, чтобы увидеть доступное время'}
                            {formData.date && !formData.master && 'Выберите мастера, чтобы увидеть доступное время'}
                            {formData.date && formData.master && !formData.service && 'Выберите услугу, чтобы увидеть доступное время'}
                          </p>
                        ) : availableTimeSlots.length === 0 ? (
                          <p className="no-slots-message">
                            На выбранную дату у этого мастера нет свободных слотов для выбранной услуги.<br />
                            Попробуйте выбрать другую дату или другого мастера.
                          </p>
                        ) : (
                          <>
                            <div className="time-slots-grid">
                              {availableTimeSlots.map(time => (
                                <Button
                                  key={time}
                                  onClick={() => handleTimeSlotSelect(time)}
                                  active={formData.time === time}
                                  className="time-slot-button"
                                >
                                  {time}
                                </Button>
                              ))}
                            </div>
                            <p className="time-slots-note">
                              * Слоты показываются с учетом продолжительности выбранной услуги ({selectedServiceData?.time || '...'})
                              {formData.date === new Date().toISOString().split('T')[0] && (
                                <span> • Прошедшее время недоступно для записи</span>
                              )}
                            </p>
                          </>
                        )}
                      </div>
                      {errors.time && (
                        <span className="error-message">{errors.time}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Дополнительные пожелания</h3>
                  <div className="form-group full-width">
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Если у вас есть особые пожелания, аллергии или вопросы, напишите здесь..."
                      rows={3}
                    />
                  </div>
                </div>

                <div className="form-footer">
                  <Button 
                    onClick={() => {
                      setIsModalOpen(false)
                      setActiveButton(null)
                    }}
                    className="cancel-button"
                  >
                    Отмена
                  </Button>
                  
                  <Button 
                    onClick={handleSubmit}
                    type="submit"
                    className="submit-button"
                  >
                    Записаться на прием
                  </Button>
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>
    </section>
  )
}