const Field = require('../models/fieldModel');

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
  

exports.createField = async (req, res) => {
    try {
      
      const validationErrors = validateFieldData(req.body);
      if (validationErrors.length > 0) {
        return res.status(400).json({ 
          status: 'error',
          message: 'Validation failed',
          errors: validationErrors 
        });
      }
  
      const field = new Field({
        ...req.body,
        owner: req.user._id
      });
  
      const savedField = await field.save();
      res.status(201).json({
        status: 'success',
        data: savedField
      });
    } catch (error) {
        console.log(error)
      res.status(400).json({
       
        status: 'error',
        message: error.message,
        errors: error.errors ? Object.values(error.errors).map(err => err.message) : []
      });
    }
  };
  
  exports.updateField = async (req, res) => {
    try {
      
      const validationErrors = validateFieldData(req.body);
      if (validationErrors.length > 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: validationErrors
        });
      }
  
      const field = await Field.findOneAndUpdate(
        { _id: req.params.id, owner: req.user._id },
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!field) {
        return res.status(404).json({
          status: 'error',
          message: 'Field not found'
        });
      }
  
      res.json({
        status: 'success',
        data: field
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
        errors: error.errors ? Object.values(error.errors).map(err => err.message) : []
      });
    }
  };

exports.deleteField = async (req, res) => {
    try {
        const field = await Field.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!field) {
            return res.status(404).json({ message: 'Field not found' });
        }

        res.json({ message: 'Field deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





exports.getNearbyFields = async (req, res) => {
    try {
        const { latitude, longitude, radius = 10 } = req.query; 

        const fields = await Field.find({
            owner: req.user._id,
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: radius * 1000 
                }
            }
        });

        res.json(fields);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




exports.getFields = async (req, res) => {
    try {
        const fields = await Field.find({ owner: req.user._id });
        res.json(fields);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getField = async (req, res) => {
    try {
        const field = await Field.findOne({
            _id: req.params.id,
            owner: req.user._id
        });
        
        if (!field) {
            return res.status(404).json({ message: 'Field not found' });
        }
        
        res.json(field);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};