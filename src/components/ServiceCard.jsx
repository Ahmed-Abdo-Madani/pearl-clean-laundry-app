import { useTranslation } from 'react-i18next'

const ServiceCard = ({ service, onSelect }) => {
  const { t, i18n } = useTranslation()
  const price = Number(service.price) || 0
  const isRTL = (i18n.language || i18n.resolvedLanguage)?.startsWith('ar')

  // Get localized service data
  const serviceName = isRTL ? service.nameAr || service.name : service.name
  const serviceDescription = isRTL ? service.descriptionAr || service.description : service.description
  const serviceDuration = isRTL ? service.durationAr || service.duration : service.duration

  return (
    <div className="ios-card hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer p-4 md:p-6">
      {/* Service Icon */}
      <div className="text-center mb-4">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-light/20 rounded-full flex items-center justify-center mx-auto mb-2">
          <span className="text-2xl md:text-4xl">{service.icon}</span>
        </div>
      </div>

      {/* Service Name */}
      <h3 className="text-lg md:text-xl font-semibold text-primary mb-2 text-center">
        {serviceName}
      </h3>

      {/* Description */}
      <p className="text-neutral-600 text-sm md:text-base mb-4 text-center leading-relaxed">
        {serviceDescription}
      </p>

      {/* Duration Badge */}
      <div className="flex justify-center mb-4">
        <span className="bg-secondary-light text-secondary-dark px-3 py-1 rounded-full text-xs font-medium">
          {serviceDuration}
        </span>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <span className="text-xl md:text-2xl font-bold text-primary">
          ${price.toFixed(2)}
        </span>
      </div>

      {/* Select Button */}
      {onSelect && (
        <button 
          type="button"
          className="ios-button w-full md:w-auto md:mx-auto md:block py-3"
          onClick={() => onSelect(service)}
        >
          {t('services.selectService')}
        </button>
      )}
    </div>
  )
}

export default ServiceCard