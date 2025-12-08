import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Login } from './Login'
import '@testing-library/jest-dom'

// Simple mock without complex typing
const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('Login Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  test('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    expect(screen.getByText('Авторизация')).toBeInTheDocument()
    expect(screen.getByLabelText('Логин:')).toBeInTheDocument()
    expect(screen.getByLabelText('Пароль:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument()
  })

  test('shows error for invalid credentials', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByLabelText('Логин:'), { target: { value: 'invalid' } })
    fireEvent.change(screen.getByLabelText('Пароль:'), { target: { value: 'wrong' } })
    fireEvent.click(screen.getByRole('button', { name: 'Войти' }))

    expect(screen.getByText('Неверные учетные данные')).toBeInTheDocument()
  })

  test('navigates to home on successful login', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByLabelText('Логин:'), { target: { value: 'admin' } })
    fireEvent.change(screen.getByLabelText('Пароль:'), { target: { value: '1234' } })
    fireEvent.click(screen.getByRole('button', { name: 'Войти' }))

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})