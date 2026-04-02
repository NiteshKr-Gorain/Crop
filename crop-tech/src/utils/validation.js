// Form validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export const validateField = (field, value) => {
  const errors = {};

  if (!value) {
    errors[field] = `${field} is required`;
    return errors;
  }

  switch (field) {
    case 'email':
      if (!validateEmail(value)) {
        errors.email = 'Invalid email address';
      }
      break;
    case 'phone':
      if (!validatePhone(value)) {
        errors.phone = 'Phone number must be 10 digits';
      }
      break;
    case 'password':
      if (value.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      break;
    default:
      break;
  }

  return errors;
};

export const validateForm = (formData, requiredFields) => {
  const errors = {};

  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].toString().trim() === '') {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });

  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Invalid email address';
  }

  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Phone number must be 10 digits';
  }

  return errors;
};

// LocalStorage utilities
export const localStorage_set = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error setting localStorage:', error);
    return false;
  }
};

export const localStorage_get = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error getting localStorage:', error);
    return defaultValue;
  }
};

export const localStorage_remove = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

export const localStorage_clear = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};
