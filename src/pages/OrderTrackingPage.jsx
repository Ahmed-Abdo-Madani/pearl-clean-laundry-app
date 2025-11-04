import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from '../components/Layout.jsx'
import StatusTimeline from '../components/StatusTimeline.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { getOrderById } from '../services/api.js'

const OrderTrackingPage = () => {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const prefilledOrderId = location.state?.orderId || ''

  const [orderId, setOrderId] = useState(prefilledOrderId)
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check for query parameters
    const searchParams = new URLSearchParams(location.search)
    const queryOrderId = searchParams.get('orderId')
    
    // Prefer query param over state, then prefilled state
    const orderIdToUse = queryOrderId || prefilledOrderId
    
    if (orderIdToUse && orderIdToUse !== orderId) {
      setOrderId(orderIdToUse)
      // Auto-search if we have a valid order ID
      if (orderIdToUse.trim()) {
        // Small delay to allow state to update
        setTimeout(() => {
          handleTrackOrder()
        }, 100)
      }
    }
    // If there's a prefilled order ID and no query param, auto-search
    else if (prefilledOrderId && !queryOrderId) {
      handleTrackOrder()
    }
  }, [prefilledOrderId, location.search])

  const handleTrackOrder = async () => {
    // Sanitize and validate order ID
    const sanitizedId = parseInt(orderId.trim(), 10)
    
    if (!orderId.trim()) {
      setError('Please enter an order ID')
      return
    }
    
    if (!Number.isFinite(sanitizedId)) {
      setError('Please enter a valid numeric order ID')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const orderData = await getOrderById(sanitizedId)
      setOrder(orderData)
    } catch (error) {
      console.error('Error fetching order:', error)
      setError('Order not found. Please check your order ID.')
      setOrder(null)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setOrderId('')
    setOrder(null)
    setError('')
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const locale = i18n.resolvedLanguage?.startsWith('ar') ? 'ar-SA' : 'en-US'
    return date.toLocaleDateString(locale, { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatTime = (timeString) => {
    return timeString
  }

  return (
    <Layout>
      <div className="min-h-screen bg-neutral-50 py-8 px-4 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-neutral-800 mb-2 md:mb-4">
              {t('tracking.title')}
            </h1>
            <p className="text-neutral-600 text-base md:text-lg">
              {t('tracking.description')}
            </p>
          </div>

          {/* Search Form */}
          <div className="ios-card p-4 md:p-6 mb-6 md:mb-8">
            <div className="space-y-4">
              <div>
                <label htmlFor="orderId" className="block text-sm font-medium text-neutral-700 mb-2">
                  Order ID
                </label>
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    type="text"
                    id="orderId"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter your order ID (e.g., 12345)"
                    className="pearl-input py-3 text-base md:text-sm flex-1"
                    onKeyDown={(e) => e.key === 'Enter' && handleTrackOrder()}
                  />
                  <button
                    onClick={handleTrackOrder}
                    disabled={loading}
                    className="ios-button px-6 py-3 text-base font-semibold whitespace-nowrap"
                  >
                    {loading ? t('tracking.searching') : t('tracking.trackOrder')}
                  </button>
                </div>
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-2 p-3 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          </div>          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-neutral-600 text-base">{t('tracking.loading')}</p>
            </div>
          )}

          {/* Order Details */}
          {order && !loading && (
            <div className="space-y-6 md:space-y-8">
              {/* Order Information Card */}
              <div className="ios-card p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 space-y-3 md:space-y-0">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">
                      Order #{order.id}
                    </h2>
                    <p className="text-neutral-600 text-sm md:text-base">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <StatusBadge status={order.status} size="large" />
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {/* Customer Information */}
                  <div className="ios-card p-4 bg-neutral-50 border-neutral-200">
                    <h3 className="text-base md:text-lg font-semibold text-neutral-800 mb-3">Customer Details</h3>
                    <div className="space-y-2 text-sm md:text-base">
                      <p><span className="font-medium">Name:</span> {order.customerName}</p>
                      <p><span className="font-medium">Phone:</span> {order.customerPhone}</p>
                      <p><span className="font-medium">Address:</span> {order.address}</p>
                    </div>
                  </div>

                  {/* Pickup Information */}
                  <div className="ios-card p-4 bg-neutral-50 border-neutral-200">
                    <h3 className="text-base md:text-lg font-semibold text-neutral-800 mb-3">Pickup Details</h3>
                    <div className="space-y-2 text-sm md:text-base">
                      <p className="flex items-center">
                        <span className="mr-2">📅</span>
                        <span className="font-medium">Date:</span>
                        <span className="ml-2">{formatDate(order.pickupDate)}</span>
                      </p>
                      <p className="flex items-center">
                        <span className="mr-2">🕒</span>
                        <span className="font-medium">Time:</span>
                        <span className="ml-2">{formatTime(order.pickupTime)}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <h3 className="text-base md:text-lg font-semibold text-neutral-800 mb-3">Selected Services</h3>
                  <div className="space-y-3">
                    {order.services.map((service, index) => {
                      const extendedTotal = service.quantity * service.price
                      return (
                        <div key={index} className="flex justify-between items-center py-2 px-3 bg-neutral-50 rounded-lg">
                          <span className="text-neutral-700 text-sm md:text-base">
                            {service.quantity > 1 && `${service.quantity}x `}
                            {service.serviceName}
                          </span>
                          <span className="font-medium text-neutral-800 text-sm md:text-base">
                            {service.quantity > 1 
                              ? `$${service.price.toFixed(2)} ea · $${extendedTotal.toFixed(2)}`
                              : `$${extendedTotal.toFixed(2)}`
                            }
                          </span>
                        </div>
                      )
                    })}
                    <div className="border-t pt-3 mt-4">
                      <div className="flex justify-between items-center font-bold text-lg md:text-xl text-primary">
                        <span>Total</span>
                        <span>${order.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="ios-card p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold text-neutral-800 mb-6">Order Progress</h2>
                <StatusTimeline currentStatus={order.status} />
              </div>

              {/* Action Buttons */}
              <div className="text-center pt-4">
                <button
                  onClick={handleReset}
                  className="ios-button bg-secondary hover:bg-secondary-dark px-6 py-3 text-base font-semibold"
                >
                  Track Another Order
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!order && !loading && !error && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg md:text-xl font-semibold text-neutral-800 mb-2">Ready to Track</h3>
              <p className="text-neutral-600 text-sm md:text-base">Enter your order ID above to view your order status and progress.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default OrderTrackingPage