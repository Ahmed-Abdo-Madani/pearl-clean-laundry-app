import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher.jsx'

const MobileHeader = () => {
  const { t } = useTranslation()

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 pt-safe md:hidden">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left - Empty or back button for sub-pages */}
        <div className="w-10"></div>
        
        {/* Center - Pearl Clean branding */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/Pearl-clean-logo-icon.svg" alt="Pearl Clean Logo" className="h-8 w-8" />
          <img src="/Pearl-clean-logo-letters.svg" alt="Pearl Clean" className="h-6" />
        </Link>
        
        {/* Right - Language Switcher */}
        <div className="w-10 flex justify-end">
          <LanguageSwitcher variant="compact" />
        </div>
      </div>
    </header>
  )
}

export default MobileHeader