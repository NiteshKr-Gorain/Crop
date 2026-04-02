// Mock API service - simulates backend API calls
export const apiService = {
  // Crop Recommendation
  getCropRecommendation: async (soilType, location, season, temperature, rainfall) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const recommendations = {
          clay: ['Rice', 'Wheat', 'Sugarcane'],
          loam: ['Corn', 'Soybean', 'Wheat'],
          sandy: ['Peanut', 'Watermelon', 'Millet'],
          peat: ['Vegetable', 'Potato', 'Carrot']
        };

        const crops = recommendations[soilType] || ['Wheat', 'Rice', 'Corn'];
        resolve({
          success: true,
          data: {
            recommendedCrops: crops,
            confidence: Math.random() * 40 + 60, // 60-100%
            reasoning: `Based on soil type (${soilType}), location (${location}), season (${season}), temperature (${temperature}°C), and rainfall (${rainfall}mm).`,
            estimatedYield: Math.random() * 50 + 30
          }
        });
      }, 800);
    });
  },

  // Weather data
  getWeatherData: async (location) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            location,
            temperature: Math.random() * 20 + 15,
            humidity: Math.random() * 40 + 40,
            rainfall: Math.random() * 100,
            windSpeed: Math.random() * 20,
            uvIndex: Math.random() * 10,
            condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
            forecast: Array(7).fill(0).map((_, i) => ({
              day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
              temp: Math.random() * 20 + 15,
              condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)]
            }))
          }
        });
      }, 600);
    });
  },

  // Disease detection
  detectDisease: async (imageData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const diseases = [
          { name: 'Leaf Spot', confidence: 85, severity: 'Medium', treatment: 'Apply fungicide spray' },
          { name: 'Powdery Mildew', confidence: 92, severity: 'High', treatment: 'Use sulfur-based fungicide' },
          { name: 'Bacterial Blight', confidence: 78, severity: 'High', treatment: 'Remove affected leaves and apply copper fungicide' },
          { name: 'Healthy Leaf', confidence: 100, severity: 'None', treatment: 'Continue regular monitoring' }
        ];

        const detected = diseases[Math.floor(Math.random() * diseases.length)];
        resolve({
          success: true,
          data: detected
        });
      }, 1200);
    });
  },

  // Irrigation recommendation
  getIrrigationAdvice: async (soilType, cropType, temperature, rainfall) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const waterNeeds = {
          'Rice': 1200,
          'Wheat': 450,
          'Corn': 500,
          'Cotton': 500,
          'Sugarcane': 1500,
          'Potato': 400
        };

        const needed = waterNeeds[cropType] || 600;
        const scheduling = {
          frequency: Math.ceil(needed / 10),
          duration: '2-4 hours',
          bestTime: 'Early morning or evening'
        };

        resolve({
          success: true,
          data: {
            cropType,
            waterRequired: needed,
            scheduling,
            moisture: Math.random() * 40 + 30,
            prediction: 'Irrigation needed in 3 days'
          }
        });
      }, 700);
    });
  },

  // Get government schemes
  getGovernmentSchemes: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: 1,
              name: 'PM-KISAN',
              title: 'Pradhan Mantri Kisan Samman Nidhi',
              description: 'Direct income support scheme for farmers',
              benefits: '₹6000 per year in 3 installments',
              eligibility: 'All farmer families with landholding',
              status: 'Active',
              type: 'Income Support'
            },
            {
              id: 2,
              name: 'PMFBY',
              title: 'Pradhan Mantri Fasal Bima Yojana',
              description: 'Crop insurance scheme',
              benefits: 'Protection against crop loss',
              eligibility: 'Farmers growing notified crops',
              status: 'Active',
              type: 'Insurance'
            },
            {
              id: 3,
              name: 'Soil Health Card',
              title: 'Soil Health Card Scheme',
              description: 'Free soil testing and health status card',
              benefits: 'Know soil nutrient status, get recommendations',
              eligibility: 'All farmers',
              status: 'Active',
              type: 'Advisory'
            },
            {
              id: 4,
              name: 'KCC',
              title: 'Kisan Credit Card',
              description: 'Credit facility for agricultural needs',
              benefits: 'Easy credit access at low interest',
              eligibility: 'Farmers with land holdings',
              status: 'Active',
              type: 'Credit'
            }
          ]
        });
      }, 500);
    });
  },

  // Voice assistant (mock)
  processVoiceCommand: async (command, language) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = {
          weather: 'Current weather shows sunny conditions with 35°C temperature',
          crop: 'Based on your soil type, I recommend growing Rice or Wheat',
          disease: 'Your crop appears healthy. Continue regular monitoring',
          irrigation: 'Your field needs irrigation. Schedule for tomorrow morning'
        };

        resolve({
          success: true,
          data: {
            response: Object.values(responses)[Math.floor(Math.random() * Object.values(responses).length)],
            understood: true
          }
        });
      }, 1000);
    });
  },

  // Expense tracking
  getExpenses: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 1, category: 'Seeds', amount: 5000, date: '2025-01-15', description: 'Wheat seeds' },
            { id: 2, category: 'Fertilizer', amount: 8000, date: '2025-01-20', description: 'NPK fertilizer' },
            { id: 3, category: 'Labor', amount: 12000, date: '2025-02-01', description: 'Field preparation' },
            { id: 4, category: 'Equipment', amount: 3000, date: '2025-02-05', description: 'Tools maintenance' }
          ]
        });
      }, 500);
    });
  },

  addExpense: async (expense) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: { ...expense, id: Date.now() }
        });
      }, 300);
    });
  },

  // Marketplace
  getMarketplaceListings: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 1, title: 'Organic Wheat (100kg)', seller: 'Farmer A', price: 20000, location: 'Punjab', rating: 4.5 },
            { id: 2, title: 'Rice Seeds', seller: 'Farmer B', price: 8000, location: 'Bihar', rating: 4.8 },
            { id: 3, title: 'Fresh Vegetables', seller: 'Farmer C', price: 5000, location: 'Haryana', rating: 4.2 }
          ]
        });
      }, 500);
    });
  },

  // Crop advisory
  getCropAdvisory: async (cropType, location, season) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            cropType,
            location,
            season,
            advices: [
              'Water your crop every 3 days for optimal growth',
              'Apply NPK fertilizer in two split doses',
              'Monitor for common pests like stem borers',
              'Harvest when crop turns golden brown'
            ],
            criticalPeriods: [
              'Flowering stage (30-45 days)',
              'Grain filling stage (60-80 days)'
            ]
          }
        });
      }, 600);
    });
  }
};
