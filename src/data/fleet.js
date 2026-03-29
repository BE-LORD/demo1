// Fleet Data Configuration
// Update this file to modify vehicle types displayed on the platform

export const fleetData = [
  {
    id: 'sedan',
    emoji: '🚗',
    name: 'Sedan',
    capacity: '4 seats',
    category: 'Economy',
    models: 'Dzire, Amaze',
    features: ['AC', 'Comfortable', 'GPS Tracking', 'Music System'],
    badge: null,
    carType: 'Sedan'
  },
  {
    id: 'suv',
    emoji: '🚙',
    name: 'SUV',
    capacity: '6 seats',
    category: 'Spacious',
    models: 'Ertiga, Innova',
    features: ['AC', 'Extra Luggage Space', 'GPS Tracking', 'Premium Comfort'],
    badge: 'Most Popular',
    carType: 'SUV'
  },
  {
    id: 'premium',
    emoji: '⭐',
    name: 'Premium',
    capacity: '4 seats',
    category: 'Luxury',
    models: 'Ciaz, City',
    features: ['AC', 'Luxury Interior', 'GPS Tracking', 'Premium Sound System'],
    badge: null,
    carType: 'Premium'
  }
];
