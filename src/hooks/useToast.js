import { useContext } from 'react';
import { ToastContext } from '../contexts/ToastContext.jsx';

export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { showToast } = context;

  const showSuccess = (message, duration = 3000) => {
    showToast(message, 'success', duration);
  };

  const showError = (message, duration = 3000) => {
    showToast(message, 'error', duration);
  };

  const showInfo = (message, duration = 3000) => {
    showToast(message, 'info', duration);
  };

  const showWarning = (message, duration = 3000) => {
    showToast(message, 'warning', duration);
  };

  const hideToast = () => {
    context.hideToast();
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    hideToast
  };
};