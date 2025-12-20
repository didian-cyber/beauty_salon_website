import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

interface Stats {
  totalBookings: number
  activeMasters: number
  availableServices: number
  pendingBookings: number
}

export function Dashboard(): React.JSX.Element {
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    activeMasters: 0,
    availableServices: 0,
    pendingBookings: 0
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = (): void => {
    try {
      const bookings = JSON.parse(localStorage.getItem('beautyBookings') || '[]')
      const services = JSON.parse(localStorage.getItem('beautyServices') || '[]')
      const masters = JSON.parse(localStorage.getItem('beautyMasters') || '[]')

      const pendingBookings = bookings.filter((b: { status?: string }) => !b.status || b.status === 'pending').length

      setStats({
        totalBookings: bookings.length,
        activeMasters: masters.length,
        availableServices: services.length,
        pendingBookings
      })
    } catch {
      setStats({
        totalBookings: 0,
        activeMasters: 0,
        availableServices: 0,
        pendingBookings: 0
      })
    }
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Панель управления</h1>
      <p className="dashboard-subtitle">Общая статистика салона красоты Beauty&tochka</p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <h3 className="stat-title">Всего записей</h3>
            <p className="stat-value">{stats.totalBookings}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <h3 className="stat-title">Ожидают подтверждения</h3>
            <p className="stat-value">{stats.pendingBookings}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <h3 className="stat-title">Активных мастеров</h3>
            <p className="stat-value">{stats.activeMasters}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <h3 className="stat-title">Доступных услуг</h3>
            <p className="stat-value">{stats.availableServices}</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2 className="section-title">Быстрые действия</h2>
        <div className="actions-grid">
          <Link to="/services" className="action-card">
            <span className="action-text">Добавить услугу</span>
          </Link>
          <Link to="/masters" className="action-card">
            <span className="action-text">Добавить мастера</span>
          </Link>
          <Link to="/bookings" className="action-card">
            <span className="action-text">Просмотр записей</span>
          </Link>
        </div>
      </div>
    </div>
  )
}