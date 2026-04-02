# 🚀 AgriSmart Developer Quick Reference

## Getting Started in 30 Seconds

```bash
cd crop-tech
npm install
npm run dev
# Open http://localhost:5173
```

---

## Component Usage Examples

### 1. Button Component
```jsx
import { Button } from '../components/UI';

<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>

// Variants: primary, secondary, danger
// Props: onClick, disabled, className
```

### 2. Card Component
```jsx
import { Card } from '../components/UI';

<Card className="custom-class">
  <h2>Card Title</h2>
  <p>Card content here</p>
</Card>
```

### 3. Input Component
```jsx
import { Input } from '../components/UI';

const [value, setValue] = useState('');

<Input
  type="text"
  label="Field Label"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  error={errors.fieldName}
  placeholder="Enter value"
/>
```

### 4. Select Component
```jsx
import { Select } from '../components/UI';

<Select
  label="Choose Option"
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
  options={[
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' }
  ]}
  error={errors.select}
/>
```

### 5. Modal Component
```jsx
import { Modal } from '../components/UI';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
>
  <p>Modal content here</p>
</Modal>
```

### 6. Alert Component
```jsx
import { Alert } from '../components/UI';

<Alert
  type="success" // success, error, warning, info
  message="Operation successful!"
  onClose={() => setAlert('')}
/>
```

### 7. Loader Component
```jsx
import { Loader } from '../components/UI';

{loading && <Loader message="Loading data..." />}
```

### 8. Badge Component
```jsx
import { Badge } from '../components/UI';

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
```

### 9. Progress Component
```jsx
import { Progress } from '../components/UI';

<Progress value={65} max={100} />
```

### 10. StatsCard Component
```jsx
import { StatsCard } from '../components/UI';

<StatsCard
  icon="📊"
  label="Total Expenses"
  value="₹28,000"
  color="#2ecc71"
/>
```

---

## Context Usage

### Theme Context (Dark Mode)
```jsx
import { useTheme } from '../context/ThemeContext';

const { isDarkMode, toggleTheme } = useTheme();

return (
  <div className={isDarkMode ? 'dark' : ''}>
    <button onClick={toggleTheme}>
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  </div>
);
```

### Language Context (i18n)
```jsx
import { useLanguage } from '../context/LanguageContext';

const { language, setLanguage, t } = useLanguage();

return (
  <div>
    <h1>{t('appName')}</h1>
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
      <option value="pa">ਪੰਜਾਬੀ</option>
    </select>
  </div>
);
```

---

## API Service Usage

### Crop Recommendation
```jsx
import { apiService } from '../utils/apiService';

const response = await apiService.getCropRecommendation(
  'clay',      // soilType
  'Punjab',    // location
  'kharif',    // season
  '30',        // temperature
  '600'        // rainfall
);

// Returns: { success: true, data: { recommendedCrops, confidence, reasoning, estimatedYield } }
```

### Weather Data
```jsx
const response = await apiService.getWeatherData('Punjab');
// Returns: { success: true, data: { temperature, humidity, rainfall, windSpeed, uvIndex, condition, forecast } }
```

### Disease Detection
```jsx
const response = await apiService.detectDisease(imageData);
// Returns: { success: true, data: { name, confidence, severity, treatment } }
```

### Irrigation Advice
```jsx
const response = await apiService.getIrrigationAdvice('clay', 'Rice', '30', '100');
// Returns: { success: true, data: { waterRequired, scheduling, moisture, prediction } }
```

### Expenses
```jsx
// Get all expenses
const response = await apiService.getExpenses();

// Add new expense
const response = await apiService.addExpense({
  category: 'Seeds',
  amount: 5000,
  date: '2025-01-15',
  description: 'Wheat seeds'
});
```

### Marketplace
```jsx
const response = await apiService.getMarketplaceListings();
// Returns array of products with title, seller, price, location, rating
```

### Government Schemes
```jsx
const response = await apiService.getGovernmentSchemes();
// Returns array of schemes with details, benefits, eligibility
```

### Crop Advisory
```jsx
const response = await apiService.getCropAdvisory('Rice', 'Punjab', 'Kharif');
// Returns: { success: true, data: { advices, criticalPeriods } }
```

---

## Validation Usage

### Email Validation
```jsx
import { validateEmail } from '../utils/validation';

if (validateEmail(email)) {
  console.log('Valid email');
}
```

### Phone Validation
```jsx
import { validatePhone } from '../utils/validation';

if (validatePhone('9876543210')) {
  console.log('Valid phone');
}
```

### Form Validation
```jsx
import { validateForm } from '../utils/validation';

const errors = validateForm(
  { email: 'test@example.com', name: 'John' },
  ['email', 'name']
);

if (Object.keys(errors).length > 0) {
  console.log('Form errors:', errors);
}
```

### localStorage Usage
```jsx
import { 
  localStorage_set, 
  localStorage_get, 
  localStorage_remove 
} from '../utils/validation';

// Save
localStorage_set('user', { name: 'John', farm: '5 acres' });

// Get with default
const user = localStorage_get('user', { name: 'Guest' });

// Remove
localStorage_remove('user');

// Clear all
localStorage_clear();
```

---

## Form Handling Pattern

```jsx
import { Input, Button, Alert } from '../components/UI';
import { validateForm } from '../utils/validation';

export const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm(formData, ['name', 'email', 'phone']);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // Your API call here
      console.log('Submitting:', formData);
    } catch (err) {
      setErrors({ submit: 'Error submitting form' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />
      <Input
        type="email"
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <Input
        type="tel"
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
      />
      {errors.submit && <Alert type="error" message={errors.submit} />}
      <Button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};
```

---

## Page Structure Template

```jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Card, Button, Loader } from '../components/UI';
import { apiService } from '../utils/apiService';
import '../styles/pages/your-page.css';

export const YourPage = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.someMethod();
        if (response.success) {
          setData(response.data);
        }
      } catch (err) {
        setError('Error loading data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className={`your-page ${isDarkMode ? 'dark' : ''}`}>
      <h1>{t('pageTitle')}</h1>
      <Card>
        {/* Your content */}
      </Card>
    </div>
  );
};
```

---

## CSS Responsive Pattern

```css
/* Desktop First */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

/* Tablet */
@media (max-width: 1024px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* Extra Small */
@media (max-width: 480px) {
  .container {
    padding: 0.75rem;
    gap: 0.75rem;
  }
}
```

---

## Adding a New Page

### Step 1: Create Page Component
```jsx
// src/pages/NewPage.jsx
export const NewPage = () => {
  return <h1>New Page</h1>;
};
```

### Step 2: Create CSS
```css
/* src/styles/pages/newpage.css */
.new-page { /* styles */ }
```

### Step 3: Update App.jsx
```jsx
import { NewPage } from './pages/NewPage';

// In renderPage():
case 'newpage':
  return <NewPage />;

// In Navigation:
{ id: 'newpage', label: 'New Page' }
```

---

## Adding a New Language

```jsx
// In src/context/LanguageContext.jsx
const translations = {
  // ... existing languages
  fr: {  // French
    appName: 'AgriBrilant',
    tagline: 'Plateforme Super Agriculteur Alimentée par l\'IA',
    dashboard: 'Tableau de Bord',
    // ... rest of keys
  }
};

// In Language Selector:
<option value="fr">Français</option>
```

---

## Dark Mode CSS Pattern

```css
.component {
  background: white;
  color: #2c3e50;
}

.component.dark {
  background: #2d2d2d;
  color: #ecf0f1;
}

/* Or with context aware selector */
body.dark .component {
  background: #2d2d2d;
  color: #ecf0f1;
}
```

---

## Debugging Tips

### Check Component State
```jsx
// In component:
console.log('Form Data:', formData);
console.log('Errors:', errors);
console.log('Loading:', loading);
```

### Check localStorage
```javascript
// In browser console:
localStorage.getItem('user')
localStorage.setItem('debug', 'on')
localStorage.clear()
```

### Check API Response
```jsx
try {
  const response = await apiService.someMethod();
  console.log('API Response:', response);
} catch (err) {
  console.error('API Error:', err);
}
```

### Check Theme & Language
```jsx
const { isDarkMode } = useTheme();
const { language } = useLanguage();
console.log('Dark Mode:', isDarkMode);
console.log('Language:', language);
```

---

## Common Patterns

### Conditional Rendering
```jsx
{condition && <Component />}
{loading ? <Loader /> : <Content />}
{error ? <Alert type="error" message={error} /> : null}
```

### List Rendering
```jsx
{items.map((item) => (
  <Card key={item.id}>
    <h3>{item.title}</h3>
  </Card>
))}
```

### Event Handling
```jsx
const handleClick = () => { /* logic */ };
<Button onClick={handleClick}>Click</Button>

const handleChange = (e) => {
  setValue(e.target.value);
};
<Input onChange={handleChange} />
```

### Async Operations
```jsx
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const response = await apiService.getData();
    setData(response.data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

---

## Performance Tips

1. Use `useState` for local component state
2. Use `useEffect` for side effects with proper dependencies
3. Memoize expensive computations with `useMemo`
4. Use `useCallback` for stable function refs
5. Avoid inline functions in lists
6. Use key prop in list rendering
7. Lazy load components if needed
8. Cache API responses in localStorage

---

## Production Checklist

- [ ] Replace mock APIs with real endpoints
- [ ] Remove console.log statements
- [ ] Add error boundaries
- [ ] Optimize images
- [ ] Test on mobile devices
- [ ] Run `npm run build`
- [ ] Test production build with `npm run preview`
- [ ] Set up analytics
- [ ] Configure environment variables
- [ ] Add security headers
- [ ] Enable HTTPS
- [ ] Set up monitoring/logging

---

## Useful Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [MDN Web Docs](https://developer.mozilla.org)
- [CSS Tricks](https://css-tricks.com)
- [JavaScript.info](https://javascript.info)

---

**Happy Coding! 🚀**

For detailed information, see README.md, SETUP.md, and PROJECT_SUMMARY.md
