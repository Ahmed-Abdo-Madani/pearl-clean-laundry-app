import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import StatusTimeline from '../components/StatusTimeline.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { getOrderById } from '../services/api.js'

const OrderTrackingPage = () => {
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
    return date.toLocaleDateString('en-US', { 
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
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Track Your Order
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Enter your order ID to check the current status and track the progress of your laundry service.
            </p>
          </div>

          {/* Search Section */}
          <div className="pearl-card mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Enter Order Details</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your Order ID (e.g., 12345)"
                className="pearl-input flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
              />
              <button
                onClick={handleTrackOrder}
                disabled={loading}
                className="pearl-button px-8"
              >
                {loading ? 'Searching...' : 'Track Order'}
              </button>
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-neutral-600">Searching for your order...</p>
            </div>
          )}

          {/* Order Details */}
          {order && !loading && (
            <div className="space-y-8">
              {/* Order Information Card */}
              <div className="pearl-card">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-2">
                      Order #{order.id}
                    </h2>
                    <p className="text-neutral-600">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <StatusBadge status={order.status} size="large" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-3">Customer Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> {order.customerName}</p>
                      <p><span className="font-medium">Phone:</span> {order.customerPhone}</p>
                      <p><span className="font-medium">Address:</span> {order.address}</p>
                    </div>
                  </div>

                  {/* Pickup Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-3">Pickup Details</h3>
                    <div className="space-y-2 text-sm">
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
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Selected Services</h3>
                  <div className="space-y-2">
                    {order.services.map((service, index) => {
                      const extendedTotal = service.quantity * service.price
                      return (
                        <div key={index} className="flex justify-between items-center py-2">
                          <span className="text-neutral-700">
                            {service.quantity > 1 && `${service.quantity}x `}
                            {service.serviceName}
                          </span>
                          <span className="font-medium text-neutral-800">
                            {service.quantity > 1 
                              ? `$${service.price.toFixed(2)} ea · $${extendedTotal.toFixed(2)}`
                              : `$${extendedTotal.toFixed(2)}`
                            }
                          </span>
                        </div>
                      )
                    })}
                    <div className="border-t pt-2 mt-4">
                      <div className="flex justify-between items-center font-bold text-lg text-primary">
                        <span>Total</span>
                        <span>${order.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="pearl-card">
                <h2 className="text-xl font-semibold text-neutral-800 mb-6">Order Progress</h2>
                <StatusTimeline currentStatus={order.status} />
              </div>

              {/* Action Buttons */}
              <div className="text-center space-x-4">
                <button
                  onClick={handleReset}
                  className="pearl-button bg-secondary hover:bg-secondary-dark"
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
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Ready to Track</h3>
              <p className="text-neutral-600">Enter your order ID above to view your order status and progress.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default OrderTrackingPage