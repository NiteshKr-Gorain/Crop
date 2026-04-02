import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Card, StatsCard, Loader, Alert } from '../components/UI';
import { apiService } from '../utils/apiService';
import '../styles/pages/dashboard.css';

export const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching dashboard data
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem('user') || '{"name": "Farmer", "farm_size": "5 acres"}');
      setStats({
        totalExpenses: 28000,
        totalRevenue: 120000,
        cropCount: 3,
        activeAlerts: 2,
        farmerName: user.name,
        farmSize: user.farm_size
      });
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className={`dashboard ${isDarkMode ? 'dark' : ''}`}>
      <div className="dashboard-header">
        <h1>{t('welcome')}, {stats?.farmerName}! 👋</h1>
        <p>{t('farmSize')}: {stats?.farmSize}</p>
      </div>

      <div className="stats-grid">
        <StatsCard 
          icon="📊"
          label={t('totalExpenses')} 
          value={`₹${stats?.totalExpenses}`}
          color="#e74c3c"
        />
        <StatsCard 
          icon="💰"
          label={t('totalRevenue')} 
          value={`₹${stats?.totalRevenue}`}
          color="#2ecc71"
        />
        <StatsCard 
          icon="🌾"
          label={t('activeCrops')} 
          value={stats?.cropCount}
          color="#3498db"
        />
        <StatsCard 
          icon="⚠️"
          label={t('activeAlerts')} 
          value={stats?.activeAlerts}
          color="#f39c12"
        />
      </div>

      <div className="dashboard-content">
        <Card className="quick-actions">
          <h2>{t('quickActions')}</h2>
          <div className="actions-grid">
            <div className="action-item">
              <span className="action-icon">🌾</span>
              <p>{t('getCropRecommendation')}</p>
            </div>
            <div className="action-item">
              <span className="action-icon">🌦️</span>
              <p>{t('checkWeather')}</p>
            </div>
            <div className="action-item">
              <span className="action-icon">🦠</span>
              <p>{t('detectDisease')}</p>
            </div>
            <div className="action-item">
              <span className="action-icon">💧</span>
              <p>{t('getAdvice')}</p>
            </div>
            <div className="action-item">
              <span className="action-icon">📋</span>
              <p>{t('trackExpenses')}</p>
            </div>
            <div className="action-item">
              <span className="action-icon">🛒</span>
              <p>{t('marketplace')}</p>
            </div>
          </div>
        </Card>

        <Card className="recent-activity">
          <h2>📢 Recent Alerts</h2>
          <div className="activity-list">
            <div className="activity-item warning">
              <span className="badge">⚠️</span>
              <div>
                <p>High temperature predicted for next 3 days</p>
                <small>Today at 10:30 AM</small>
              </div>
            </div>
            <div className="activity-item info">
              <span className="badge">ℹ️</span>
              <div>
                <p>Your field moisture is optimal</p>
                <small>Today at 8:15 AM</small>
              </div>
            </div>
            <div className="activity-item success">
              <span className="badge">✓</span>
              <div>
                <p>Expense recorded successfully</p>
                <small>Yesterday at 3:45 PM</small>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="tips-section">
        <h2>💡 Farming Tips</h2>
        <ul>
          <li>Always water your crops during early morning or evening</li>
          <li>Rotate crops annually to maintain soil health</li>
          <li>Monitor weather forecasts regularly</li>
          <li>Keep records of all expenses for profit tracking</li>
          <li>Use high-quality seeds for better yield</li>
        </ul>
      </Card>
    </div>
  );
};
