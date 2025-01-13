const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
    fieldId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Field',
        required: true
    },
    soilHealth: {
        ph: {
            value: Number,
            status: {
                type: String,
                enum: ['poor', 'fair', 'good', 'excellent']
            }
        },
        nutrients: {
            nitrogen: Number,
            phosphorus: Number,
            potassium: Number,
            status: {
                type: String,
                enum: ['deficient', 'adequate', 'optimal', 'excessive']
            }
        },
        organicMatter: {
            percentage: Number,
            status: {
                type: String,
                enum: ['low', 'medium', 'high']
            }
        },
        moisture: {
            percentage: Number,
            status: {
                type: String,
                enum: ['dry', 'moderate', 'wet']
            }
        }
    },
    cropHealth: {
        ndvi: {
            value: Number,
            status: {
                type: String,
                enum: ['poor', 'fair', 'good', 'excellent']
            }
        },
        growth: {
            stage: String,
            status: {
                type: String,
                enum: ['behind', 'normal', 'ahead']
            }
        },
        pestRisk: {
            level: {
                type: String,
                enum: ['low', 'medium', 'high']
            },
            details: String
        },
        diseaseRisk: {
            level: {
                type: String,
                enum: ['low', 'medium', 'high']
            },
            details: String
        }
    },
    recommendations: [{
        type: String
    }],
    analysisDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Analysis = mongoose.model('Analysis', analysisSchema);
module.exports = Analysis;