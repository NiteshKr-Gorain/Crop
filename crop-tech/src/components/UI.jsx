import React from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/components.css';

// Button component
export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button',
  disabled = false,
  className = '',
  ...props 
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${isDarkMode ? 'dark' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Card component
export const Card = ({ children, className = '', ...props }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`card ${isDarkMode ? 'dark' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
};

// Input component
export const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = '',
  label = '',
  className = '',
  ...props
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`input-group ${className}`}>
      {label && <label className={isDarkMode ? 'dark' : ''}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input ${error ? 'error' : ''} ${isDarkMode ? 'dark' : ''}`}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

// Select component
export const Select = ({
  options = [],
  value,
  onChange,
  label = '',
  error = '',
  className = '',
  ...props
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`input-group ${className}`}>
      {label && <label className={isDarkMode ? 'dark' : ''}>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={`select ${error ? 'error' : ''} ${isDarkMode ? 'dark' : ''}`}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

// Loading spinner
export const Loader = ({ message = 'Loading...' }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`loader-container ${isDarkMode ? 'dark' : ''}`}>
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

// Alert component
export const Alert = ({ 
  type = 'info', 
  message, 
  onClose,
  className = ''
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`alert alert-${type} ${isDarkMode ? 'dark' : ''} ${className}`}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="close-btn">✕</button>
      )}
    </div>
  );
};

// Modal component
export const Modal = ({
  isOpen,
  onClose,
  children,
  title = '',
  className = ''
}) => {
  const { isDarkMode } = useTheme();
  
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isDarkMode ? 'dark' : ''}`} onClick={onClose}>
      <div className={`modal ${isDarkMode ? 'dark' : ''} ${className}`} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// Badge component
export const Badge = ({ children, variant = 'default', className = '' }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <span className={`badge badge-${variant} ${isDarkMode ? 'dark' : ''} ${className}`}>
      {children}
    </span>
  );
};

// Progress bar
export const Progress = ({ value, max = 100, className = '' }) => {
  const { isDarkMode } = useTheme();
  const percentage = (value / max) * 100;
  
  return (
    <div className={`progress-bar ${isDarkMode ? 'dark' : ''} ${className}`}>
      <div 
        className="progress-fill" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

// Stats card
export const StatsCard = ({ icon: Icon, label, value, color = '#2ecc71', className = '' }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`stats-card ${isDarkMode ? 'dark' : ''} ${className}`}>
      <div className="stats-icon" style={{ color }}>
        {typeof Icon === 'string' ? Icon : <Icon size={28} />}
      </div>
      <div className="stats-content">
        <p className="stats-label">{label}</p>
        <p className="stats-value">{value}</p>
      </div>
    </div>
  );
};
