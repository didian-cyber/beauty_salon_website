import { render, screen } from '@testing-library/react'
import { Modal } from './Modal'

describe('Modal', () => {
  it('отображается когда открыта', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <p>Контент</p>
      </Modal>
    )
    
    expect(screen.getByText('Контент')).toBeInTheDocument()
  })

  it('скрывается когда закрыта', () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()}>
        <p>Контент</p>
      </Modal>
    )
    
    expect(screen.queryByText('Контент')).toBeNull()
  })

  it('показывает заголовок', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} title="Заголовок">
        <p>Контент</p>
      </Modal>
    )
    
    expect(screen.getByText('Заголовок')).toBeInTheDocument()
  })

  it('есть кнопка закрытия', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <p>Контент</p>
      </Modal>
    )
    
    expect(screen.getByText('Закрыть')).toBeInTheDocument()
  })
})