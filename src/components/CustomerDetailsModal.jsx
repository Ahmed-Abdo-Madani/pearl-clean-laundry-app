import React, { useEffect } from 'react';

const CustomerDetailsModal = ({ isOpen, onClose, customer, customerOrders }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !customer) return null;

  const totalSpent = customerOrders.reduce((sum, order) => sum + parseFloat(order.totalPrice || 0), 0);
  const sorted = [...customerOrders].sort((a, b) => new Date(b.pickupDate) - new Date(a.pickupDate));
  const mostRecentOrder = sorted[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div 
        className="pearl-card max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Customer Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-gray-500">👤</span>
              <span className="font-medium text-gray-900">{customer.customerName}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gray-500">📞</span>
              <span className="text-gray-700">{customer.customerPhone}</span>
            </div>
            {customer.email && (
              <div className="flex items-center space-x-3">
                <span className="text-gray-500">✉️</span>
                <span className="text-gray-700">{customer.email}</span>
              </div>
            )}
            <div className="flex items-start space-x-3">
              <span className="text-gray-500">📍</span>
              <span className="text-gray-700">{customer.address}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-6" />

        {/* Order Statistics */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Customer Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-purple-800">{customerOrders.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Total Spent</p>
              <p className="text-2xl font-bold text-green-800">${totalSpent.toFixed(2)}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Last Order</p>
              <p className="text-lg font-bold text-blue-800">
                {mostRecentOrder ? new Date(mostRecentOrder.pickupDate).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">Order History</h3>
          {customerOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No orders found for this customer.</p>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {customerOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">Order #{order.id}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'ready' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'picked-up' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status?.charAt(0).toUpperCase() + order.status?.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Date:</span> {new Date(order.pickupDate).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Items:</span> {order.services?.length || 0}
                    </div>
                    <div>
                      <span className="font-medium">Total:</span> ${order.totalPrice}
                    </div>
                  </div>
                  {order.services && order.services.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Services:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {order.services.map((item, index) => (
                          <span key={index} className="text-xs bg-white px-2 py-1 rounded border">
                            {item.serviceName} ({item.quantity})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Close Button */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="pearl-button w-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;