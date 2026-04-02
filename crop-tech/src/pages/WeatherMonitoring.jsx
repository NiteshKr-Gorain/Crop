import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Card, Input, Button, Loader, Alert } from '../components/UI';
import { apiService } from '../utils/apiService';
import '../styles/pages/weather.css';

export const WeatherMonitoring = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchWeather = async (e) => {
    e.preventDefault();
    
    if (!location.trim()) {
      setError(t('pleaseEnterLocation'));
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await apiService.getWeatherData(location);
      if (response.success) {
        setWeather(response.data);
      }
    } catch (err) {
      setError(t('failedToFetchWeather'));
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    switch(condition) {
      case 'Sunny': return '☀️';
      case 'Cloudy': return '☁️';
      case 'Rainy': return '🌧️';
      case 'Partly Cloudy': return '⛅';
      default: return '🌤️';
    }
  };

  return (
    <div className={`weather-monitoring ${isDarkMode ? 'dark' : ''}`}>
      <h1>🌦️ {t('weatherMonitoringSystem')}</h1>
      <p>{t('realtimeWeatherData')}</p>

      <Card className="search-card">
        <form onSubmit={handleFetchWeather}>
          <div className="search-group">
            <Input
              type="text"
              placeholder={t('enterLocation')}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? t('fetching') : t('getWeather')}
            </Button>
          </div>
        </form>
      </Card>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {loading && <Loader message={t('fetching')} />}

      {weather && (
        <div className="weather-content">
          <Card className="current-weather">
            <h2>{t('currentWeather')} - {weather.location}</h2>
            <div className="weather-main">
              <div className="weather-icon">
                {getWeatherIcon(weather.condition)}
              </div>
              <div className="weather-info">
                <p className="temperature">{weather.temperature.toFixed(1)}°C</p>
                <p className="condition">{weather.condition}</p>
              </div>
            </div>

            <div className="weather-details">
              <div className="detail">
                <span>💧 {t('humidity')}</span>
                <strong>{weather.humidity.toFixed(0)}%</strong>
              </div>
              <div className="detail">
                <span>🌧️ {t('precipitation')}</span>
                <strong>{weather.rainfall.toFixed(1)}mm</strong>
              </div>
              <div className="detail">
                <span>💨 {t('windSpeed')}</span>
                <strong>{weather.windSpeed.toFixed(1)} km/h</strong>
              </div>
              <div className="detail">
                <span>☀️ UV Index</span>
                <strong>{weather.uvIndex.toFixed(1)}</strong>
              </div>
            </div>

            <div className="farming-advice">
              <h3>🌾 Farming Advice</h3>
              <ul>
                <li>Humidity is at {weather.humidity.toFixed(0)}% - {weather.humidity > 70 ? 'Monitor for diseases' : 'Good conditions'}</li>
                <li>Rainfall: {weather.rainfall.toFixed(1)}mm - {weather.rainfall > 0 ? 'Check irrigation needs' : 'Plan irrigation'}</li>
                <li>Wind speed is {weather.windSpeed.toFixed(1)} km/h - {weather.windSpeed > 15 ? 'Avoid pesticide spray' : 'Safe for spraying'}</li>
              </ul>
            </div>
          </Card>

          <Card className="forecast-card">
            <h2>7-Day Forecast</h2>
            <div className="forecast-grid">
              {weather.forecast.map((day, idx) => (
                <div key={idx} className="forecast-item">
                  <h4>{day.day}</h4>
                  <p className="fore-temp">{day.temp.toFixed(1)}°C</p>
                  <p className="fore-icon">{getWeatherIcon(day.condition)}</p>
                  <p className="fore-condition">{day.condition}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="alerts-card">
            <h2>⚠️ Weather Alerts</h2>
            <div className="alerts-list">
              {weather.temperature > 35 && (
                <div className="alert-item high">
                  <span>🔴 High Temperature Alert</span>
                  <p>Temperature exceeds safe farming limits. Plan irrigation accordingly.</p>
                </div>
              )}
              {weather.rainfall > 50 && (
                <div className="alert-item warning">
                  <span>🟡 Heavy Rainfall Warning</span>
                  <p>High rainfall predicted. Check field drainage.</p>
                </div>
              )}
              {weather.humidity > 80 && (
                <div className="alert-item warning">
                  <span>🟡 High Humidity</span>
                  <p>Disease risk is high. Apply preventive measures.</p>
                </div>
              )}
              {weather.uvIndex > 8 && (
                <div className="alert-item info">
                  <span>🔵 High UV Index</span>
                  <p>Intense sun. Increase irrigation frequency.</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
