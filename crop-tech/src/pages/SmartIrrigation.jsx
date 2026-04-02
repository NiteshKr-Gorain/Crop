import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Card, Input, Select, Button, Loader, Badge, Progress } from '../components/UI';
import { apiService } from '../utils/apiService';
import '../styles/pages/irrigation.css';

export const SmartIrrigation = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    soilType: '',
    cropType: '',
    temperature: '',
    rainfall: ''
  });
  const [loading, setLoading] = useState(false);
  const [adviceResult, setAdviceResult] = useState(null);

  const cropOptions = [
    { label: t('rice'), value: 'Rice' },
    { label: t('wheat'), value: 'Wheat' },
    { label: t('corn'), value: 'Corn' },
    { label: t('cotton'), value: 'Cotton' },
    { label: t('sugarcane'), value: 'Sugarcane' },
    { label: t('potato'), value: 'Potato' }
  ];

  const soilOptions = [
    { label: t('clay'), value: 'clay' },
    { label: t('loam'), value: 'loam' },
    { label: t('sandy'), value: 'sandy' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.soilType || !formData.cropType || !formData.temperature || !formData.rainfall) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.getIrrigationAdvice(
        formData.soilType,
        formData.cropType,
        formData.temperature,
        formData.rainfall
      );

      if (response.success) {
        setAdviceResult(response.data);
      }
    } catch (error) {
      alert('Failed to get irrigation advice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`smart-irrigation ${isDarkMode ? 'dark' : ''}`}>
      <h1>💧 {t('smartIrrigationSystem')}</h1>
      <p>Optimize water usage and irrigation scheduling with AI recommendations</p>

      <div className="irrigation-container">
        <Card className="form-card">
          <h2>{t('getAdvice')}</h2>
          <form onSubmit={handleSubmit}>
            <Select
              label={t('soilType')}
              name="soilType"
              value={formData.soilType}
              onChange={handleChange}
              options={soilOptions}
            />

            <Select
              label={t('cropType')}
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              options={cropOptions}
            />

            <Input
              type="number"
              label={t('temperature')}
              name="temperature"
              placeholder="e.g., 30"
              value={formData.temperature}
              onChange={handleChange}
            />

            <Input
              type="number"
              label={t('rainfall')}
              name="rainfall"
              placeholder="e.g., 100"
              value={formData.rainfall}
              onChange={handleChange}
            />

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? t('fetching') : t('getAdvice')}
            </Button>
          </form>
        </Card>

        {loading && <Loader message="Calculating optimal irrigation schedule..." />}

        {adviceResult && (
          <div className="results-container">
            <Card className="advice-card">
              <h2>💧 {t('irrigationSchedule')} - {adviceResult.cropType}</h2>

              <div className="advice-main">
                <div className="advice-item">
                  <h3>{t('waterQuantity')}</h3>
                  <div className="water-value">
                    <strong>{adviceResult.waterRequired} mm</strong>
                    <p>per season</p>
                  </div>
                </div>

                <div className="advice-item">
                  <h3>Soil Moisture</h3>
                  <Progress 
                    value={adviceResult.moisture} 
                    max={100}
                  />
                  <p>{adviceResult.moisture.toFixed(1)}% - {adviceResult.moisture > 50 ? 'Good' : 'Low'}</p>
                </div>
              </div>

              <Card className="scheduling">
                <h3>📅 Irrigation Schedule</h3>
                <div className="schedule-details">
                  <div className="schedule-item">
                    <span>Frequency</span>
                    <strong>Every {adviceResult.scheduling.frequency} days</strong>
                  </div>
                  <div className="schedule-item">
                    <span>Duration per Irrigation</span>
                    <strong>{adviceResult.scheduling.duration}</strong>
                  </div>
                  <div className="schedule-item">
                    <span>Best Time</span>
                    <strong>{adviceResult.scheduling.bestTime}</strong>
                  </div>
                </div>
              </Card>

              <div className="prediction-box">
                <h3>📊 Next Irrigation Alert</h3>
                <Badge variant="warning">{adviceResult.prediction}</Badge>
              </div>
            </Card>

            <Card className="best-practices">
              <h2>🌾 Best Practices for Irrigation</h2>
              <ul>
                <li>
                  <strong>Drip Irrigation:</strong> Saves 40-60% water compared to flood irrigation
                </li>
                <li>
                  <strong>Sprinkler System:</strong> Uniform water distribution, suitable for most crops
                </li>
                <li>
                  <strong>Monitor Soil Moisture:</strong> Check before each irrigation cycle
                </li>
                <li>
                  <strong>Timing:</strong> Irrigate during early morning to minimize evaporation
                </li>
                <li>
                  <strong>Avoid Overwatering:</strong> Can cause root rot and nutrient leaching
                </li>
                <li>
                  <strong>Use Mulch:</strong> Reduces water loss from soil surface
                </li>
                <li>
                  <strong>Weather Consideration:</strong> Reduce irrigation during rainy seasons
                </li>
              </ul>
            </Card>

            <Card className="automation">
              <h2>🤖 IoT Integration Tips</h2>
              <ul>
                <li>Install soil moisture sensors for real-time data</li>
                <li>Use weather APIs to adjust irrigation automatically</li>
                <li>Set up SMS alerts for irrigation scheduling</li>
                <li>Track water consumption and costs</li>
                <li>Maintain sensors regularly for accuracy</li>
              </ul>
            </Card>

            <Button
              variant="secondary"
              onClick={() => setAdviceResult(null)}
            >
              Calculate Another Plan
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
