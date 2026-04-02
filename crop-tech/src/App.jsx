import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navigation } from './components/Navigation';
import { VoiceAssistant } from './components/VoiceAssistant';
import { Dashboard } from './pages/Dashboard';
import { CropRecommendation } from './pages/CropRecommendation';
import { WeatherMonitoring } from './pages/WeatherMonitoring';
import { DiseaseDetection } from './pages/DiseaseDetection';
import { SmartIrrigation } from './pages/SmartIrrigation';
import { ExpenseTracker } from './pages/ExpenseTracker';
import { Marketplace } from './pages/Marketplace';
import { GovernmentSchemes } from './pages/GovernmentSchemes';
import { CropAdvisory } from './pages/CropAdvisory';
import { useTheme } from './context/ThemeContext';
import './styles/global.css';

const AppContent = () => {
  const { isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'crop':
        return <CropRecommendation />;
      case 'weather':
        return <WeatherMonitoring />;
      case 'disease':
        return <DiseaseDetection />;
      case 'irrigation':
        return <SmartIrrigation />;
      case 'expenses':
        return <ExpenseTracker />;
      case 'marketplace':
        return <Marketplace />;
      case 'schemes':
        return <GovernmentSchemes />;
      case 'advisory':
        return <CropAdvisory />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : ''}`}>
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="main-content page">
        {renderPage()}
      </main>
      <VoiceAssistant />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;