# 🌾 AgriSmart - AI Powered Farmer Super Platform

AgriSmart is a comprehensive, modern web application designed to provide a complete digital farming ecosystem that supports farmers from crop selection to selling. Built with React.js, it leverages AI and real-time data to help farmers make better decisions and increase profitability.

## ✨ Features

### 🌱 Core Features
- **AI-Based Crop Recommendation**: Suggests optimal crops based on soil type, location, season, and real-time weather data
- **Weather Monitoring System**: Real-time weather data, forecasts, and intelligent alerts
- **AI-Powered Disease Detection**: Image-based crop disease identification and treatment recommendations
- **Smart Irrigation Module**: AI-optimized water usage and irrigation scheduling
- **Expense Tracker**: Comprehensive farming cost monitoring and profitability analysis
- **Farmer Marketplace**: Direct buy-sell platform connecting farmers without intermediaries
- **Government Schemes**: Information and application guidance for PM-KISAN, PMFBY, Soil Health Card, KCC
- **Personalized Crop Advisory**: Real-time suggestions based on crop type, location, and weather
- **AI-Based Voice Assistant**: Voice commands in local languages for better accessibility

### 🎯 User Experience
- **Multilingual Support**: English, Hindi, and Punjabi interfaces
- **Dark Mode**: Eye-friendly dark theme for extended usage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Card-Based UI**: Clean, intuitive interface with organized information
- **Mobile-First**: Fully optimized for mobile devices

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ and npm

### Installation

1. **Navigate to project directory:**
   ```bash
   cd crop-tech
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
crop-tech/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── UI.jsx          # Button, Card, Input, Modal, etc.
│   │   ├── Navigation.jsx  # Main navigation bar
│   │   └── VoiceAssistant.jsx # Voice assistant component
│   ├── context/            # React Context API
│   │   ├── ThemeContext.jsx # Dark mode management
│   │   └── LanguageContext.jsx # Multilingual support
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx
│   │   ├── CropRecommendation.jsx
│   │   ├── WeatherMonitoring.jsx
│   │   ├── DiseaseDetection.jsx
│   │   ├── SmartIrrigation.jsx
│   │   ├── ExpenseTracker.jsx
│   │   ├── Marketplace.jsx
│   │   ├── GovernmentSchemes.jsx
│   │   └── CropAdvisory.jsx
│   ├── utils/              # Utility functions
│   │   ├── apiService.js   # Mock API services
│   │   └── validation.js   # Form validation & localStorage
│   ├── styles/             # CSS files
│   │   ├── global.css      # Global styles
│   │   ├── components.css  # Component styles
│   │   ├── navigation.css  # Navigation styles
│   │   ├── voice-assistant.css
│   │   └── pages/          # Page-specific styles
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Base styles
├── public/                 # Static assets
├── package.json
├── vite.config.js
└── eslint.config.js
```

## 🔧 Key Technologies

- **Frontend Framework**: React.js (Hooks & Context API)
- **Build Tool**: Vite
- **Styling**: Plain CSS with responsive design
- **State Management**: React Context API
- **Data Persistence**: localStorage
- **Voice**: Web Speech API
- **Form Validation**: Custom validation utilities

## 📋 Pages & Features

### Dashboard 📊
- Quick overview of farm statistics
- Recent alerts and activities
- Quick action buttons
- Farming tips and recommendations

### Crop Recommendation 🌾
- AI-based crop suggestions
- Input: Soil type, location, season, temperature, rainfall
- Output: Recommended crops, confidence level, estimated yield

### Weather Monitoring 🌦️
- Real-time weather data
- 7-day forecast
- Weather alerts and farming advice
- Temperature, humidity, rainfall, wind speed monitoring

### Disease Detection 🦠
- Image upload and AI analysis
- Disease identification with confidence level
- Treatment recommendations
- Disease severity assessment

### Smart Irrigation 💧
- Water requirement calculations
- Irrigation scheduling
- Soil moisture monitoring
- Best practices and IoT integration tips

