import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from '../components/Layout.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import { getServices } from '../services/api.js'

const ServicesPage = () => {
  const { t } = useTranslation()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const servicesData = await getServices()
        setServices(servicesData)
      } catch (error) {
        console.error('Error fetching services:', error)
        setError(t('services.loadError'))
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [t])

  const handleServiceSelect = (service) => {
    navigate('/booking', { state: { selectedService: service } })
  }

  return (
    <Layout>
      <div className="py-8 px-4 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-5xl font-bold text-primary mb-6">
              {t('services.title')}
            </h1>
            <p className="text-base md:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              {t('services.description')}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-neutral-600">{t('services.loading')}</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="pearl-card max-w-md mx-auto">
                <div className="text-4xl mb-4">😔</div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">{t('common.oops')}</h3>
                <p className="text-neutral-600 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="pearl-button"
                >
                  {t('common.tryAgain')}
                </button>
              </div>
            </div>
          )}

                    {/* Services Grid */}
          {!loading && !error && services.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                {services.map((service) => (
                  <ServiceCard 
                    key={service.id} 
                    service={service} 
                    onSelect={(s) => handleServiceSelect(s)}
                  />
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="text-center mt-8 md:mt-16">
                <div className="ios-card max-w-2xl mx-auto p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">
                    {t('services.readyToBook')}
                  </h2>
                  <p className="text-neutral-600 mb-6">
                    {t('services.readyToBookDesc')}
                  </p>
                  <button 
                    onClick={() => navigate('/booking')} 
                    className="ios-button w-full sm:w-auto text-base md:text-lg px-8 py-3"
                  >
                    {t('services.bookMultiple')}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Empty State */}
          {!loading && !error && services.length === 0 && (
            <div className="text-center py-12">
              <div className="pearl-card max-w-md mx-auto">
                <div className="text-4xl mb-4">🧺</div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">{t('services.noServicesTitle')}</h3>
                <p className="text-neutral-600">{t('services.noServicesDesc')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default ServicesPage