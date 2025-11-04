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
          <div className="h-8 w-8 flex items-center justify-center bg-gradient-to-r from-primary to-secondary rounded-full">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="text-gradient-pearl text-lg font-bold">
            Pearl Clean
          </span>
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