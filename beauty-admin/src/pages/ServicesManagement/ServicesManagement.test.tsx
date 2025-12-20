import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ServicesManagement } from './ServicesManagement'
import '@testing-library/jest-dom'

describe('ServicesManagement', () => {
  it('renders services management page with title and add button', () => {
    render(
      <BrowserRouter>
        <ServicesManagement />
      </BrowserRouter>
    )

    expect(screen.getByText('Управление услугами')).toBeInTheDocument()
    expect(screen.getByText(/Добавить услугу/)).toBeInTheDocument()
  })
})
