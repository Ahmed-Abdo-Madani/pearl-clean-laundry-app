import React, { createContext, useState, useContext } from 'react';
import Toast from '../components/Toast.jsx';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toastConfig, setToastConfig] = useState({
    message: '',
    type: 'info',
    isVisible: false,
    duration: 3000
  });

  const showToast = (message, type = 'info', duration = 3000) => {
    setToastConfig({
      message,
      type,
      isVisible: true,
      duration
    });
  };

  const hideToast = () => {
    setToastConfig(prev => ({
      ...prev,
      isVisible: false
    }));
  };

  const contextValue = {
    toastConfig,
    showToast,
    hideToast
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toast
        message={toastConfig.message}
        type={toastConfig.type}
        isVisible={toastConfig.isVisible}
        onClose={hideToast}
        duration={toastConfig.duration}
      />
    </ToastContext.Provider>
  );
};

export { ToastContext };