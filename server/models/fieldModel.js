const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Field name is required'],
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    latitude: {
      type: Number,
      required: [true, 'Latitude is required'],
      min: -90,
      max: 90
    },
    longitude: {
      type: Number,
      required: [true, 'Longitude is required'],
      min: -180,
      max: 180
    }
  },
  area: {
    value: {
      type: Number,
      required: [true, 'Area value is required'],
      min: 0
    },
    unit: {
      type: String,
      enum: ['acres', 'hectares', 'squareMeters'],
      default: 'acres'
    }
  },
  cropType: {
    type: String,
    required: [true, 'Crop type is required'],
    trim: true
  },
  soilType: {
    type: String,
    required: [true, 'Soil type is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'fallow', 'preparation', 'harvested'],
    default: 'active'
  },
  plantingDate: {
    type: Date
  },
  expectedHarvestDate: {
    type: Date
  }
}, {
  timestamps: true
});


fieldSchema.index({ location: "2dsphere" });

const Field = mongoose.model('Field', fieldSchema);
module.exports = Field;