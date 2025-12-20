import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Header = (): React.JSX.Element => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/services', label: 'Услуги' },
    { path: '/masters', label: 'Мастера' },
    { path: '/booking', label: 'Запись' }
  ]

  return (
    <header>
      <h1>Beauty Salon</h1>
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              fontWeight: location.pathname === item.path ? 'bold' : 'normal'
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}