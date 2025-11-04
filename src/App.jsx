import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import BookingPage from './pages/BookingPage'
import MyOrdersPage from './pages/MyOrdersPage'
import OrderTrackingPage from './pages/OrderTrackingPage'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  const { i18n } = useTranslation()
  
  useEffect(() => {
    // Set document direction based on language
    const isRTL = i18n.dir() === 'rtl'
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.resolvedLanguage || i18n.language
    
    // Apply RTL class to body for styling
    if (isRTL) {
      document.body.classList.add('rtl')
      document.body.classList.remove('ltr')
    } else {
      document.body.classList.add('ltr')
      document.body.classList.remove('rtl')
    }
  }, [i18n.language])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/orders" element={<MyOrdersPage />} />
        <Route path="/track" element={<OrderTrackingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App