### Expense Tracker 📋
- Expense recording by category
- Profit/loss analysis
- Expense history and filtering
- Financial insights

### Marketplace 🛒
- Browse available products
- Direct farmer-to-farmer transactions
- Shopping cart functionality
- Product search and filtering
- Rating and review system

### Government Schemes 📜
- PM-KISAN details and application
- PMFBY insurance scheme information
- Soil Health Card benefits
- KCC credit card details
- Step-by-step application guidance

### Crop Advisory 🌱
- Personalized recommendations for specific crops
- Critical growth stages
- Best practices and common issues
- Seasonal tips

## 💾 Data Management

### localStorage Usage
- **user**: User profile information
- **expenses**: Expense records
- **darkMode**: Dark mode preference
- **language**: Selected language
- **cart**: Marketplace shopping cart

### Mock API Service
The `apiService.js` provides simulated API endpoints for:
- Crop recommendations
- Weather data
- Disease detection
- Irrigation advice
- Expense management
- Marketplace listings
- Government schemes
- Crop advisory

## 🎨 UI Components

### Available Components
- `Button` - Multiple variants (primary, secondary, danger)
- `Card` - Flexible container for content
- `Input` - Text input with validation
- `Select` - Dropdown selection
- `Loader` - Loading spinner
- `Alert` - Message notifications
- `Modal` - Dialog boxes
- `Badge` - Status indicators
- `Progress` - Progress bars
- `StatsCard` - Statistics display

## 🌐 Multilingual Support

Supported Languages:
- **English** (en)
- **हिन्दी** (hi) - Hindi
- **ਪੰਜਾਬੀ** (pa) - Punjabi

Language preference is saved in localStorage.

## 🎤 Voice Assistant Features

- Record voice commands in local language
- Process and respond to farming queries
- Hands-free navigation (requires Web Speech API support)
- Works in both light and dark modes

## 🌙 Dark Mode

- Automatic theme switching
- Preference saved in localStorage
- Applies to all pages and components
- Improved readability in low-light conditions

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1024px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## ⚡ Performance Optimizations

- Modular component structure
- Efficient re-renders with React
- CSS optimization for responsive design
- localStorage caching
- Mock API with realistic delays

## 🔐 Features Under Development

These features use mock data but can be integrated with real APIs:
- Real weather data integration
- Actual disease detection AI model
- Real marketplace backend
- Government scheme API integration
- User authentication system
- Payment gateway integration

## 📝 Form Validation

Validation includes:
- Email validation
- Phone number (10 digits)
- Required field checking
- Password strength validation
- Custom field validation

## 🛠️ Customization

### Adding New Features
1. Create new page component in `src/pages/`
2. Add route in `App.jsx`
3. Create corresponding CSS in `src/styles/pages/`
4. Add API service in `utils/apiService.js`

### Theming
Modify CSS variables in `src/styles/global.css`:
```css
:root {
  --primary: #2ecc71;    /* Primary green */
  --secondary: #3498db;  /* Secondary blue */
  --danger: #e74c3c;     /* Error red */
  --warning: #f39c12;    /* Warning orange */
}
```

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

## 👨‍🌾 Use Cases

- **Individual Farmers**: Complete farm management tool
- **Agricultural Cooperatives**: Marketplace for member products
- **Agricultural Extension Offices**: Advisory and scheme information
- **Agribusiness Companies**: Farmer engagement platform

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is open-source and available under the MIT License.

## 🙏 Support

For support, please create an issue in the repository.

## 👥 Team

AgriSmart is built to solve real-world challenges in Indian agriculture:
- ❌ Wrong crop selection
- ❌ Weather uncertainty
- ❌ Late disease detection
- ❌ Water wastage
- ❌ Profit reduction due to middlemen
- ❌ Lack of financial tracking

**Our Mission**: Empowering farmers with technology to decide better, grow smarter, and earn more.

---

**Let farmers grow smarter and earn more with AgriSmart! 🌾✨**

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
