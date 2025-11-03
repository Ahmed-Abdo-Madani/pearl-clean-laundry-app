import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import OrderConfirmationModal from '../components/OrderConfirmationModal.jsx'
import { getServices, createOrder } from '../services/api.js'
import { useToast } from '../hooks/useToast.js'

const BookingPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const preSelectedService = location.state?.selectedService
  const { showSuccess, showError } = useToast()

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    address: '',
    selectedServices: preSelectedService ? [preSelectedService.id] : [],
    pickupDate: '',
    pickupTime: ''
  })

  const [services, setServices] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [confirmedOrder, setConfirmedOrder] = useState(null)

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM'
  ]

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await getServices()
        setServices(servicesData)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  useEffect(() => {
    // Calculate total price based on selected services
    const total = formData.selectedServices.reduce((sum, serviceId) => {
      const service = services.find(s => s.id === serviceId)
      return sum + (service ? service.price : 0)
    }, 0)
    setTotalPrice(total)
  }, [formData.selectedServices, services])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required'
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Phone number is required'
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.customerPhone)) {
      newErrors.customerPhone = 'Please enter a valid phone number'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (formData.selectedServices.length === 0) {
      newErrors.selectedServices = 'Please select at least one service'
    }

    if (!formData.pickupDate) {
      newErrors.pickupDate = 'Pickup date is required'
    } else {
      const selectedDate = new Date(formData.pickupDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.pickupDate = 'Pickup date cannot be in the past'
      }
    }

    if (!formData.pickupTime) {
      newErrors.pickupTime = 'Pickup time is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setSubmitting(true)
      
      try {
        // Prepare order data matching db.json structure
        // Note: customerId omitted until real user authentication system is implemented
        const orderData = {
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          address: formData.address,
          services: formData.selectedServices.map(serviceId => {
            const service = services.find(s => s.id === serviceId)
            return {
              serviceId: service.id,
              serviceName: service.name,
              quantity: 1,
              price: service.price
            }
          }),
          pickupDate: formData.pickupDate,
          pickupTime: formData.pickupTime,
          status: 'scheduled',
          totalPrice: totalPrice,
          createdAt: new Date().toISOString()
        }

        // Create order via API
        const createdOrder = await createOrder(orderData)
        showSuccess('Booking confirmed! Your order has been scheduled.')
        setConfirmedOrder(createdOrder)
        
        // Clear any previous errors
        setErrors({})
        
      } catch (error) {
        console.error('Error creating order:', error)
        showError('Failed to create booking. Please try again.')
      } finally {
        setSubmitting(false)
      }
    }
  }

  const handleModalClose = () => {
    setConfirmedOrder(null)
    // Reset form
    setFormData({
      customerName: '',
      customerPhone: '',
      address: '',
      selectedServices: [],
      pickupDate: '',
      pickupTime: ''
    })
  }

  if (loading) {
    return (
      <Layout>
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-neutral-600">Loading booking form...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gradient-pearl mb-4">
              Book Your Service
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Schedule your laundry pickup and let us take care of your garments with professional expertise.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Customer Information */}
            <div className="pearl-card">
              <h2 className="text-2xl font-semibold text-primary mb-6">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className={`pearl-input ${errors.customerName ? 'border-red-500' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>}
                </div>

                <div>
                  <label htmlFor="customerPhone" className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="customerPhone"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    className={`pearl-input ${errors.customerPhone ? 'border-red-500' : ''}`}
                    placeholder="(555) 123-4567"
                  />
                  {errors.customerPhone && <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-2">
                    Pickup Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className={`pearl-input ${errors.address ? 'border-red-500' : ''}`}
                    placeholder="Enter your complete address including apartment/unit number"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div className="pearl-card">
              <h2 className="text-2xl font-semibold text-primary mb-6">Select Services</h2>
              {errors.selectedServices && <p className="text-red-500 text-sm mb-4">{errors.selectedServices}</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`border rounded-lg p-4 transition-all duration-200 ${
                      formData.selectedServices.includes(service.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-neutral-300 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center">
                      <label className="flex items-center cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={formData.selectedServices.includes(service.id)}
                          onChange={() => handleServiceToggle(service.id)}
                          className="mr-3 h-4 w-4 text-primary"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-2xl mr-2">{service.icon}</span>
                              <div>
                                <h3 className="font-semibold text-neutral-800">{service.name}</h3>
                                <p className="text-sm text-neutral-600">{service.duration}</p>
                              </div>
                            </div>
                            <span className="font-bold text-primary">${service.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pickup Schedule */}
            <div className="pearl-card">
              <h2 className="text-2xl font-semibold text-primary mb-6">Pickup Schedule</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="pickupDate" className="block text-sm font-medium text-neutral-700 mb-2">
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    id="pickupDate"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`pearl-input ${errors.pickupDate ? 'border-red-500' : ''}`}
                  />
                  {errors.pickupDate && <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>}
                </div>

                <div>
                  <label htmlFor="pickupTime" className="block text-sm font-medium text-neutral-700 mb-2">
                    Pickup Time *
                  </label>
                  <select
                    id="pickupTime"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                    className={`pearl-input ${errors.pickupTime ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {errors.pickupTime && <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="pearl-card bg-primary/5 border-primary/20">
              <h2 className="text-2xl font-semibold text-primary mb-4">Order Summary</h2>
              <div className="space-y-2">
                {formData.selectedServices.map(serviceId => {
                  const service = services.find(s => s.id === serviceId)
                  return service ? (
                    <div key={serviceId} className="flex justify-between items-center">
                      <span className="text-neutral-700">{service.name}</span>
                      <span className="font-semibold">${service.price.toFixed(2)}</span>
                    </div>
                  ) : null
                })}
                {formData.selectedServices.length > 0 && (
                  <div className="border-t pt-2 mt-4">
                    <div className="flex justify-between items-center text-lg font-bold text-primary">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="pearl-button text-lg px-12 py-4"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Schedule Pickup'}
              </button>
            </div>
          </form>

          {/* Order Confirmation Modal */}
          <OrderConfirmationModal
            isOpen={!!confirmedOrder}
            onClose={handleModalClose}
            orderData={confirmedOrder}
          />
        </div>
      </div>
    </Layout>
  )
}

export default BookingPage