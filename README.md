# Pearl Clean - Women's Laundry Service App

A modern, elegant laundry service application designed specifically for women, offering premium pickup and delivery services with a beautiful, feminine interface.

## About

Pearl Clean is a Phase 1 mockup application built to demonstrate a complete women-only laundry service platform. The app features a clean, modern design with a pink and purple color palette that appeals to our target demographic while maintaining professionalism and elegance.

## Features (Phase 1)

- 🌸 **Elegant Design**: Feminine color palette with pink, purple, and pearl tones
- 📱 **Responsive Interface**: Mobile-first design using Tailwind CSS
- 🚀 **Fast Development**: Built with Vite for lightning-fast development experience
- 🛍️ **Service Catalog**: Browse available laundry services with pricing
- 📋 **Order Management**: Place and track laundry orders
- 👥 **Customer Profiles**: Manage customer information and preferences
- 🔧 **Admin Dashboard**: Administrative interface for order management

## Tech Stack

- **Frontend**: React 18 with modern hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom feminine theme
- **Routing**: React Router DOM for client-side navigation
- **Mock API**: JSON Server for development and testing
- **Development**: Hot Module Replacement (HMR) enabled

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