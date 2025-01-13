export const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}`

console.log(API_BASE_URL)

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  FIELDS: {
    BASE: '/fields',
    NEARBY: '/fields/nearby',
  },
  ANALYSIS: {
    ANALYZE: (fieldId) => `/analysis/fields/${fieldId}/analyze`,
    HISTORY: (fieldId) => `/analysis/fields/${fieldId}/history`,
    LATEST: (fieldId) => `/analysis/fields/${fieldId}/latest`,
  },
  ANALYTICS: {
    FIELD_STATS: '/analytics/field-statistics',
    SOIL_HEALTH: (fieldId) => `/analytics/soil-health/${fieldId}`,
    CROP_HEALTH: (fieldId) => `/analytics/crop-health/${fieldId}`,
    YIELD_PREDICTIONS: (fieldId) => `/analytics/yield-predictions/${fieldId}`,
  },
  PAYMENTS: {
    PLANS: '/payments/subscription-plans',
    CREATE_ORDER: '/payments/create-order',
    VERIFY: '/payments/verify-payment',
    HISTORY: '/payments/payment-history',
  },
};