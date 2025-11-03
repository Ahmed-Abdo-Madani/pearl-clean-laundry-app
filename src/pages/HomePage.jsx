import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import { getServices } from '../services/api.js'

const HomePage = () => {
  const [featuredServices, setFeaturedServices] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gradient-pearl mb-6">
            Pearl Clean
          </h1>
          <h2 className="text-2xl md:text-3xl text-neutral-700 mb-6">
            Premium Laundry Service for Women
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the luxury of professional laundry care with our exclusive women-only service. 
            We provide convenient home pickup and delivery, ensuring your garments receive the 
            gentle, expert attention they deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="pearl-button">
              View Services
            </Link>
            <Link to="/booking" className="pearl-button">
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="pearl-card text-center">
              <div className="text-4xl mb-4">👩</div>
              <h3 className="text-xl font-semibold text-primary mb-2">Women Only Service</h3>
              <p className="text-neutral-600 text-sm">Exclusively serving women with understanding and care</p>
            </div>
            <div className="pearl-card text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold text-primary mb-2">Home Pickup & Delivery</h3>
              <p className="text-neutral-600 text-sm">Convenient service right to your doorstep</p>
            </div>
            <div className="pearl-card text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold text-primary mb-2">Professional Care</h3>
              <p className="text-neutral-600 text-sm">Expert handling of all fabric types and garments</p>
            </div>
            <div className="pearl-card text-center">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold text-primary mb-2">Eco-Friendly</h3>
              <p className="text-neutral-600 text-sm">Environmentally conscious cleaning methods</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Featured Services
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Discover our most popular laundry services designed specifically for women's needs
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-neutral-600">Loading services...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="pearl-card">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Ready to Experience Pearl Clean?
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Join hundreds of satisfied customers who trust us with their garments. 
              Schedule your first pickup today and discover the difference.
            </p>
            <Link to="/booking" className="pearl-button text-lg px-8 py-3">
              Schedule Your Pickup
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default HomePage