const Analysis = require('../models/analysisModel');
const Field = require('../models/fieldModel');


const randomRange = (min, max) => {
    return Math.random() * (max - min) + min;
};



const generateSoilHealthData = () => {
    const ph = randomRange(5.5, 7.5);
    const phStatus = 
        ph < 6.0 ? 'poor' :
        ph < 6.5 ? 'fair' :
        ph < 7.0 ? 'good' : 'excellent';

    return {
        ph: {
            value: Number(ph.toFixed(2)),
            status: phStatus
        },
        nutrients: {
            nitrogen: Number(randomRange(20, 60).toFixed(1)),
            phosphorus: Number(randomRange(10, 30).toFixed(1)),
            potassium: Number(randomRange(150, 250).toFixed(1)),
            status: ['deficient', 'adequate', 'optimal', 'excessive'][Math.floor(Math.random() * 4)]
        },
        organicMatter: {
            percentage: Number(randomRange(2, 6).toFixed(1)),
            status: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
        },
        moisture: {
            percentage: Number(randomRange(20, 40).toFixed(1)),
            status: ['dry', 'moderate', 'wet'][Math.floor(Math.random() * 3)]
        }
    };
};


const generateCropHealthData = (cropType) => {
    const ndviValue = randomRange(0.3, 0.9);
    const ndviStatus = 
        ndviValue < 0.4 ? 'poor' :
        ndviValue < 0.6 ? 'fair' :
        ndviValue < 0.8 ? 'good' : 'excellent';

    return {
        ndvi: {
            value: Number(ndviValue.toFixed(2)),
            status: ndviStatus
        },
        growth: {
            stage: ['seedling', 'vegetative', 'flowering', 'ripening'][Math.floor(Math.random() * 4)],
            status: ['behind', 'normal', 'ahead'][Math.floor(Math.random() * 3)]
        },
        pestRisk: {
            level: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
            details: 'Based on current weather conditions and crop stage'
        },
        diseaseRisk: {
            level: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
            details: 'Analyzed based on humidity and temperature patterns'
        }
    };
};


const generateRecommendations = (soilHealth, cropHealth) => {
    const recommendations = [];

  
    if (soilHealth.ph.status === 'poor') {
        recommendations.push('Consider applying lime to increase soil pH');
    }
    if (soilHealth.nutrients.status === 'deficient') {
        recommendations.push('Apply balanced NPK fertilizer');
    }
    if (soilHealth.moisture.status === 'dry') {
        recommendations.push('Increase irrigation frequency');
    }

  
    if (cropHealth.ndvi.status === 'poor') {
        recommendations.push('Investigate potential nutrient deficiencies');
    }
    if (cropHealth.pestRisk.level === 'high') {
        recommendations.push('Schedule pest inspection and consider preventive measures');
    }
    if (cropHealth.diseaseRisk.level === 'high') {
        recommendations.push('Monitor for disease symptoms and consider fungicide application');
    }

    return recommendations;
};


exports.analyzeField = async (req, res) => {
    try {
        const field = await Field.findOne({
            _id: req.params.fieldId,
            owner: req.user._id
        });

        if (!field) {
            return res.status(404).json({ message: 'Field not found' });
        }

     
        const soilHealth = generateSoilHealthData();
        const cropHealth = generateCropHealthData(field.cropType);
        const recommendations = generateRecommendations(soilHealth, cropHealth);

        const analysis = await Analysis.create({
            fieldId: field._id,
            soilHealth,
            cropHealth,
            recommendations
        });

        res.status(201).json(analysis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getFieldAnalysisHistory = async (req, res) => {
    try {
        const analyses = await Analysis.find({
            fieldId: req.params.fieldId
        }).sort({ analysisDate: -1 });

        res.json(analyses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getLatestAnalysis = async (req, res) => {
    try {
        const analysis = await Analysis.findOne({
            fieldId: req.params.fieldId
        }).sort({ analysisDate: -1 });

        if (!analysis) {
            return res.status(404).json({ message: 'No analysis found for this field' });
        }

        res.json(analysis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};