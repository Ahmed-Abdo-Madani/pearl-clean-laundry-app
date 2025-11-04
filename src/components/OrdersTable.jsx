import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StatusBadge from './StatusBadge.jsx';

const OrdersTable = ({ orders, onStatusUpdate, onViewCustomer }) => {
  const { t } = useTranslation();
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'pickupDate', direction: 'desc' });

  const statusOptions = [
    'scheduled',
    'picked-up',
    'in-progress',
    'ready',
    'delivered'
  ];

  const handleStatusChange = (orderId, newStatus) => {
    onStatusUpdate(orderId, newStatus);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = React.useMemo(() => {
    let sortableOrders = [...orders];
    if (sortConfig.key) {
      sortableOrders.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'pickupDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else if (sortConfig.key === 'totalPrice') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOrders;
  }, [orders, sortConfig]);

  if (orders.length === 0) {
    return (
      <div className="pearl-card text-center py-8">
        <p className="text-gray-500">{t('admin.noOrdersFound')}</p>
      </div>
    );
  }

  return (
    <div className="pearl-card overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('id')}
              >
                {t('common.orderId')}
                {sortConfig.key === 'id' && (
                  <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('common.customer')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('pickupDate')}
              >
                {t('booking.pickupDate')}
                {sortConfig.key === 'pickupDate' && (
                  <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('common.services')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('totalPrice')}
              >
                {t('common.total')}
                {sortConfig.key === 'totalPrice' && (
                  <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                {t('common.status')}
                {sortConfig.key === 'status' && (
                  <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedOrders.map((order, index) => (
              <tr key={order.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.pickupDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.services?.length || 0} {t('admin.items')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${order.totalPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {t(`status.${status.replace('-', '')}`)}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => onViewCustomer(order)}
                    className="text-purple-600 hover:text-purple-800 font-medium"
                  >
                    {t('admin.viewCustomer')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {sortedOrders.map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">#{order.id}</h3>
              <StatusBadge status={order.status} />
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">{t('common.customer')}:</span> {order.customerName}</p>
              <p><span className="font-medium">{t('booking.pickup')}:</span> {new Date(order.pickupDate).toLocaleDateString()}</p>
              <p><span className="font-medium">{t('admin.items')}:</span> {order.services?.length || 0}</p>
              <p><span className="font-medium">{t('common.total')}:</span> ${order.totalPrice}</p>
            </div>
            <div className="mt-3 flex flex-col space-y-2">
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {t(`status.${status.replace('-', '')}`)}
                  </option>
                ))}
              </select>
              <button
                onClick={() => onViewCustomer(order)}
                className="w-full text-purple-600 hover:text-purple-800 font-medium text-sm py-2 border border-purple-300 rounded hover:bg-purple-50 transition-colors"
              >
                {t('admin.viewCustomer')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTable;