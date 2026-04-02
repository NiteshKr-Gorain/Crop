import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Card, Input, Select, Button, Loader, Alert } from '../components/UI';
import { apiService } from '../utils/apiService';
import '../styles/pages/advisory.css';

export const CropAdvisory = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    cropType: '',
    location: '',
    season: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [advisory, setAdvisory] = useState(null);

  const cropOptions = [
    { label: t('rice'), value: 'Rice' },
    { label: t('wheat'), value: 'Wheat' },
    { label: t('corn'), value: 'Corn' },
    { label: t('cotton'), value: 'Cotton' },
    { label: t('sugarcane'), value: 'Sugarcane' },
    { label: t('potato'), value: 'Potato' },
    { label: 'Vegetables', value: 'Vegetables' },
    { label: 'Pulses', value: 'Pulses' }
  ];

  const seasonOptions = [
    { label: t('kharif'), value: 'Kharif' },
    { label: t('rabi'), value: 'Rabi' },
    { label: t('summer'), value: 'Summer' }
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

    if (!formData.cropType || !formData.location || !formData.season) {
      setError(t('fillAllFields'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await apiService.getCropAdvisory(
        formData.cropType,
        formData.location,
        formData.season
      );

      if (response.success) {
        setAdvisory(response.data);
      }
    } catch (err) {
      setError('Failed to get advisory');
    } finally {
      setLoading(false);
    }
  };

  const getStageIcon = (stage) => {
    const icons = {
      'Germination': '🌱',
      'Vegetative': '🌿',
      'Flowering': '🌻',
      'Fruiting': '🌾',
      'Harvesting': '🚜'
    };
    return icons[stage] || '📊';
  };

  return (
    <div className={`crop-advisory ${isDarkMode ? 'dark' : ''}`}>
      <h1>🌾 {t('cropAdvisorySystem')}</h1>
      <p>{t('getPersonalizedAdvice')}</p>

      <div className="advisory-container">
        <Card className="form-card">
          <h2>{t('getAdvice')}</h2>
          <form onSubmit={handleSubmit}>
            <Select
              label={t('cropType')}
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              options={cropOptions}
            />

            <Input
              type="text"
              label="Location *"
              name="location"
              placeholder="e.g., Punjab, Haryana"
              value={formData.location}
              onChange={handleChange}
            />

            <Select
              label="Season *"
              name="season"
              value={formData.season}
              onChange={handleChange}
              options={seasonOptions}
            />

            {error && <Alert type="error" message={error} />}

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Generating Advisory...' : 'Get Advisory'}
            </Button>
          </form>
        </Card>

        {loading && <Loader message="Generating personalized advice..." />}

        {advisory && (
          <div className="advisory-results">
            <Card className="header-card">
              <h2>📋 Advisory for {advisory.cropType}</h2>
              <p>Location: {advisory.location} | Season: {advisory.season}</p>
            </Card>

            <Card className="advices-card">
              <h3>💡 Recommendations</h3>
              <div className="advices-list">
                {advisory.advices.map((advice, idx) => (
                  <div key={idx} className="advice-item">
                    <span className="advice-number">{idx + 1}</span>
                    <p>{advice}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="critical-periods">
              <h3>⏰ Critical Stages of {advisory.cropType}</h3>
              <div className="stages-list">
                {advisory.criticalPeriods.map((period, idx) => (
                  <div key={idx} className="stage-item">
                    <span className="stage-icon">📌</span>
                    <p>{period}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="best-practices">
              <h3>🌱 Best Practices for {advisory.cropType}</h3>
              <ul>
                <li>
                  <strong>Soil Preparation:</strong> Ensure soil is well-drained and has good organic content
                </li>
                <li>
                  <strong>Seed Quality:</strong> Use certified seeds for higher yield
                </li>
                <li>
                  <strong>Planting Depth:</strong> Follow recommended sowing depth for optimal germination
                </li>
                <li>
                  <strong>Spacing:</strong> Maintain proper plant-to-plant distance for better growth
                </li>
                <li>
                  <strong>Nutrient Management:</strong> Apply fertilizers in split doses during critical periods
                </li>
                <li>
                  <strong>Water Management:</strong> Provide adequate water, especially at flowering and grain-filling stages
                </li>
                <li>
                  <strong>Pest & Disease Management:</strong> Monitor regularly and take preventive measures early
                </li>
                <li>
                  <strong>Harvesting:</strong> Harvest at the right maturity stage for quality produce
                </li>
              </ul>
            </Card>

            <Card className="common-problems">
              <h3>⚠️ Common Issues & Solutions</h3>
              <div className="problems-list">
                <div className="problem-item">
                  <h4>Yellow Leaves</h4>
                  <p>Usually indicates nitrogen deficiency. Apply nitrogen-rich fertilizer.</p>
                </div>
                <div className="problem-item">
                  <h4>Poor Growth</h4>
                  <p>Check soil moisture, sunlight, and nutrient levels. Adjust irrigation and fertilization.</p>
                </div>
                <div className="problem-item">
                  <h4>Pest Attack</h4>
                  <p>Identify pest type and apply specific pesticide. Clean field debris regularly.</p>
                </div>
                <div className="problem-item">
                  <h4>Fungal Diseases</h4>
                  <p>Improve air circulation, reduce humidity, and use fungicides as needed.</p>
                </div>
              </div>
            </Card>

            <Card className="seasonal-tips">
              <h3>🗓️ {advisory.season} Season Tips</h3>
              <ul>
                <li>Plan your crop calendar in advance</li>
                <li>Check weather forecasts regularly</li>
                <li>Prepare fields ahead of sowing season</li>
                <li>Arrange for irrigation well in time</li>
                <li>Monitor crops regularly for pests and diseases</li>
              </ul>
            </Card>

            <Button
              variant="secondary"
              onClick={() => setAdvisory(null)}
            >
              Get Another Advisory
            </Button>
          </div>
        )}

        {!advisory && !loading && (
          <Card className="info-card">
            <h2>📚 About Crop Advisory</h2>
            <p>Our AI-powered crop advisory system provides personalized recommendations based on:</p>
            <ul>
              <li>Crop type and its specific requirements</li>
              <li>Your geographical location and climate</li>
              <li>Current season and weather conditions</li>
              <li>Best practices from agricultural research</li>
              <li>Real-time data and historical patterns</li>
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
};
