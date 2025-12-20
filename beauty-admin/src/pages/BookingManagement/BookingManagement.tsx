import React, { useEffect, useState, useMemo } from 'react'
import './BookingManagement.css'

interface Booking {
  id: number
  name: string
  phone: string
  service: string
  master: string
  date: string
  time: string
  notes?: string
  createdAt?: string
  serviceName?: string
  masterName?: string
  serviceDuration?: string
  status?: 'pending' | 'confirmed' | 'cancelled'
}

export function BookingManagement(): React.JSX.Element {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('')

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = (): void => {
    try {
      const stored = localStorage.getItem('beautyBookings')

      if (stored) {
        const allBookings: Booking[] = JSON.parse(stored)

        setBookings(allBookings.map(b => ({
          ...b,
          status: b.status || 'pending'
        })))
      }
    } catch {
      setBookings([])
    }
  }

  const saveBookings = (newBookings: Booking[]): void => {
    localStorage.setItem('beautyBookings', JSON.stringify(newBookings))
    setBookings(newBookings)
  }

  const filteredBookings = useMemo(() => {
    let filtered = [...bookings]

    if (statusFilter !== 'all') {
      filtered = filtered.filter(b => (b.status || 'pending') === statusFilter)
    }

    if (dateFilter) {
      filtered = filtered.filter(b => b.date === dateFilter)
    }

    return filtered
  }, [bookings, statusFilter, dateFilter])

  const handleStatusChange = (id: number, newStatus: 'pending' | 'confirmed' | 'cancelled'): void => {
    const newBookings = bookings.map(b =>
      b.id === id ? { ...b, status: newStatus } : b
    )

    saveBookings(newBookings)
  }

  const handleDelete = (id: number): void => {
    if (window.confirm('Вы уверены, что хотите удалить эту запись?')) {
      saveBookings(bookings.filter(b => b.id !== id))
    }
  }

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return ''

    try {
      return new Date(dateStr).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="booking-management">
      <div className="page-header">
        <h1 className="page-title">Управление записями</h1>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label htmlFor="statusFilter">Статус:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Все</option>
            <option value="pending">Ожидают подтверждения</option>
            <option value="confirmed">Подтверждены</option>
            <option value="cancelled">Отменены</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="dateFilter">Дата:</label>
          <input
            id="dateFilter"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => {
            setStatusFilter('all')
            setDateFilter('')
          }}
          type="button"
        >
          Сбросить фильтры
        </button>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="empty-state">
          <p>{bookings.length === 0 ? 'Записи отсутствуют.' : 'Записи не найдены по фильтрам.'}</p>
        </div>
      ) : (
        <div className="bookings-table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Имя клиента</th>
                <th>Телефон</th>
                <th>Услуга</th>
                <th>Мастер</th>
                <th>Дата</th>
                <th>Время</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.name}</td>
                  <td>{booking.phone}</td>
                  <td className="description-cell">{booking.serviceName || booking.service}</td>
                  <td>{booking.masterName || booking.master}</td>
                  <td>{formatDate(booking.date)}</td>
                  <td>{booking.time}</td>
                  <td>
                    <span className={`status-badge ${booking.status === 'confirmed' ? 'status-confirmed' : booking.status === 'cancelled' ? 'status-cancelled' : 'status-pending'}`}>
                      {booking.status === 'confirmed' ? 'Подтверждена' : booking.status === 'cancelled' ? 'Отменена' : 'Ожидает подтверждения'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <select
                        className="status-select"
                        value={booking.status || 'pending'}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value as 'pending' | 'confirmed' | 'cancelled')}
                      >
                        <option value="pending">Ожидает</option>
                        <option value="confirmed">Подтвердить</option>
                        <option value="cancelled">Отменить</option>
                      </select>
                      <button
                        className="btn btn-sm btn-delete"
                        onClick={() => handleDelete(booking.id)}
                        type="button"
                      >
                        Удалить
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}