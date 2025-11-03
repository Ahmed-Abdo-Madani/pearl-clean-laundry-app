import StatusBadge from './StatusBadge.jsx'

const OrderCard = ({ order, onViewDetails }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
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

  return (
    <div 
      className={`pearl-card hover:shadow-lg transition-all duration-300 ${onViewDetails ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      {/* Order Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-primary mb-1">
            Order #{order.id}
          </h3>
          <p className="text-neutral-600 text-sm">{order.customerName}</p>
        </div>
        <StatusBadge status={order.status} size="small" />
      </div>

      {/* Pickup Information */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-neutral-700 mb-2">Pickup Details</h4>
        <div className="text-sm text-neutral-600">
          <p className="flex items-center mb-1">
            <span className="mr-2">📅</span>
            {formatDate(order.pickupDate)}
          </p>
          <p className="flex items-center">
            <span className="mr-2">🕒</span>
            {formatTime(order.pickupTime)}
          </p>
        </div>
      </div>

      {/* Services */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-neutral-700 mb-2">Services</h4>
        <div className="space-y-1">
          {order.services.map((service, index) => {
            const extendedTotal = service.quantity * service.price
            return (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-neutral-600">
                  {service.quantity > 1 && `${service.quantity}x `}
                  {service.serviceName}
                </span>
                <span className="text-neutral-700 font-medium">
                  {service.quantity > 1 
                    ? `$${service.price.toFixed(2)} ea · $${extendedTotal.toFixed(2)}`
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
          <span className="text-sm font-medium text-neutral-700">Total</span>
          <span className="text-lg font-bold text-primary">
            ${order.totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      {/* View Details Button */}
      {onViewDetails && (
        <div className="mt-4 pt-3 border-t">
          <button 
            type="button"
            className="w-full text-center text-primary hover:text-primary-dark text-sm font-medium transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation()
              onViewDetails(order)
            }}
          >
            View Details →
          </button>
        </div>
      )}
    </div>
  )
}

export default OrderCard