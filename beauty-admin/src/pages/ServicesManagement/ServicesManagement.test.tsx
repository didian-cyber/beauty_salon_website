import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ServicesManagement } from './ServicesManagement'
import '@testing-library/jest-dom'

describe('ServicesManagement', () => {
  it('renders services management page with text placeholder', () => {
    render(
      <BrowserRouter>
        <ServicesManagement />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Управление услугами')).toBeInTheDocument()
    expect(screen.getByText(/Функционал страницы будет включать/)).toBeInTheDocument()
  })
})