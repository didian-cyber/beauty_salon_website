import '@testing-library/jest-dom'

// Сохраняем оригинальный console.warn
const originalWarn = console.warn

beforeAll(() => {
  // Мокаем console.warn, но фильтруем сообщения
  console.warn = jest.fn((...args) => {
    const message = typeof args[0] === 'string' ? args[0] : ''
    
    // Игнорировать только предупреждения React Router
    if (
      message.includes('React Router Future Flag Warning') ||
      message.includes('v7_startTransition') ||
      message.includes('v7_relativeSplatPath')
    ) {
      return
    }
    
    originalWarn(...args)
  })
})

afterAll(() => {
  console.warn = originalWarn
})
