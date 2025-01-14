const Field = require('../models/fieldModel');
const validateFieldData = require('../utils/fieldValidator')


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