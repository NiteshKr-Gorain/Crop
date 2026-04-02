import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Card, Input, Select, Button, Loader, Badge } from '../components/UI';
import { apiService } from '../utils/apiService';
import { validateForm } from '../utils/validation';
import '../styles/pages/crop-recommendation.css';

export const CropRecommendation = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    soilType: '',
    location: '',
    season: '',
    temperature: '',
    rainfall: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const soilOptions = [
    { label: t('clay'), value: 'clay' },
    { label: t('loam'), value: 'loam' },
    { label: t('sandy'), value: 'sandy' },
    { label: t('peat'), value: 'peat' }
  ];

  const seasonOptions = [
    { label: t('kharif'), value: 'kharif' },
    { label: t('rabi'), value: 'rabi' },
    { label: t('summer'), value: 'summer' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requiredFields = ['soilType', 'location', 'season', 'temperature', 'rainfall'];
    const newErrors = validateForm(formData, requiredFields);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.getCropRecommendation(
        formData.soilType,
        formData.location,
        formData.season,
        formData.temperature,
        formData.rainfall
      );

      if (response.success) {
        setResult(response.data);
      }
    } catch (error) {
      setErrors({ submit: 'Failed to get recommendation' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`crop-recommendation ${isDarkMode ? 'dark' : ''}`}>
      <h1>🌾 {t('cropRecommendationForm')}</h1>
      <p>Get AI-powered crop suggestions based on your farm conditions</p>

      <div className="recommendation-container">
        <Card className="form-card">
          <h2>Farm Information</h2>
          <form onSubmit={handleSubmit}>
            <Select
              label={t('soilType')}
              name="soilType"
              value={formData.soilType}
              onChange={handleChange}
              options={soilOptions}
              error={errors.soilType}
            />

            <Input
              type="text"
              label={t('location')}
              name="location"
              placeholder="e.g., Punjab, Haryana"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
            />

            <Select
              label={t('season')}
              name="season"
              value={formData.season}
              onChange={handleChange}
              options={seasonOptions}
              error={errors.season}
            />

            <Input
              type="number"
              label={t('temperature')}
              name="temperature"
              placeholder="e.g., 30"
              value={formData.temperature}
              onChange={handleChange}
              error={errors.temperature}
            />

            <Input
              type="number"
              label={t('rainfall')}
              name="rainfall"
              placeholder="e.g., 600"
              value={formData.rainfall}
              onChange={handleChange}
              error={errors.rainfall}
            />

            {errors.submit && <p className="error">{errors.submit}</p>}

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? t('fetching') : t('getRecommendation')}
            </Button>
          </form>
        </Card>

        {loading && <Loader message="Analyzing your farm conditions..." />}

        {result && (
          <Card className="result-card">
            <h2>✨ {t('recommendedCrops')}</h2>
            
            <div className="reasoning">
              <p><strong>Analysis:</strong> {result.reasoning}</p>
            </div>

            <div className="crops-list">
              <h3>Top Recommendations:</h3>
              {result.recommendedCrops.map((crop, idx) => (
                <div key={idx} className="crop-item">
                  <span className="crop-name">{crop}</span>
                  <Badge variant="success">{t('suitability')}</Badge>
                </div>
              ))}
            </div>

            <div className="details">
              <div className="detail-item">
                <span>Confidence Level</span>
                <strong>{result.confidence.toFixed(1)}%</strong>
              </div>
              <div className="detail-item">
                <span>Estimated Yield</span>
                <strong>{result.estimatedYield.toFixed(1)} tons/hectare</strong>
              </div>
            </div>

            <Button 
              variant="secondary" 
              onClick={() => setResult(null)}
            >
              Clear Results
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};
