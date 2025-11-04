import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LoginForm = ({ onLoginSuccess }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock authentication logic
    if (username === 'admin' && password === 'pearl123') {
      localStorage.setItem('adminAuth', 'true');
      onLoginSuccess();
    } else {
      setError(t('admin.invalidCredentials'));
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pearl-50 flex items-center justify-center p-4">
      <div className="pearl-card w-full max-w-md">
        {/* Pearl Clean Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Pearl Clean</h1>
          <p className="text-purple-600 text-sm">{t('admin.dashboard')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              {t('admin.username')}
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pearl-input"
              placeholder={t('admin.enterUsername')}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              {t('admin.password')}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pearl-input"
              placeholder={t('admin.enterPassword')}
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="pearl-button w-full"
          >
            {loading ? t('admin.loggingIn') : t('admin.login')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            {t('admin.demoCredentials')}: admin / pearl123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;