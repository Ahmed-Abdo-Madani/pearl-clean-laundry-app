import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import { getServices } from '../services/api.js'

const ServicesPage = () => {
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
        setError('Failed to load services. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const handleServiceSelect = (service) => {
    navigate('/booking', { state: { selectedService: service } })
  }

  return (
    <Layout>
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Our Services
            </h1>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Professional laundry services designed specifically for women. From delicate fabrics 
              to everyday garments, we provide expert care with convenient pickup and delivery.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-neutral-600">Loading our services...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="pearl-card max-w-md mx-auto">
                <div className="text-4xl mb-4">😔</div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Oops!</h3>
                <p className="text-neutral-600 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="pearl-button"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Services Grid */}
          {!loading && !error && services.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {services.map((service) => (
                  <ServiceCard 
                    key={service.id} 
                    service={service} 
                    onSelect={(s) => handleServiceSelect(s)}
                  />
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="text-center mt-16">
                <div className="pearl-card max-w-2xl mx-auto">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    Ready to Book?
                  </h2>
                  <p className="text-neutral-600 mb-6">
                    Select any service above or customize your order with multiple services.
                  </p>
                  <button 
                    onClick={() => navigate('/booking')} 
                    className="pearl-button text-lg px-8 py-3"
                  >
                    Book Multiple Services
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
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">No Services Available</h3>
                <p className="text-neutral-600">We're updating our services. Please check back soon!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default ServicesPage