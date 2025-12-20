import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { MastersManagement } from './MastersManagement'
import '@testing-library/jest-dom'

describe('MastersManagement', () => {
  it('renders masters management page with title and add button', () => {
    render(
      <BrowserRouter>
        <MastersManagement />
      </BrowserRouter>
    )

    expect(screen.getByText('Управление мастерами')).toBeInTheDocument()
    expect(screen.getByText(/Добавить мастера/)).toBeInTheDocument()
  })
})