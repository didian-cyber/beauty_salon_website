import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { BookingManagement } from './BookingManagement'
import '@testing-library/jest-dom'

describe('BookingManagement', () => {
  it('renders booking management page with title and filters', () => {
    render(
      <BrowserRouter>
        <BookingManagement />
      </BrowserRouter>
    )

    expect(screen.getByText('Управление записями')).toBeInTheDocument()
    expect(screen.getByText('Статус:')).toBeInTheDocument()
  })
})