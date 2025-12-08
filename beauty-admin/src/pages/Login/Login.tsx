import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Login.css'

export const Login: React.FC = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (login === 'admin' && password === '1234') {
      localStorage.setItem('authToken', 'dummy-token')
      navigate('/')
    } else {
      setError('Неверные учетные данные')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Авторизация</h2>
        <p className="login-subtitle">Beauty&tochka Admin</p>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login" className="form-label">Логин:</label>
            <input
              type="text"
              id="login"
              className="form-input"
              placeholder="Введите логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Пароль:</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && (
            <div style={{ color: '#dc3545', fontSize: '14px', textAlign: 'center' }}>
              {error}
            </div>
          )}
          
          <button type="submit" className="login-button">
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}