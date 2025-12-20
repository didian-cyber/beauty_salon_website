import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home/Home'
import { Services } from './pages/Services/Services'
import { ServiceDetail } from './pages/Services/ServicesDetail' 
import { Masters } from './pages/Masters/Masters'
import { Booking } from './pages/Booking/Booking'
import { Contacts } from './pages/Contacts/Contacts'

export function App(): React.JSX.Element {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:category" element={<ServiceDetail />} />
          <Route path="/masters" element={<Masters />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App