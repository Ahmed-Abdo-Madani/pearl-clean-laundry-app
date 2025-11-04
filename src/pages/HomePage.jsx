import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from '../components/Layout.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import { getServices } from '../services/api.js'

const HomePage = () => {
  const [featuredServices, setFeaturedServices] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchFeaturedServices = async () => {
      try {
        const services = await getServices()
        // Get first 4 services as featured
        setFeaturedServices(services.slice(0, 4))
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedServices()
  }, [])

  const handleServiceSelect = (service) => {
    navigate('/booking', { state: { selectedService: service } })
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="px-4 py-8 md:py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-6xl font-bold text-gradient-pearl mb-6">
            {t('common.brandName')}
          </h1>
          <h2 className="text-2xl md:text-3xl text-neutral-700 mb-6">
            {t('home.tagline')}
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('home.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="ios-button w-full sm:w-auto text-center">
              {t('nav.services')}
            </Link>
            <Link to="/booking" className="pearl-button w-full sm:w-auto text-center">
              {t('nav.bookNow')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 px-4 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className="ios-card text-center p-4 md:p-6">
              <div className="text-4xl mb-4">👩</div>
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-2">{t('home.feature1Title')}</h3>
              <p className="text-neutral-600 text-sm">{t('home.feature1Desc')}</p>
            </div>
            <div className="ios-card text-center p-4 md:p-6">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-2">{t('home.feature2Title')}</h3>
              <p className="text-neutral-600 text-sm">{t('home.feature2Desc')}</p>
            </div>
            <div className="ios-card text-center p-4 md:p-6">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-2">{t('home.feature3Title')}</h3>
              <p className="text-neutral-600 text-sm">{t('home.feature3Desc')}</p>
            </div>
            <div className="ios-card text-center p-4 md:p-6">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-2">{t('home.feature4Title')}</h3>
              <p className="text-neutral-600 text-sm">{t('home.feature4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-8 px-4 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
              {t('home.featuredServicesTitle')}
            </h2>
            <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
              {t('home.featuredServicesDesc')}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-neutral-600">{t('common.loadingServices')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {featuredServices.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  onSelect={handleServiceSelect}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/services" className="pearl-button">
              {t('services.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="pearl-card">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {t('home.ctaTitle')}
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              {t('home.ctaDescription')}
            </p>
            <Link to="/booking" className="pearl-button text-lg px-8 py-3">
              {t('nav.bookNow')}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default HomePage