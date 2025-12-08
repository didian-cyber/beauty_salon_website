import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import '@testing-library/jest-dom'

describe('Dashboard', () => {
  it('renders dashboard with text placeholder', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Панель управления')).toBeInTheDocument()
    expect(screen.getByText(/Здесь будет отображаться статистика салона красоты/)).toBeInTheDocument()
  })
})