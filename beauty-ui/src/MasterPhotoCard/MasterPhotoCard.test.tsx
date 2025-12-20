import { describe, it, expect } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import { MasterPhotoCard } from './MasterPhotoCard'

describe('MasterPhotoCard', () => {
  const mockProps = {
    masterPhoto: 'master.jpg',
    workPhotos: ['work1.jpg', 'work2.jpg', 'work3.jpg'],
    masterName: 'Анна'
  }

  it('renders master photo and name', () => {
    render(<MasterPhotoCard {...mockProps} />)

    expect(screen.getByAltText('Мастер Анна')).toBeTruthy()
  })

  it('shows navigation and dots on hover with work photos', () => {
    render(<MasterPhotoCard {...mockProps} />)
    
    const card = screen.getByAltText('Мастер Анна').closest('[class*="masterPhotoCard"]')

    expect(card).not.toBeNull()
    
    if (card) {
      fireEvent.mouseEnter(card)
    }
    
    // Проверяем элементы навигации
    expect(screen.getByLabelText('Предыдущее фото')).toBeTruthy()
    expect(screen.getByLabelText('Следующее фото')).toBeTruthy()
    expect(screen.getAllByLabelText(/Перейти к фото/)).toHaveLength(4) 
  })

  it('navigates slides with buttons', () => {
    render(<MasterPhotoCard {...mockProps} />)
    
    const card = screen.getByAltText('Мастер Анна').closest('[class*="masterPhotoCard"]')

    expect(card).not.toBeNull()
    
    if (card) {
      fireEvent.mouseEnter(card)
    }
    
    // Нажимаем на следующую кнопку
    fireEvent.click(screen.getByLabelText('Следующее фото'))
    expect(screen.getByAltText('Работа мастера Анна')).toBeTruthy()
    
    // Нажимаем на предыдущую кнопку
    fireEvent.click(screen.getByLabelText('Предыдущее фото'))
    expect(screen.getByAltText('Мастер Анна')).toBeTruthy()
  })

  it('navigates with dots', () => {
    render(<MasterPhotoCard {...mockProps} />)
    
    const card = screen.getByAltText('Мастер Анна').closest('[class*="masterPhotoCard"]')

    expect(card).not.toBeNull()
    
    if (card) {
      fireEvent.mouseEnter(card)
    }
    
    const dots = screen.getAllByLabelText(/Перейти к фото/)
    
    // Кликаем на вторую точку 
    fireEvent.click(dots[1])
    expect(screen.getByAltText('Работа мастера Анна')).toBeTruthy()
  })

  it('handles master without name', () => {
    const props = { 
      masterPhoto: 'master.jpg', 
      workPhotos: ['work1.jpg'],
      masterName: undefined
    }

    render(<MasterPhotoCard {...props} />)
    
    expect(screen.getByAltText('Мастер салона')).toBeTruthy()
  })

  it('resets to first slide on mouse leave', () => {
    render(<MasterPhotoCard {...mockProps} />)
    
    const card = screen.getByAltText('Мастер Анна').closest('[class*="masterPhotoCard"]')

    expect(card).not.toBeNull()
    
    if (card) {
      fireEvent.mouseEnter(card)
      fireEvent.click(screen.getByLabelText('Следующее фото'))
      expect(screen.getByAltText('Работа мастера Анна')).toBeTruthy()
      
      fireEvent.mouseLeave(card)
      // Проверяем, что вернулись к первому слайду
      expect(screen.getByAltText('Мастер Анна')).toBeTruthy()
    }
  })
})