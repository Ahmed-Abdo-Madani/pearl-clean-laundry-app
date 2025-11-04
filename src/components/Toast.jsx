import React, { useEffect } from 'react';

const Toast = ({ message, type = 'info', isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-orange-500 text-white';
      case 'info':
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 md:top-4 md:right-4 md:left-auto md:translate-x-0 z-50 animate-slideInRight mx-4 md:mx-0">
      <div className={`
        ${getTypeStyles()}
        px-4 md:px-6 py-3 md:py-4 rounded-xl shadow-lg max-w-xs md:max-w-sm w-full
        flex items-center space-x-2 md:space-x-3
        transform transition-all duration-300 ease-in-out
        backdrop-blur-sm bg-opacity-95
      `}>
        <span className="text-base md:text-lg">{getIcon()}</span>
        <p className="flex-1 text-sm md:text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 text-lg md:text-xl font-bold ml-2 flex-shrink-0 w-6 h-6 flex items-center justify-center"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;