import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const OrderConfirmationModal = ({ isOpen, onClose, orderData }) => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

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
    const locale = i18n.resolvedLanguage?.startsWith('ar') ? 'ar-SA' : 'en-US'
    return date.toLocaleDateString(locale, { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (!isOpen || !orderData) return null

  return (
    <div 
      className="fixed inset-0 z-60 overflow-y-auto"
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
    >
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={handleOverlayClick}
      />
      
      {/* Modal Content */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden ios-card w-full max-w-lg p-6 transition-all">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label="Close modal"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Success Icon */}
          <div className="text-center mb-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-800 mb-2">
              {t('booking.confirmationTitle')}
            </h2>
            <p className="text-neutral-600 text-sm md:text-base">
              {t('booking.confirmationMessage')}
            </p>
          </div>

          {/* Order Summary */}
          <div className="space-y-4 mb-6">
            <div className="bg-accent-pearl rounded-lg p-4">
              <h4 className="font-semibold text-neutral-800 mb-3 text-sm md:text-base">{t('booking.orderSummary')}</h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">{t('common.orderId')}:</span>
                  <span className="font-medium">#{orderData.id}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">{t('common.customer')}:</span>
                  <span className="font-medium">{orderData.customerName}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">{t('booking.pickupDate')}:</span>
                  <span className="font-medium">{formatDate(orderData.pickupDate)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">{t('booking.pickupTime')}:</span>
                  <span className="font-medium">{orderData.pickupTime}</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h5 className="font-medium text-neutral-800 mb-2 text-sm md:text-base">{t('booking.selectedServices')}:</h5>
              <div className="space-y-2">
                {orderData.services.map((service, index) => {
                  const extendedTotal = service.quantity * service.price
                  return (
                    <div key={index} className="flex justify-between text-sm p-2 bg-neutral-50 rounded-lg">
                      <span className="text-neutral-600 flex-1">
                        {service.quantity > 1 && `${service.quantity}x `}
                        {service.serviceName}
                      </span>
                      <span className="font-medium text-xs">
                        {service.quantity > 1 
                          ? `$${service.price.toFixed(2)} ${t('common.each')} · $${extendedTotal.toFixed(2)}`
                          : `$${extendedTotal.toFixed(2)}`
                        }
                      </span>
                    </div>
                  )
                })}
              </div>
              <div className="border-t pt-2 mt-3">
                <div className="flex justify-between font-bold text-primary text-base">
                  <span>{t('common.total')}:</span>
                  <span>${orderData.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="ios-button w-full text-base font-semibold py-3"
              onClick={handleTrackOrder}
            >
              {t('nav.trackOrder')}
            </button>
            <button
              type="button"
              className="ios-button bg-secondary hover:bg-secondary-dark w-full text-base font-semibold py-3"
              onClick={handleViewOrders}
            >
              {t('orders.viewMyOrders')}
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-4 border-t border-neutral-200">
            <p className="text-xs text-neutral-500 text-center">
              {t('booking.confirmationNote')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmationModal