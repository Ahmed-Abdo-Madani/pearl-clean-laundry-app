# Pearl Clean - Women's Laundry Service App

A modern, elegant laundry service application designed specifically for women, offering premium pickup and delivery services with a beautiful, feminine interface. Now featuring full bilingual support for English and Arabic with RTL layout.

## About

Pearl Clean is a comprehensive mockup application built to demonstrate a complete women-only laundry service platform. The app features a clean, modern design with a pink and purple color palette that appeals to our target demographic while maintaining professionalism and elegance. 

**🌍 New in Latest Version: Full Internationalization (i18n) support with English and Arabic languages, including proper RTL (Right-to-Left) layout for Arabic users.**

## Features (Current Version)

- 🌸 **Elegant Design**: Feminine color palette with pink, purple, and pearl tones
- 🌍 **Bilingual Support**: Full English and Arabic translations with RTL layout
- 📱 **Responsive Interface**: Mobile-first design using Tailwind CSS
- 🚀 **Fast Development**: Built with Vite for lightning-fast development experience
- 🛍️ **Service Catalog**: Browse available laundry services with pricing in multiple languages
- 📋 **Order Management**: Place and track laundry orders with localized content
- 👥 **Customer Profiles**: Manage customer information and preferences
- 🔧 **Admin Dashboard**: Administrative interface for order management
- 🔄 **Language Switching**: Easy language toggle with persistent preferences
- 📍 **RTL Support**: Proper right-to-left layout for Arabic users

## Tech Stack

- **Frontend**: React 18 with modern hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom feminine theme and RTL support
- **Routing**: React Router DOM for client-side navigation
- **Internationalization**: i18next ecosystem (i18next, react-i18next, i18next-browser-languagedetector)
- **Mock API**: JSON Server for development and testing
- **Development**: Hot Module Replacement (HMR) enabled

## 🌍 Internationalization (i18n) Features

### Languages Supported
- **English (en)**: Default language with complete translations
- **Arabic (ar)**: Full Arabic translations with RTL layout support

### i18n Implementation Details

**Core Dependencies:**
- `i18next ^23.7.0` - Core internationalization framework
- `react-i18next ^13.5.0` - React integration for i18next
- `i18next-browser-languagedetector ^7.2.0` - Automatic language detection

**Key Features:**
- **Automatic Language Detection**: Browser language preference detection
- **Persistent Language Selection**: User choice stored in localStorage
- **RTL Layout Support**: Complete right-to-left layout for Arabic
- **Namespaced Translations**: Organized translation keys by feature area
- **Fallback System**: Graceful fallback to English for missing translations
- **Dynamic Content**: Service names, descriptions, and durations in both languages

### Language Configuration

The i18n system is configured in `src/i18n/config.js` with:
- Language detection from browser, localStorage, or fallback to English
- Resource loading from translation files
- React integration with proper interpolation

### Translation Structure

Translation files are located in `src/i18n/locales/`:
```
src/i18n/locales/
├── en.json          # English translations
└── ar.json          # Arabic translations
```

**Translation namespace structure:**
- `common.*` - Shared terms (brand name, loading states, buttons)
- `nav.*` - Navigation menu items
- `footer.*` - Footer content and links
- `home.*` - Homepage content and features
- `services.*` - Service catalog page
- `booking.*` - Booking form and confirmation
- `tracking.*` - Order tracking page
- `orders.*` - Order management
- `admin.*` - Admin dashboard
- `status.*` - Order status terminology

### RTL Support

**CSS Implementation:**
- Custom RTL styles in `src/index.css`
- Automatic direction switching (`dir="rtl"` vs `dir="ltr"`)
- RTL-specific margin, padding, and spacing adjustments
- Flexbox direction reversal for proper layout
- Arabic font family support (Noto Sans Arabic, Tajawal)

**Component Support:**
- Language detection in components
- Dynamic text direction
- RTL-aware spacing and alignment
- Proper icon and button positioning

### Usage Examples

**Basic Translation:**
```jsx
import { useTranslation } from 'react-i18next'

const MyComponent = () => {
  const { t } = useTranslation()
  
  return (
    <h1>{t('common.brandName')}</h1>
    <p>{t('home.description')}</p>
  )
}
```

**Language Detection & RTL:**
```jsx
import { useTranslation } from 'react-i18next'

const MyComponent = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  
  return (
    <div className={isRTL ? 'text-right' : 'text-left'}>
      {t('services.title')}
    </div>
  )
}
```

**Service Data Localization:**
```jsx
const isRTL = i18n.language === 'ar'
const serviceName = isRTL ? service.nameAr || service.name : service.name
const serviceDescription = isRTL ? service.descriptionAr || service.description : service.description
```

### Language Switcher Component

Located at `src/components/LanguageSwitcher.jsx`:
- Dropdown interface with language flags
- Persistent language selection
- Integrated into navigation bar
- Accessible keyboard navigation
- Mobile-responsive design

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ahmed-Abdo-Madani/pearl-clean-laundry-app.git
   cd "Women laundry"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   The project includes a `.env` file with the following variable:
   ```
   VITE_API_BASE_URL=http://localhost:3001
   ```
   You can modify this URL to point to a different API endpoint if needed.

## Quick Start for Demo

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start JSON Server** (in first terminal):
   ```bash
   npm run server
   ```

3. **Start Vite dev server** (in second terminal):
   ```bash
   npm run dev
   ```

4. **Access the application**:
   - Main app: `http://localhost:5173`
   - API endpoints: `http://localhost:3001`
   - Test language switching using the language selector in the navigation

## Development

1. **Start the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

2. **Start the JSON Server** (in a separate terminal):
   ```bash
   npm run server
   ```
   The mock API will be available at `http://localhost:3001`

3. **Access the application**:
   - Main app: `http://localhost:5173`
   - API endpoints: `http://localhost:3001`

### i18n Development

**Adding New Translations:**
1. Add translation keys to both `src/i18n/locales/en.json` and `src/i18n/locales/ar.json`
2. Use the `useTranslation` hook in components: `const { t } = useTranslation()`
3. Call translations with: `t('namespace.key')`

**Testing Languages:**
- Use the language switcher in the navigation
- Or set browser language preferences
- Check localStorage for persistence: `localStorage.getItem('i18nextLng')`

**RTL Testing:**
- Switch to Arabic and verify layout flips properly
- Check margin/padding adjustments
- Ensure text alignment is correct
- Verify icons and buttons maintain proper positioning

## Deployment with Ngrok

For investor demos or sharing with stakeholders, use ngrok to expose your local application:

