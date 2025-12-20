jest.mock('@beauty/ui', () => ({
  Button: ({ children, onClick }: { children?: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick} data-testid="button">
      {children || 'Кнопка'}
    </button>
  ),
  Modal: ({ children, isOpen, title, onClose }: { 
    children?: React.ReactNode; 
    isOpen?: boolean; 
    title?: string; 
    onClose?: () => void 
  }) => (
    isOpen ? (
      <div data-testid="modal">
        {title && <h3 data-testid="modal-title">{title}</h3>}
        {children}
        <button onClick={onClose} data-testid="modal-close">Закрыть</button>
      </div>
    ) : null
  ),
  ServiceCard: () => <div data-testid="service-card">ServiceCard</div>,
  MasterPhotoCard: () => <div data-testid="master-card">MasterPhotoCard</div>
}))

import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('рендерится без ошибок', () => {
    render(<App />)

    expect(screen.getByText('Главная')).toBeInTheDocument()
  })

  it('содержит навигацию', () => {
    render(<App />)

    expect(screen.getByText('Главная')).toBeInTheDocument()
    expect(screen.getByText('Услуги')).toBeInTheDocument()
    expect(screen.getByText('Мастера')).toBeInTheDocument()
    expect(screen.getByText('Запись')).toBeInTheDocument()
    expect(screen.getByText('Контакты')).toBeInTheDocument()
  })
})