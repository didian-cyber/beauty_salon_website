import { type FC, ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  active?: boolean  // Добавляем свойство active
  onClick?: () => void
}

export const Button: FC<ButtonProps> = ({ 
  children = 'Кнопка',
  active = false,  // По умолчанию неактивна
  onClick, 
  className = '',
  ...props 
}) => {
  const buttonClasses = [
    styles.button,
    active ? styles.active : '',  // Добавляем класс active если кнопка активна
    className
  ].filter(Boolean).join(' ')

  return (
    <button 
      className={buttonClasses} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}