import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from '../components/Layout.jsx'
import OrderCard from '../components/OrderCard.jsx'
import { getOrders } from '../services/api.js'

const MyOrdersPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [error, setError] = useState('')

  const filterOptions = [
    { key: 'all', label: t('orders.allOrders') },
    { key: 'scheduled', label: t('status.scheduled') },
    { key: 'picked-up', label: t('status.pickedUp') },
    { key: 'in-progress', label: t('status.inProgress') },
    { key: 'ready', label: t('status.ready') },
    { key: 'delivered', label: t('status.delivered') }
  ]

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const ordersData = await getOrders()
        
        // Sort orders by createdAt (most recent first)
        const sortedOrders = ordersData.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        )
        
        setOrders(sortedOrders)
        setFilteredOrders(sortedOrders)
      } catch (error) {
        console.error('Error fetching orders:', error)
        setError(t('orders.loadError'))
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  useEffect(() => {
    // Filter orders based on selected status
    if (statusFilter === 'all') {
      setFilteredOrders(orders)
    } else {
      setFilteredOrders(orders.filter(order => order.status === statusFilter))
    }
  }, [statusFilter, orders])

  const handleFilterChange = (filter) => {
    setStatusFilter(filter)
  }

  const handleViewDetails = (order) => {
    navigate('/track', { state: { orderId: order.id } })
  }

  const getStatusCount = (status) => {
    if (status === 'all') return orders.length
    return orders.filter(order => order.status === status).length
  }

  return (
    <Layout>
      <div className="min-h-screen bg-neutral-50 py-8 px-4 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-6 md:mb-12">
            <h1 className="text-2xl md:text-4xl font-bold text-primary mb-4 md:mb-6">
              {t('orders.title')}
            </h1>
            <p className="text-sm md:text-lg text-neutral-600 max-w-2xl mx-auto">
              {t('orders.description')}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-neutral-600 text-base">{t('orders.loading')}</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="ios-card p-6 max-w-md mx-auto bg-red-50 border-red-200">
                <div className="text-4xl mb-4">❌</div>
                <h3 className="text-lg md:text-xl font-semibold text-red-800 mb-2">Error Loading Orders</h3>
                <p className="text-red-600 mb-4 text-sm md:text-base">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="ios-button px-6 py-3 text-base font-semibold"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Orders Content */}
          {!loading && !error && (
            <>
              {/* Filter Section */}
              <div className="ios-card p-4 md:p-6 mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-neutral-800 mb-4">Filter Orders</h2>
                <div className="flex overflow-x-auto gap-2 pb-2">
                  {filterOptions.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => handleFilterChange(option.key)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                        statusFilter === option.key
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {option.label}
                      <span className="ml-2 text-xs opacity-75">
                        ({getStatusCount(option.key)})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Grid */}
              {filteredOrders.length > 0 ? (
                <>
                  {/* Mobile List View */}
                  <div className="md:hidden space-y-3">
                    {filteredOrders.map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onViewDetails={handleViewDetails}
                        variant="list"
                      />
                    ))}
                  </div>
                  
                  {/* Desktop Grid View */}
                  <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOrders.map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onViewDetails={handleViewDetails}
                        variant="card"
                      />
                    ))}
                  </div>
                </>
              ) : (
                /* Empty State */
                <div className="text-center py-12">
                  <div className="ios-card p-6 max-w-md mx-auto">
                    <div className="text-6xl mb-4">🧺</div>
                    <h3 className="text-lg md:text-xl font-semibold text-neutral-800 mb-2">
                      {orders.length === 0 ? 'No Orders Yet' : 'No Orders Found'}
                    </h3>
                    <p className="text-neutral-600 mb-6 text-sm md:text-base">
                      {orders.length === 0 
                        ? 'Ready to experience Pearl Clean? Book your first service today!'
                        : `No orders found with "${statusFilter}" status. Try a different filter.`
                      }
                    </p>
                    {orders.length === 0 && (
                      <button
                        onClick={() => navigate('/booking')}
                        className="ios-button px-6 py-3 text-base font-semibold"
                      >
                        Book Your First Service
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Summary Section */}
              {orders.length > 0 && (
                <div className="mt-12 pearl-card">
                  <h2 className="text-xl font-semibold text-neutral-800 mb-4">Order Summary</h2>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                    {filterOptions.slice(1).map((option) => {
                      const count = getStatusCount(option.key)
                      return (
                        <div key={option.key} className="p-3 bg-accent-pearl rounded-lg">
                          <div className="text-2xl font-bold text-primary">{count}</div>
                          <div className="text-sm text-neutral-600">{option.label}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default MyOrdersPage