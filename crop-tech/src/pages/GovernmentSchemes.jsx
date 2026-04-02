import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Card, Button, Badge, Loader, Modal } from '../components/UI';
import { apiService } from '../utils/apiService';
import '../styles/pages/schemes.css';

export const GovernmentSchemes = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSchemes = async () => {
      const response = await apiService.getGovernmentSchemes();
      if (response.success) {
        setSchemes(response.data);
      }
      setLoading(false);
    };
    fetchSchemes();
  }, []);

  const handleApply = (scheme) => {
    setSelectedScheme(scheme);
    setShowModal(true);
  };

  const getSchemeIcon = (schemeName) => {
    const icons = {
      'PM-KISAN': '💰',
      'PMFBY': '🛡️',
      'Soil Health Card': '🌱',
      'KCC': '💳'
    };
    return icons[schemeName] || '📋';
  };

  const getTypeColor = (type) => {
    const colors = {
      'Income Support': 'success',
      'Insurance': 'warning',
      'Advisory': 'info',
      'Credit': 'primary'
    };
    return colors[type] || 'default';
  };

  if (loading) return <Loader message={t('loading')} />;

  return (
    <div className={`government-schemes ${isDarkMode ? 'dark' : ''}`}>
      <h1>📜 {t('governmentSchemes')}</h1>
      <p>{t('exploreAndApply')}</p>

      <div className="schemes-container">
        <div className="schemes-intro">
          <Card className="intro-card">
            <h2>🎯 {t('availableSchemes')}</h2>
            <p>The Government of India offers various schemes to support farmers with direct income, insurance, credit, and advisory services. Check the details below and apply for the schemes you are eligible for.</p>
          </Card>
        </div>

        <div className="schemes-grid">
          {schemes.map(scheme => (
            <Card key={scheme.id} className="scheme-card">
              <div className="scheme-header">
                <span className="scheme-icon">{getSchemeIcon(scheme.name)}</span>
                <div className="scheme-title-section">
                  <h3>{scheme.name}</h3>
                  <p className="scheme-full-name">{scheme.title}</p>
                </div>
              </div>

              <div className="scheme-status">
                <Badge variant="success">{scheme.status}</Badge>
                <Badge variant={getTypeColor(scheme.type)}>{scheme.type}</Badge>
              </div>

              <p className="scheme-description">{scheme.description}</p>

              <div className="scheme-details">
                <div className="detail">
                  <strong>Benefits:</strong>
                  <p>{scheme.benefits}</p>
                </div>
                <div className="detail">
                  <strong>Eligibility:</strong>
                  <p>{scheme.eligibility}</p>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={() => handleApply(scheme)}
                className="apply-btn"
              >
                Learn More & Apply
              </Button>
            </Card>
          ))}
        </div>

        <Card className="additional-info">
          <h2>📚 More Information</h2>
          <div className="info-sections">
            <div className="info-item">
              <h3>🔗 Useful Links</h3>
              <ul>
                <li><a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer">PM-KISAN Official Website</a></li>
                <li><a href="https://pmfby.gov.in/" target="_blank" rel="noopener noreferrer">Pradhan Mantri Fasal Bima Yojana</a></li>
                <li><a href="https://soilhealth.dac.gov.in/" target="_blank" rel="noopener noreferrer">Soil Health Card Portal</a></li>
                <li><a href="https://www.nabard.org/" target="_blank" rel="noopener noreferrer">NABARD - KCC Information</a></li>
              </ul>
            </div>

            <div className="info-item">
              <h3>💡 How to Apply</h3>
              <ol>
                <li>Check your eligibility criteria</li>
                <li>Gather required documents (Aadhar, Land documents, etc.)</li>
                <li>Visit your nearest bank or Village Level Entrepreneur (VLE)</li>
                <li>Complete the application form</li>
                <li>Submit documents and verify</li>
                <li>Track your application status online</li>
              </ol>
            </div>

            <div className="info-item">
              <h3>📞 Support</h3>
              <p>For queries related to government schemes, contact:</p>
              <ul>
                <li>Ministry of Agriculture helpline</li>
                <li>Your local agricultural extension office</li>
                <li>Village level cooperative bank</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedScheme?.name}
      >
        {selectedScheme && (
          <div className="scheme-modal-content">
            <h3>{selectedScheme.title}</h3>
            <p>{selectedScheme.description}</p>

            <div className="modal-details">
              <div className="detail-section">
                <h4>Benefits</h4>
                <p>{selectedScheme.benefits}</p>
              </div>

              <div className="detail-section">
                <h4>Eligibility Criteria</h4>
                <p>{selectedScheme.eligibility}</p>
              </div>

              <div className="detail-section">
                <h4>How to Apply</h4>
                <ol>
                  <li>Verify your eligibility</li>
                  <li>Collect all required documents</li>
                  <li>Visit authorized center or go online</li>
                  <li>Fill application form</li>
                  <li>Submit and keep reference number</li>
                  <li>Track status regularly</li>
                </ol>
              </div>

              <div className="detail-section">
                <h4>Required Documents</h4>
                <ul>
                  <li>Aadhar Card</li>
                  <li>Land ownership proof</li>
                  <li>Bank account details</li>
                  <li>Passport size photo</li>
                  <li>Address proof</li>
                </ul>
              </div>
            </div>

            <Button variant="primary" className="apply-action-btn">
              Apply Now
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};
