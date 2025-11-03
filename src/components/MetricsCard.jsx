import React from 'react';

const MetricsCard = ({ title, value, icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary text-white',
    purple: 'bg-purple-600 text-white',
    pearl: 'bg-pearl-400 text-gray-800',
    green: 'bg-green-500 text-white',
    blue: 'bg-blue-500 text-white',
    orange: 'bg-orange-500 text-white'
  };

  const iconBgClass = colorClasses[color] || colorClasses.primary;

  return (
    <div className="pearl-card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center space-x-4">
        {/* Icon Section */}
        <div className={`w-12 h-12 rounded-full ${iconBgClass} flex items-center justify-center text-xl`}>
          {icon}
        </div>
        
        {/* Content Section */}
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-2xl font-bold text-primary">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;