1. **Install ngrok globally**:
   ```bash
   npm install -g ngrok
   ```
   Or download from [ngrok.com](https://ngrok.com)

2. **Authenticate ngrok** (get auth token from ngrok dashboard):
   ```bash
   ngrok config add-authtoken YOUR_AUTHTOKEN
   ```

3. **Start the application** (both servers):
   ```bash
   # Terminal 1 - JSON Server
   npm run server
   
   # Terminal 2 - Vite dev server
   npm run dev
   ```

4. **Setup environment configuration**:
   ```bash
   # Copy environment template
   cp .env.example .env
   ```

5. **Tunnel the API** (in third terminal):
   ```bash
   npx ngrok http 3001
   ```
   Copy the HTTPS forwarding URL (e.g., `https://api123.ngrok.io`)

6. **Tunnel the frontend** (in fourth terminal):
   ```bash
   npx ngrok http 5173
   ```
   Copy the HTTPS forwarding URL (e.g., `https://app456.ngrok.io`)

7. **Update environment variables**:
   Edit `.env` file and set:
   ```
   VITE_API_BASE_URL=https://api123.ngrok.io
   ```
   Replace with your actual API ngrok URL from step 5.

8. **Restart Vite server**:
   Stop the dev server (Ctrl+C) and restart:
   ```bash
   npm run dev
   ```

9. **Share the frontend URL**:
   Share the frontend ngrok URL from step 6 with investors

### Important Ngrok Notes:
- Free tier has session limits and URLs change on restart
- Both API and frontend need separate tunnels for remote access
- Must update VITE_API_BASE_URL when API tunnel URL changes
- For production deployment, consider updating `VITE_API_BASE_URL` if needed
- CORS is handled automatically in development mode

## Demo Credentials

For testing the admin dashboard:
- **Username**: admin
- **Password**: pearl123

### Sample Data for Demo:
- **Order IDs for tracking**: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
- **Customer phone numbers**: +1-555-0123, +1-555-0124, +1-555-0125, +1-555-0126, +1-555-0128, +1-555-0129
- **Note**: All dates updated to 2025 for current demo relevance

### i18n Demo Features:
- **Language Switching**: Use the language selector in the navigation bar
- **RTL Layout**: Switch to Arabic to see complete right-to-left layout
- **Localized Services**: Service names and descriptions in both languages
- **Persistent Preferences**: Language choice persists across browser sessions

## Troubleshooting

### Common Issues:

1. **Port already in use**:
   ```bash
   # Kill process using port 5173 or 3001
   lsof -ti:5173 | xargs kill -9
   lsof -ti:3001 | xargs kill -9
   ```

2. **JSON Server not responding**:
   - Check if running on port 3001: `http://localhost:3001/orders`
   - Restart: `npm run server`

3. **CORS errors with ngrok**:
   - Ensure both frontend and backend are accessible
   - Check `VITE_API_BASE_URL` configuration

4. **Ngrok tunnel expired**:
   - Restart ngrok: `npx ngrok http 5173`
   - Free tier tunnels expire after 2 hours

5. **i18n Issues**:
   - **Missing translations**: Check browser console for i18next warnings
   - **Language not switching**: Clear localStorage and refresh browser
   - **RTL not working**: Verify CSS classes are applied to `<body>` and `<html>`
   - **Translation files not loading**: Check network tab for 404 errors

## Responsive Design Testing

Test the application across different device sizes:

### Target Breakpoints:
- **Mobile**: 375px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+

### Browser Testing:
- Chrome (primary)
- Firefox
- Safari
- Edge

### Key Responsive Features:
- Navigation converts to hamburger menu on mobile
- Service cards stack in single column on mobile
- Order table converts to card layout on mobile
- Forms have touch-friendly input sizes (44x44px minimum)
- Modals are properly centered and scrollable
- Language switcher adapts to mobile layout
- RTL layout maintains responsiveness

## Features Showcase for Investors

### Customer Journey:
1. **Browse Services**: Elegant service catalog with pricing in multiple languages
2. **Book Service**: Multi-step booking form with validation and localization
3. **Track Orders**: Real-time status tracking with visual timeline
4. **Order History**: Complete order management dashboard
5. **Language Preference**: Seamless switching between English and Arabic

### Admin Features:
1. **Dashboard Metrics**: Total orders, pending, in-progress, completed
2. **Order Management**: Status updates, customer details
3. **Filtering**: By status and date range
4. **Customer Insights**: Order history and spending analytics
5. **Multilingual Interface**: Admin panel supports both languages

### Technical Highlights:
- React 18 with modern hooks
- Responsive design with Tailwind CSS and RTL support
- Comprehensive internationalization with i18next
- Mock API with JSON Server
- Toast notifications for user feedback
- Professional loading states and error handling
- Bilingual service data management

### i18n Technical Features:
- **Automatic Language Detection**: Based on browser preferences
- **Persistent Language Storage**: User preferences saved in localStorage
- **Complete RTL Support**: Proper Arabic layout with CSS transformations
- **Fallback System**: Graceful handling of missing translations
- **Service Data Localization**: Bilingual service names and descriptions
- **Cultural Adaptation**: Appropriate Arabic translations and layouts

## Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run server` - Start JSON Server mock API

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── LanguageSwitcher.jsx  # Language selection component
│   └── ...
├── pages/         # Page components for each route
├── services/      # API service functions
├── data/          # Mock data and JSON Server database
├── i18n/          # Internationalization configuration
│   ├── config.js       # i18next configuration
│   └── locales/        # Translation files
│       ├── en.json     # English translations
│       └── ar.json     # Arabic translations
├── App.jsx        # Main app component with routing and RTL support
├── main.jsx       # React app entry point with i18n initialization
└── index.css      # Global styles, Tailwind configuration, and RTL styles
```

## API Endpoints

The JSON Server provides the following endpoints:

- `GET /services` - Fetch all laundry services (with Arabic translations)
- `GET /orders` - Fetch all orders
- `GET /orders/:id` - Fetch specific order
- `POST /orders` - Create new order
- `PATCH /orders/:id` - Update order status
- `GET /customers` - Fetch all customers

## Roadmap

This is the current version of a comprehensive development plan:

- **Phase 1**: ✅ Project setup, UI components, order management, admin dashboard
- **Phase 2**: ✅ Enhanced user interactions, responsive design, toast notifications  
- **Phase 3**: ✅ Real-time order tracking, visual status timeline, customer dashboard
- **Phase 4**: ✅ Admin authentication, metrics dashboard, data filtering
- **Phase 5**: ✅ **Internationalization & RTL Support** - Complete bilingual implementation with English/Arabic support, RTL layout, localized content, and cultural adaptation

**Future Enhancements:**
- Additional language support (French, Spanish)
- Advanced RTL components and layouts
- Cultural date/time formatting
- Currency localization
- Advanced admin analytics with multilingual reports

## Contributing

This is a comprehensive mockup project for demonstration purposes. The i18n implementation serves as a complete reference for:

- Setting up React applications with i18next
- Implementing RTL layouts with Tailwind CSS
- Managing bilingual content and service data
- Creating accessible language switching interfaces
- Handling cultural adaptations in UI/UX

For any questions or suggestions regarding the internationalization implementation, please refer to the detailed code examples in the source files.

## License

This project is for demonstration purposes only.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd "Women laundry"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   The project includes a `.env` file with the following variable:
   ```
   VITE_API_BASE_URL=http://localhost:3001
   ```
   You can modify this URL to point to a different API endpoint if needed.

## Quick Start for Demo

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start JSON Server** (in first terminal):
   ```bash
   npm run server
   ```

3. **Start Vite dev server** (in second terminal):
   ```bash
   npm run dev
   ```

4. **Access the application**:
   - Main app: `http://localhost:5173`
   - API endpoints: `http://localhost:3001`

## Development

1. **Start the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

2. **Start the JSON Server** (in a separate terminal):
   ```bash
   npm run server
   ```
   The mock API will be available at `http://localhost:3001`

3. **Access the application**:
   - Main app: `http://localhost:5173`
   - API endpoints: `http://localhost:3001`

## Deployment with Ngrok

For investor demos or sharing with stakeholders, use ngrok to expose your local application:

1. **Install ngrok globally**:
   ```bash
   npm install -g ngrok
   ```
   Or download from [ngrok.com](https://ngrok.com)

2. **Authenticate ngrok** (get auth token from ngrok dashboard):
   ```bash
   ngrok config add-authtoken YOUR_AUTHTOKEN
   ```

3. **Start the application** (both servers):
   ```bash
   # Terminal 1 - JSON Server
   npm run server
   
   # Terminal 2 - Vite dev server
   npm run dev
   ```

4. **Setup environment configuration**:
   ```bash
   # Copy environment template
   cp .env.example .env
   ```

5. **Tunnel the API** (in third terminal):
   ```bash
   npx ngrok http 3001
   ```
   Copy the HTTPS forwarding URL (e.g., `https://api123.ngrok.io`)

6. **Tunnel the frontend** (in fourth terminal):
   ```bash
   npx ngrok http 5173
   ```
   Copy the HTTPS forwarding URL (e.g., `https://app456.ngrok.io`)

7. **Update environment variables**:
   Edit `.env` file and set:
   ```
   VITE_API_BASE_URL=https://api123.ngrok.io
   ```
   Replace with your actual API ngrok URL from step 5.

8. **Restart Vite server**:
   Stop the dev server (Ctrl+C) and restart:
   ```bash
   npm run dev
   ```

9. **Share the frontend URL**:
   Share the frontend ngrok URL from step 6 with investors

### Important Ngrok Notes:
- Free tier has session limits and URLs change on restart
- Both API and frontend need separate tunnels for remote access
- Must update VITE_API_BASE_URL when API tunnel URL changes
- For production deployment, consider updating `VITE_API_BASE_URL` if needed
- CORS is handled automatically in development mode

## Demo Credentials

For testing the admin dashboard:
- **Username**: admin
- **Password**: pearl123

### Sample Data for Demo:
- **Order IDs for tracking**: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
- **Customer phone numbers**: +1-555-0123, +1-555-0124, +1-555-0125, +1-555-0126, +1-555-0128, +1-555-0129
- **Note**: All dates updated to 2025 for current demo relevance

## Troubleshooting

### Common Issues:

1. **Port already in use**:
   ```bash
   # Kill process using port 5173 or 3001
   lsof -ti:5173 | xargs kill -9
   lsof -ti:3001 | xargs kill -9
   ```

2. **JSON Server not responding**:
   - Check if running on port 3001: `http://localhost:3001/orders`
   - Restart: `npm run server`

3. **CORS errors with ngrok**:
   - Ensure both frontend and backend are accessible
   - Check `VITE_API_BASE_URL` configuration

4. **Ngrok tunnel expired**:
   - Restart ngrok: `npx ngrok http 5173`
   - Free tier tunnels expire after 2 hours

## Responsive Design Testing

Test the application across different device sizes:

### Target Breakpoints:
- **Mobile**: 375px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+

### Browser Testing:
- Chrome (primary)
- Firefox
- Safari
- Edge

### Key Responsive Features:
- Navigation converts to hamburger menu on mobile
- Service cards stack in single column on mobile
- Order table converts to card layout on mobile
- Forms have touch-friendly input sizes (44x44px minimum)
- Modals are properly centered and scrollable

## Features Showcase for Investors

### Customer Journey:
1. **Browse Services**: Elegant service catalog with pricing
2. **Book Service**: Multi-step booking form with validation
3. **Track Orders**: Real-time status tracking with visual timeline
4. **Order History**: Complete order management dashboard

### Admin Features:
1. **Dashboard Metrics**: Total orders, pending, in-progress, completed
2. **Order Management**: Status updates, customer details
3. **Filtering**: By status and date range
4. **Customer Insights**: Order history and spending analytics

### Technical Highlights:
- React 18 with modern hooks
- Responsive design with Tailwind CSS
- Mock API with JSON Server
- Toast notifications for user feedback
- Professional loading states and error handling

## Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run server` - Start JSON Server mock API

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components for each route
├── services/      # API service functions
├── data/          # Mock data and JSON Server database
├── App.jsx        # Main app component with routing
├── main.jsx       # React app entry point
└── index.css      # Global styles and Tailwind configuration
```

## API Endpoints

The JSON Server provides the following endpoints:

- `GET /services` - Fetch all laundry services
- `GET /orders` - Fetch all orders
- `GET /orders/:id` - Fetch specific order
- `POST /orders` - Create new order
- `PATCH /orders/:id` - Update order status
- `GET /customers` - Fetch all customers

## Roadmap

This is Phase 1 of a 5-phase development plan:

- **Phase 1**: ✅ Project setup, UI components, order management, admin dashboard
- **Phase 2**: ✅ Enhanced user interactions, responsive design, toast notifications  
- **Phase 3**: ✅ Real-time order tracking, visual status timeline, customer dashboard
- **Phase 4**: ✅ Admin authentication, metrics dashboard, data filtering
- **Phase 5**: 🔄 Deployment optimization, performance enhancements, production ready

## Contributing

This is a mockup project for demonstration purposes. For any questions or suggestions, please refer to the project documentation.

## License

This project is for demonstration purposes only.