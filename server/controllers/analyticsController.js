// controllers/analyticsController.js
const Field = require('../models/fieldModel');
const Analysis = require('../models/analysisModel');

exports.getFieldStatistics = async (req, res) => {
    try {
        const userId = req.user._id;

       
        const fields = await Field.find({ owner: userId });

      
        const stats = {
            totalFields: fields.length,
            totalArea: fields.reduce((sum, field) => sum + field.area.value, 0),
            cropDistribution: {},
            soilTypeDistribution: {}
        };

        
        fields.forEach(field => {
            stats.cropDistribution[field.cropType] = (stats.cropDistribution[field.cropType] || 0) + 1;
            stats.soilTypeDistribution[field.soilType] = (stats.soilTypeDistribution[field.soilType] || 0) + 1;
        });

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSoilHealthTrends = async (req, res) => {
    try {
        const { fieldId } = req.params;
        const timespan = req.query.timespan || '6months'; 
        const endDate = new Date();
        const startDate = new Date();
        switch(timespan) {
            case '1month':
                startDate.setMonth(endDate.getMonth() - 1);
                break;
            case '3months':
                startDate.setMonth(endDate.getMonth() - 3);
                break;
            case '6months':
                startDate.setMonth(endDate.getMonth() - 6);
                break;
            case '1year':
                startDate.setFullYear(endDate.getFullYear() - 1);
                break;
        }

        
        const analyses = await Analysis.find({
            fieldId,
            analysisDate: {
                $gte: startDate,
                $lte: endDate
            }
        }).sort('analysisDate');

        const trends = {
            dates: [],
            ph: [],
            nitrogen: [],
            phosphorus: [],
            potassium: [],
            moisture: []
        };

        analyses.forEach(analysis => {
            trends.dates.push(analysis.analysisDate);
            trends.ph.push(analysis.soilHealth.ph.value);
            trends.nitrogen.push(analysis.soilHealth.nutrients.nitrogen);
            trends.phosphorus.push(analysis.soilHealth.nutrients.phosphorus);
            trends.potassium.push(analysis.soilHealth.nutrients.potassium);
            trends.moisture.push(analysis.soilHealth.moisture.percentage);
        });

        res.json(trends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCropHealthMetrics = async (req, res) => {
    try {
        const { fieldId } = req.params;
        
       
        const analyses = await Analysis.find({ fieldId })
            .sort('-analysisDate')
            .limit(10);

        const metrics = {
            ndviTrend: analyses.map(a => ({
                date: a.analysisDate,
                value: a.cropHealth.ndvi.value,
                status: a.cropHealth.ndvi.status
            })),
            growthStages: analyses.map(a => ({
                date: a.analysisDate,
                stage: a.cropHealth.growth.stage,
                status: a.cropHealth.growth.status
            })),
            riskAssessment: analyses.map(a => ({
                date: a.analysisDate,
                pestRisk: a.cropHealth.pestRisk.level,
                diseaseRisk: a.cropHealth.diseaseRisk.level
            }))
        };

        res.json(metrics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getYieldPredictions = async (req, res) => {
    try {
        const { fieldId } = req.params;
        const field = await Field.findById(fieldId);
        
       
        const latestAnalysis = await Analysis.findOne({ fieldId })
            .sort('-analysisDate');

        
        const baseYield = 100; 
        const ndviFactor = latestAnalysis.cropHealth.ndvi.value;
        const healthFactors = {
            'poor': 0.7,
            'fair': 0.85,
            'good': 1,
            'excellent': 1.15
        };

        const prediction = {
            estimatedYield: baseYield * ndviFactor * healthFactors[latestAnalysis.cropHealth.ndvi.status],
            confidenceLevel: calculateConfidenceLevel(latestAnalysis),
            factors: {
                ndviImpact: ndviFactor,
                soilHealthImpact: healthFactors[latestAnalysis.soilHealth.ph.status],
                pestRiskImpact: latestAnalysis.cropHealth.pestRisk.level
            }
        };

        res.json(prediction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const calculateConfidenceLevel = (analysis) => {
    let confidence = 0.8; 
    if (analysis.soilHealth.ph.status === 'poor') confidence -= 0.1;
    if (analysis.cropHealth.pestRisk.level === 'high') confidence -= 0.15;
    if (analysis.cropHealth.diseaseRisk.level === 'high') confidence -= 0.15;

    return Math.max(confidence, 0.4); 
};