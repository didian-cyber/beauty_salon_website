import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { Login } from './pages/Login/Login'
import { AdminLayout } from './components/AdminLayout'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { ServicesManagement } from './pages/ServicesManagement/ServicesManagement'
import { MastersManagement } from './pages/MastersManagement/MastersManagement'
import { BookingManagement } from './pages/BookingManagement/BookingManagement'
import './App.css'

function App(): React.JSX.Element {
  const isAuthenticated = (): boolean => {
    return localStorage.getItem('authToken') !== null
  }

  const ProtectedRoute = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />
    }

    return <>{children}</>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="services" element={<ServicesManagement />} />
          <Route path="masters" element={<MastersManagement />} />
          <Route path="bookings" element={<BookingManagement />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App