import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Card, Button, Loader, Alert, Badge } from '../components/UI';
import { apiService } from '../utils/apiService';
import '../styles/pages/disease.css';

export const DiseaseDetection = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!imagePreview) {
      setError(t('pleaseSelectImage'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await apiService.detectDisease(imagePreview);
      if (response.success) {
        setResult(response.data);
      }
    } catch (err) {
      setError(t('failedToAnalyzeImage'));
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High': return '#e74c3c';
      case 'Medium': return '#f39c12';
      case 'Low': return '#f1c40f';
      case 'None': return '#2ecc71';
      default: return '#3498db';
    }
  };

  return (
    <div className={`disease-detection ${isDarkMode ? 'dark' : ''}`}>
      <h1>🦠 {t('diseaseDetectionSystem')}</h1>
      <p>Upload crop images to detect diseases using advanced AI analysis</p>

      <div className="detection-container">
        <Card className="upload-card">
          <h2>{t('uploadCropImage')}</h2>
          <div className="upload-area">
            {imagePreview ? (
              <div className="image-preview">
                <img src={imagePreview} alt="Uploaded crop" />
                <button 
                  className="btn-remove"
                  onClick={() => {
                    setImagePreview(null);
                    setResult(null);
                  }}
                >
                  {t('removeFromCart')}
                </button>
              </div>
            ) : (
              <label className="upload-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <div className="upload-content">
                  <p className="upload-icon">📸</p>
                  <p>{t('clickToUpload')}</p>
                  <p className="small-text">PNG, JPG, GIF up to 10MB</p>
                </div>
              </label>
            )}
          </div>

          {imagePreview && (
            <Button 
              variant="primary" 
              onClick={analyzeImage}
              disabled={loading}
              className="analyze-btn"
            >
              {loading ? t('fetching') : t('analyzeImage')}
            </Button>
          )}
        </Card>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}
        {loading && <Loader message="Analyzing crop image with AI..." />}

        {result && (
          <Card className="result-card">
            <h2>Analysis Results</h2>

            <div className="disease-result">
              <div className="disease-header">
                <h3>{result.name}</h3>
                <Badge variant={result.severity === 'None' ? 'success' : 'warning'}>
                  {result.severity}
                </Badge>
              </div>

              <div className="result-details">
                <div className="detail">
                  <span>{t('confidence')}</span>
                  <div className="confidence-bar">
                    <div 
                      className="confidence-fill" 
                      style={{ width: `${result.confidence}%`, backgroundColor: getSeverityColor(result.severity) }}
                    ></div>
                  </div>
                  <p>{result.confidence}%</p>
                </div>

                <div className="detail">
                  <span>{t('severity')}</span>
                  <p style={{ color: getSeverityColor(result.severity) }}>
                    <strong>{result.severity}</strong>
                  </p>
                </div>
              </div>

              <Card className="treatment-card">
                <h4>🌿 {t('treatment')}</h4>
                <p>{result.treatment}</p>
              </Card>

              {result.name !== 'Healthy Leaf' && (
                <Card className="additional-steps">
                  <h4>Additional Steps</h4>
                  <ul>
                    <li>Isolate affected plants if possible</li>
                    <li>Remove infected leaves and stems</li>
                    <li>Improve air circulation in the field</li>
                    <li>Avoid overhead watering</li>
                    <li>Monitor the field regularly</li>
                    <li>Consider consulting a local agricultural extension</li>
                  </ul>
                </Card>
              )}
            </div>

            <Button 
              variant="secondary" 
              onClick={() => {
                setImagePreview(null);
                setResult(null);
              }}
            >
              Analyze Another Image
            </Button>
          </Card>
        )}

        <Card className="info-card">
          <h2>💡 Disease Detection Tips</h2>
          <ul>
            <li>Take clear, well-lit photos of affected areas</li>
            <li>Capture both close-ups and wide views of the crop</li>
            <li>Ensure the crop is positioned clearly in the image</li>
            <li>Use the detection regularly for early warning</li>
            <li>Always verify results with local agricultural experts</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
