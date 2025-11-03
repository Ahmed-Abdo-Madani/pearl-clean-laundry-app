import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const OrderConfirmationModal = ({ isOpen, onClose, orderData }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, onClose])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleTrackOrder = () => {
    navigate('/track', { state: { orderId: orderData.id } })
    onClose()
  }

  const handleViewOrders = () => {
    navigate('/orders')
    onClose()
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

  if (!isOpen || !orderData) return null

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
    >
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity animate-fade-in"
        onClick={handleOverlayClick}
      ></div>

      {/* Modal */}
      <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all animate-scale-up sm:my-8 sm:w-full sm:max-w-lg">
          <div className="pearl-card border-0 shadow-none">
            {/* Close Button */}
            <button
              type="button"
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 text-2xl"
              onClick={onClose}
            >
              ×
            </button>

            {/* Success Icon */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-primary mb-2" id="modal-title">
                Booking Confirmed!
              </h3>
              <p className="text-neutral-600">
                Your laundry pickup has been scheduled successfully.
              </p>
            </div>

            {/* Order Summary */}
            <div className="space-y-4 mb-6">
              <div className="bg-accent-pearl rounded-lg p-4">
                <h4 className="font-semibold text-neutral-800 mb-3">Order Summary</h4>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Order ID:</span>
                    <span className="font-medium">#{orderData.id}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Customer:</span>
                    <span className="font-medium">{orderData.customerName}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Pickup Date:</span>
                    <span className="font-medium">{formatDate(orderData.pickupDate)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Pickup Time:</span>
                    <span className="font-medium">{orderData.pickupTime}</span>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <h5 className="font-medium text-neutral-800 mb-2">Selected Services:</h5>
                <div className="space-y-1">
                  {orderData.services.map((service, index) => {
                    const extendedTotal = service.quantity * service.price
                    return (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-neutral-600">
                          {service.quantity > 1 && `${service.quantity}x `}
                          {service.serviceName}
                        </span>
                        <span className="font-medium">
                          {service.quantity > 1 
                            ? `$${service.price.toFixed(2)} ea · $${extendedTotal.toFixed(2)}`
                            : `$${extendedTotal.toFixed(2)}`
                          }
                        </span>
                      </div>
                    )
                  })}
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-primary">
                    <span>Total:</span>
                    <span>${orderData.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                className="pearl-button flex-1"
                onClick={handleTrackOrder}
              >
                Track Order
              </button>
              <button
                type="button"
                className="pearl-button bg-secondary hover:bg-secondary-dark flex-1"
                onClick={handleViewOrders}
              >
                View My Orders
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 pt-4 border-t border-neutral-200">
              <p className="text-xs text-neutral-500 text-center">
                We'll contact you shortly to confirm your pickup details. 
                You can track your order status anytime using your Order ID.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmationModal