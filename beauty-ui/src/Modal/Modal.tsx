import React from 'react'
import './Modal.css'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  size?: 'small' | 'medium' | 'large'
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title = 'Модальное окно',
  size = 'medium'
}) => {
  if (!isOpen) return null

  return (
    <div className="modalStubBackdrop" onClick={onClose}>
      <div 
        className= {` "modalStub" ${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className= "modalStubHeader">
          <h2 className= "modalStubTitle">{title}</h2>
          <button
            type="button"
            className= "modalStubClose"
            onClick={onClose}
            aria-label="Закрыть модальное окно"
          >
            ×
          </button>
        </div>
        
        <div className= "modalStubContent">
          <div className= "modalStubChildren">
            <h3>Переданные children:</h3>
            <div className= "childrenWrapper">
              {children || (
                <div>
                  <p>Нет содержимого</p>
                  <p>Это текстовая заглушка для модального окна. Передайте содержимое через prop children.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className= "modalStubFooter">
          <button 
            className= "modalStubButton"
            onClick={onClose}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}