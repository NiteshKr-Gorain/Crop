import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './UI';
import '../styles/navigation.css';

export const Navigation = ({ currentPage, onNavigate }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: t('dashboard') },
    { id: 'crop', label: t('cropRecommendation') },
    { id: 'weather', label: t('weather') },
    { id: 'disease', label: t('disease') },
    { id: 'irrigation', label: t('irrigation') },
    { id: 'expenses', label: t('expenses') },
    { id: 'marketplace', label: t('marketplace') },
    { id: 'schemes', label: t('schemes') },
    { id: 'advisory', label: t('advisory') }
  ];

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>🌾 {t('appName')}</h1>
          <p className="tagline">{t('tagline')}</p>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="nav-items">
            {menuItems.map(item => (
              <button
                key={item.id}
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="navbar-controls">
            <select 
              value={language} 
              onChange={handleLanguageChange}
              className={`language-select ${isDarkMode ? 'dark' : ''}`}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="pa">ਪੰਜਾਬੀ</option>
            </select>

            <button 
              className={`theme-toggle ${isDarkMode ? 'dark' : ''}`}
              onClick={toggleTheme}
              title="Toggle dark mode"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
