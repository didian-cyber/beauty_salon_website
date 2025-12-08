import React from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'

import './AdminLayout.css'

export function AdminLayout(): React.JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = (): void => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>Beauty&tochka</h2>
        <nav>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Статистика</Link>
          <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Услуги</Link>
          <Link to="/masters" className={location.pathname === '/masters' ? 'active' : ''}>Мастера</Link>
          <Link to="/bookings" className={location.pathname === '/bookings' ? 'active' : ''}>Записи</Link>
        </nav>
        <button
          onClick={handleLogout}
          className="logout-button"
          type="button"
        >
          Выйти
        </button>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}