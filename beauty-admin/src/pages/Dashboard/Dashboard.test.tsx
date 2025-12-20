import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import '@testing-library/jest-dom'

describe('Dashboard', () => {
  it('renders dashboard with title and stats', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    expect(screen.getByText('Панель управления')).toBeInTheDocument()
    expect(screen.getByText(/Общая статистика салона красоты/)).toBeInTheDocument()
    expect(screen.getByText('Быстрые действия')).toBeInTheDocument()
  })
})