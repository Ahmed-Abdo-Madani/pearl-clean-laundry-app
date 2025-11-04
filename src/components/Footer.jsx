import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Footer = ({ className = '' }) => {
  const { t } = useTranslation()

  return (
    <footer className={`bg-white border-t border-neutral-200 ${className}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-gradient-pearl mb-4">{t('common.brandName')}</h3>
            <p className="text-neutral-600 mb-4">
              {t('footer.description')}
            </p>
            <p className="text-sm text-neutral-500">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-neutral-800 mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-neutral-600 hover:text-primary transition-colors duration-200">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-neutral-600 hover:text-primary transition-colors duration-200">
                  {t('nav.bookNow')}
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-neutral-600 hover:text-primary transition-colors duration-200">
                  {t('nav.trackOrder')}
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-neutral-600 hover:text-primary transition-colors duration-200">
                  {t('nav.myOrders')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-neutral-800 mb-4">{t('footer.contactUs')}</h4>
            <div className="space-y-2 text-neutral-600">
              <p className="flex items-center">
                <span className="mr-2">📞</span>
                <span className="mr-1">{t('footer.phone')}:</span>
                (555) 123-PEARL
              </p>
              <p className="flex items-center">
                <span className="mr-2">✉️</span>
                <span className="mr-1">{t('footer.email')}:</span>
                hello@pearlclean.com
              </p>
              <p className="flex items-center">
                <span className="mr-2">📍</span>
                <span className="mr-1">{t('footer.address')}:</span>
                123 Rose Avenue, Pearl District
              </p>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-neutral-800 mb-3">{t('footer.followUs')}</h5>
              <div className="flex space-x-4">
                <a href="#" className="text-primary hover:text-primary-dark transition-colors duration-200">
                  <span className="text-xl">📷</span>
                </a>
                <a href="#" className="text-primary hover:text-primary-dark transition-colors duration-200">
                  <span className="text-xl">📘</span>
                </a>
                <a href="#" className="text-primary hover:text-primary-dark transition-colors duration-200">
                  <span className="text-xl">🐦</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-neutral-200">
          <p className="text-center text-neutral-500 text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer