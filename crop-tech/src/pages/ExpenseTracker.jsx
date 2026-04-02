import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Card, Input, Select, Button, Alert, Badge } from '../components/UI';
import { localStorage_get, localStorage_set } from '../utils/validation';
import '../styles/pages/expenses.css';

export const ExpenseTracker = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const categoryOptions = [
    { label: t('seeds'), value: 'Seeds' },
    { label: t('fertilizer'), value: 'Fertilizer' },
    { label: t('labor'), value: 'Labor' },
    { label: t('equipment'), value: 'Equipment' },
    { label: t('pesticide'), value: 'Pesticide' },
    { label: t('waterIrrigation'), value: 'Water/Irrigation' },
    { label: t('transportation'), value: 'Transportation' },
    { label: t('other'), value: 'Other' }
  ];

  // Load expenses from localStorage
  useEffect(() => {
    const savedExpenses = localStorage_get('expenses', []);
    setExpenses(savedExpenses);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.category || !formData.amount || !formData.date) {
      alert('Please fill all required fields');
      return;
    }

    const newExpense = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount)
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage_set('expenses', updatedExpenses);

    setFormData({
      category: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });

    setShowForm(false);
    setSuccessMessage('Expense added successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDelete = (id) => {
    const updatedExpenses = expenses.filter(exp => exp.id !== id);
    setExpenses(updatedExpenses);
    localStorage_set('expenses', updatedExpenses);
  };

  const filteredExpenses = filterCategory 
    ? expenses.filter(exp => exp.category === filterCategory)
    : expenses;

  const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalAllExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  return (
    <div className={`expense-tracker ${isDarkMode ? 'dark' : ''}`}>
      <h1>📋 {t('expenseTracker')}</h1>
      <p>{t('manageYourFarmExpenses')}</p>

      {successMessage && (
        <Alert 
          type="success" 
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}

      <div className="tracker-container">
        <Card className="summary-card">
          <h2>Summary</h2>
          <div className="summary-stats">
            <div className="stat">
              <span>{t('totalExpensesAmount')}</span>
              <strong className="amount">₹{totalAllExpenses.toLocaleString()}</strong>
            </div>
            <div className="stat">
              <span>Number of Entries</span>
              <strong>{expenses.length}</strong>
            </div>
            <div className="stat">
              <span>Average Per Entry</span>
              <strong>₹{expenses.length > 0 ? (totalAllExpenses / expenses.length).toLocaleString() : '0'}</strong>
            </div>
          </div>
        </Card>

        <Card className="category-breakdown">
          <h2>{t('categoryBreakdown')}</h2>
          <div className="categories-list">
            {Object.entries(categoryTotals).map(([category, total]) => (
              <div key={category} className="category-item">
                <span>{category}</span>
                <span className="category-amount">₹{total.toLocaleString()}</span>
              </div>
            ))}
            {Object.keys(categoryTotals).length === 0 && (
              <p className="no-data">No expenses recorded yet</p>
            )}
          </div>
        </Card>

        {!showForm ? (
          <Button 
            variant="primary" 
            onClick={() => setShowForm(true)}
            className="add-btn"
          >
            + {t('addNew')}
          </Button>
        ) : (
          <Card className="form-card">
            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit}>
              <Select
                label="Category *"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={categoryOptions}
              />

              <Input
                type="number"
                label="Amount (₹) *"
                name="amount"
                placeholder="e.g., 5000"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
              />

              <Input
                type="date"
                label="Date *"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />

              <Input
                type="text"
                label="Description"
                name="description"
                placeholder="e.g., Fertilizer for wheat"
                value={formData.description}
                onChange={handleChange}
              />

              <div className="form-actions">
                <Button variant="primary" type="submit">
                  Save Expense
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        <Card className="expenses-list">
          <h2>Expense History</h2>
          
          <div className="filter-section">
            <Select
              label="Filter by Category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              options={[{ label: 'All Categories', value: '' }, ...categoryOptions]}
            />
            {filterCategory && (
              <p className="filter-info">
                Showing {filteredExpenses.length} expenses for <strong>{filterCategory}</strong>: ₹{totalExpenses.toLocaleString()}
              </p>
            )}
          </div>

          <div className="expenses-table">
            {filteredExpenses.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map(expense => (
                    <tr key={expense.id}>
                      <td>{new Date(expense.date).toLocaleDateString()}</td>
                      <td><Badge variant="info">{expense.category}</Badge></td>
                      <td>{expense.description || '-'}</td>
                      <td className="amount">₹{expense.amount.toLocaleString()}</td>
                      <td>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(expense.id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data">No expenses recorded yet</p>
            )}
          </div>
        </Card>

        <Card className="insights">
          <h2>💡 Financial Insights</h2>
          <ul>
            <li>Track all farming expenses to understand profitability</li>
            <li>Identify highest cost categories and explore ways to optimize</li>
            <li>Compare year-over-year expenses to plan better</li>
            <li>Maintain proper records for government subsidies and loans</li>
            <li>Use expense data for crop profitability analysis</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
