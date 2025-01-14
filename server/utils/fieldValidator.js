const validateFieldData = (data) => {
    const errors = [];
  
   
    if (!data.name || !data.name.trim()) {
      errors.push('Field name is required');
    } else if (data.name.length > 100) {
      errors.push('Field name must be less than 100 characters');
    }
  
    
    if (!data.cropType || !data.cropType.trim()) {
      errors.push('Crop type is required');
    } else if (data.cropType.length > 50) {
      errors.push('Crop type must be less than 50 characters');
    }
  
    
    if (!data.soilType || !data.soilType.trim()) {
      errors.push('Soil type is required');
    } else if (data.soilType.length > 50) {
      errors.push('Soil type must be less than 50 characters');
    }
  
    
    if (!data.area || typeof data.area.value !== 'number') {
      errors.push('Area value is required and must be a number');
    } else if (data.area.value <= 0 || data.area.value > 10000) {
      errors.push('Area value must be between 0 and 10,000');
    }
  
    if (!['acres', 'hectares', 'squareMeters'].includes(data.area.unit)) {
      errors.push('Invalid area unit');
    }
  
   
    if (!data.location || 
        typeof data.location.latitude !== 'number' || 
        typeof data.location.longitude !== 'number') {
      errors.push('Location coordinates are required and must be numbers');
    } else {
      if (data.location.latitude < -90 || data.location.latitude > 90) {
        errors.push('Latitude must be between -90 and 90');
      }
      if (data.location.longitude < -180 || data.location.longitude > 180) {
        errors.push('Longitude must be between -180 and 180');
      }
    }
  
   
    if (data.status && !['active', 'fallow', 'preparation', 'harvested'].includes(data.status)) {
      errors.push('Invalid status value');
    }
  
    return errors;
  };


  module.exports = validateFieldData