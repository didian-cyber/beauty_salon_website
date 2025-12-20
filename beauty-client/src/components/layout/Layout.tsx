import { type FC, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1 className="app-title">Beauty&tochka</h1>
          <p className="app-subtitle">Салон красоты премиум-класса</p>
          <nav>
            <Link to="/">Главная</Link>
            <Link to="/services">Услуги</Link>
            <Link to="/masters">Мастера</Link>
            <Link to="/booking">Запись</Link>
            <Link to="/contacts">Контакты</Link>
          </nav>
        </div>
      </header>
      <main className="app-main">
        <div className="container">
          {children}
        </div>
      </main>
      <footer className="app-footer">
        <div className="container">
          <div className="footer-content">
            <p className="footer-text">© Студия красоты &quot;Beauty&amp;tochka&quot;</p>
            <p className="footer-text">г. Казань, ул. Пушкина, д. Колотушкина</p>
          </div>
        </div>
      </footer>
    </div>
  )
}