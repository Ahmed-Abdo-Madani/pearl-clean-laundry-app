import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import OrderCard from '../components/OrderCard.jsx'
import { getOrders } from '../services/api.js'

const MyOrdersPage = () => {
  const navigate = useNavigate()
  
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [error, setError] = useState('')

  const filterOptions = [
    { key: 'all', label: 'All Orders' },
    { key: 'scheduled', label: 'Scheduled' },
    { key: 'picked-up', label: 'Picked Up' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'ready', label: 'Ready' },
    { key: 'delivered', label: 'Delivered' }
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
        setError('Failed to load orders. Please try again later.')
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
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              My Orders
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              View and track all your laundry orders. Click on any order to see detailed progress information.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-neutral-600">Loading your orders...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="pearl-card max-w-md mx-auto bg-red-50 border-red-200">
                <div className="text-4xl mb-4">❌</div>
                <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading Orders</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="pearl-button"
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
              <div className="pearl-card mb-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Filter Orders</h2>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => handleFilterChange(option.key)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        statusFilter === option.key
                          ? 'bg-primary text-white'
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="text-center py-12">
                  <div className="pearl-card max-w-md mx-auto">
                    <div className="text-6xl mb-4">🧺</div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                      {orders.length === 0 ? 'No Orders Yet' : 'No Orders Found'}
                    </h3>
                    <p className="text-neutral-600 mb-6">
                      {orders.length === 0 
                        ? 'Ready to experience Pearl Clean? Book your first service today!'
                        : `No orders found with "${statusFilter}" status. Try a different filter.`
                      }
                    </p>
                    {orders.length === 0 && (
                      <button
                        onClick={() => navigate('/booking')}
                        className="pearl-button"
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