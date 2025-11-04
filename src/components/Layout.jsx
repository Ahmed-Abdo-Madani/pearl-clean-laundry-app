import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import MobileHeader from './MobileHeader.jsx'
import BottomNav from './BottomNav.jsx'
import { ToastProvider } from '../contexts/ToastContext.jsx'

const Layout = ({ children }) => {
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-accent-pearl">
        {/* Mobile Header - visible only on mobile */}
        <MobileHeader />
        
        {/* Desktop Navbar - visible only on desktop */}
        <Navbar className="hidden md:block" />
        
        {/* Main Content */}
        <main className="flex-1 pt-14 pb-20 md:pt-0 md:pb-0">
          {children}
        </main>
        
        {/* Mobile Bottom Navigation - visible only on mobile */}
        <BottomNav />
        
        {/* Desktop Footer - visible only on desktop */}
        <Footer className="hidden md:block" />
      </div>
    </ToastProvider>
  )
}

export default Layout