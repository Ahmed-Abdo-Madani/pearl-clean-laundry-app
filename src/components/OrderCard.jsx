import { useTranslation } from 'react-i18next'
import StatusBadge from './StatusBadge.jsx'

const OrderCard = ({ order, onViewDetails, variant = 'card' }) => {
  const { t, i18n } = useTranslation()
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const locale = i18n.resolvedLanguage?.startsWith('ar') ? 'ar-SA' : 'en-US'
    return date.toLocaleDateString(locale, { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatTime = (timeString) => {
    return timeString
  }

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(order)
    }
  }

  // List variant for mobile
  if (variant === 'list') {
    return (
      <div 
        className={`ios-card p-4 hover:shadow-lg transition-all duration-300 ${onViewDetails ? 'cursor-pointer' : ''}`}
        onClick={handleCardClick}
      >
        <div className="flex items-center justify-between">
          {/* Left side - Order info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-primary truncate">
                {t('common.order')} #{order.id}
              </h3>
              <StatusBadge status={order.status} size="small" />
            </div>
            <p className="text-sm text-neutral-600 mb-1">{order.customerName}</p>
            <div className="flex items-center text-xs text-neutral-500 space-x-3">
              <span>📅 {formatDate(order.pickupDate)}</span>
              <span>🕒 {formatTime(order.pickupTime)}</span>
            </div>
          </div>
          
          {/* Right side - Total and action */}
          <div className="flex flex-col items-end ml-4">
            <span className="text-lg font-bold text-primary mb-1">
              ${order.totalPrice.toFixed(2)}
            </span>
            <span className="text-xs text-neutral-500">
              {order.services.length} {order.services.length === 1 ? 'service' : 'services'}
            </span>
            {onViewDetails && (
              <button 
                type="button"
                className="text-xs text-primary font-medium mt-1"
                onClick={(e) => {
                  e.stopPropagation()
                  onViewDetails(order)
                }}
              >
                View →
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Default card variant
  return (
    <div 
      className={`ios-card p-4 md:p-6 hover:shadow-lg transition-all duration-300 ${onViewDetails ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      {/* Order Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-primary mb-1">
            {t('common.order')} #{order.id}
          </h3>
          <p className="text-neutral-600 text-sm">{order.customerName}</p>
        </div>
        <StatusBadge status={order.status} size="small" />
      </div>

      {/* Pickup Information */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-neutral-700 mb-2">{t('booking.pickupDetails')}</h4>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-neutral-600">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
              <span className="text-xs">📅</span>
            </div>
            {formatDate(order.pickupDate)}
          </div>
          <div className="flex items-center text-sm text-neutral-600">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
              <span className="text-xs">🕒</span>
            </div>
            {formatTime(order.pickupTime)}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-neutral-700 mb-2">{t('common.services')}</h4>
        <div className="space-y-2">
          {order.services.map((service, index) => {
            const extendedTotal = service.quantity * service.price
            return (
              <div key={index} className="flex justify-between items-center text-sm p-2 bg-neutral-50 rounded-lg">
                <span className="text-neutral-600 flex-1">
                  {service.quantity > 1 && `${service.quantity}x `}
                  {service.serviceName}
                </span>
                <span className="text-neutral-700 font-medium text-xs">
                  {service.quantity > 1 
                    ? `$${service.price.toFixed(2)} ${t('common.each')} · $${extendedTotal.toFixed(2)}`
                    : `$${extendedTotal.toFixed(2)}`
                  }
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Total */}
      <div className="border-t pt-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-neutral-700">{t('common.total')}</span>
          <span className="text-base md:text-lg font-bold text-primary">
            ${order.totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      {/* View Details Button */}
      {onViewDetails && (
        <div className="mt-4 pt-3 border-t">
          <button 
            type="button"
            className="w-full text-center text-primary hover:text-primary-dark text-sm font-medium transition-colors duration-200 py-2"
            onClick={(e) => {
              e.stopPropagation()
              onViewDetails(order)
            }}
          >
            {t('common.viewDetails')} →
          </button>
        </div>
      )}
    </div>
  )
}

export default OrderCard