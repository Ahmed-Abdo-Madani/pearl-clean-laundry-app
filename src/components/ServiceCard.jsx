const ServiceCard = ({ service, onSelect }) => {
  const price = Number(service.price) || 0

  return (
    <div className="pearl-card hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
      {/* Service Icon */}
      <div className="text-center mb-4">
        <span className="text-4xl">{service.icon}</span>
      </div>

      {/* Service Name */}
      <h3 className="text-xl font-semibold text-primary mb-2 text-center">
        {service.name}
      </h3>

      {/* Description */}
      <p className="text-neutral-600 text-sm mb-4 text-center leading-relaxed">
        {service.description}
      </p>

      {/* Duration Badge */}
      <div className="flex justify-center mb-4">
        <span className="bg-secondary-light text-secondary-dark px-3 py-1 rounded-full text-xs font-medium">
          {service.duration}
        </span>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <span className="text-2xl font-bold text-primary">
          ${price.toFixed(2)}
        </span>
      </div>

      {/* Select Button */}
      {onSelect && (
        <button 
          type="button"
          className="pearl-button w-full"
          onClick={() => onSelect(service)}
        >
          Select Service
        </button>
      )}
    </div>
  )
}

export default ServiceCard