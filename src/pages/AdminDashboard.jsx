import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import MetricsCard from '../components/MetricsCard.jsx';
import OrdersTable from '../components/OrdersTable.jsx';
import CustomerDetailsModal from '../components/CustomerDetailsModal.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { getOrders, updateOrderStatus } from '../services/api.js';
import { useToast } from '../hooks/useToast.js';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { showSuccess, showError } = useToast();
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [metrics, setMetrics] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  });
  const [error, setError] = useState('');

  // Check authentication on mount
  useEffect(() => {
    const authToken = localStorage.getItem('adminAuth');
    if (authToken === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch orders when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  // Update filtered orders and metrics when orders or filters change
  useEffect(() => {
    filterOrders();
    calculateMetrics();
  }, [orders, statusFilter, dateFilter]);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const ordersData = await getOrders();
      setOrders(ordersData);
    } catch (err) {
      setError('Failed to fetch orders. Please try again.');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateMetrics = () => {
    const total = orders.length;
    const pending = orders.filter(order => order.status === 'scheduled').length;
    const inProgress = orders.filter(order => order.status === 'in-progress').length;
    const completed = orders.filter(order => order.status === 'delivered').length;

    setMetrics({ total, pending, inProgress, completed });
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Date filter
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const endOfToday = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    if (dateFilter === 'today') {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.pickupDate);
        return orderDate >= today && orderDate < tomorrow;
      });
    } else if (dateFilter === 'week') {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.pickupDate);
        return orderDate >= weekAgo && orderDate <= endOfToday;
      });
    } else if (dateFilter === 'month') {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.pickupDate);
        return orderDate >= monthAgo && orderDate <= endOfToday;
      });
    }

    setFilteredOrders(filtered);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    showSuccess('Welcome to Pearl Clean Admin Dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setOrders([]);
    setFilteredOrders([]);
    setSelectedCustomer(null);
    setShowCustomerModal(false);
    showSuccess('Logged out successfully');
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      showSuccess('Order status updated successfully');
      await fetchOrders(); // Refresh orders
    } catch (err) {
      showError('Failed to update order status. Please try again.');
      console.error('Error updating order status:', err);
    }
  };

  const handleViewCustomer = (order) => {
    // Find all orders for this customer
    const customerOrders = orders.filter(o => o.customerName === order.customerName);
    setSelectedCustomer(order);
    setShowCustomerModal(true);
  };

  const handleCloseCustomerModal = () => {
    setShowCustomerModal(false);
    setSelectedCustomer(null);
  };

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  const statusFilterOptions = [
    { value: 'all', label: 'All' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'picked-up', label: 'Picked Up' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'ready', label: 'Ready' },
    { value: 'delivered', label: 'Delivered' }
  ];

  const dateFilterOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pearl-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-primary">Pearl Clean</h1>
              <p className="text-gray-600">Admin Dashboard</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-purple-600 hover:text-purple-800 font-medium border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Metrics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricsCard
            title="Total Orders"
            value={metrics.total}
            icon="📊"
            color="primary"
          />
          <MetricsCard
            title="Pending Pickups"
            value={metrics.pending}
            icon="📅"
            color="orange"
          />
          <MetricsCard
            title="In Progress"
            value={metrics.inProgress}
            icon="🧺"
            color="purple"
          />
          <MetricsCard
            title="Completed"
            value={metrics.completed}
            icon="✅"
            color="green"
          />
        </div>

        {/* Filters Section */}
        <div className="pearl-card mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="flex flex-wrap gap-2">
                {statusFilterOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setStatusFilter(option.value)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      statusFilter === option.value
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <div className="flex flex-wrap gap-2">
                {dateFilterOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setDateFilter(option.value)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      dateFilter === option.value
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Orders ({filteredOrders.length})
            </h2>
            {loading && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-500">Loading...</span>
              </div>
            )}
          </div>

          <OrdersTable
            orders={filteredOrders}
            onStatusUpdate={handleStatusUpdate}
            onViewCustomer={handleViewCustomer}
          />
        </div>
      </div>

      {/* Customer Details Modal */}
      <CustomerDetailsModal
        isOpen={showCustomerModal}
        onClose={handleCloseCustomerModal}
        customer={selectedCustomer}
        customerOrders={selectedCustomer ? orders.filter(o => o.customerName === selectedCustomer.customerName) : []}
      />
    </div>
  );
};

export default AdminDashboard;