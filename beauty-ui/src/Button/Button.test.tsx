import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('отображается с текстом', () => {
    render(<Button>Тест</Button>)
    expect(screen.getByText('Тест')).toBeInTheDocument()
  })

  it('имеет текст по умолчанию', () => {
    render(<Button />)
    expect(screen.getByText('Кнопка')).toBeInTheDocument()
  })

  it('реагирует на клик', () => {
    const onClick = jest.fn()
    
    render(<Button onClick={onClick}>Клик</Button>)
    fireEvent.click(screen.getByText('Клик'))
    
    expect(onClick).toHaveBeenCalled()
  })
})