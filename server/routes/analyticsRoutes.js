const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getFieldStatistics,
    getSoilHealthTrends,
    getCropHealthMetrics,
    getYieldPredictions
} = require('../controllers/analyticsController');

router.use(protect);

router.get('/field-statistics', getFieldStatistics);
router.get('/soil-health/:fieldId', getSoilHealthTrends);
router.get('/crop-health/:fieldId', getCropHealthMetrics);
router.get('/yield-predictions/:fieldId', getYieldPredictions);

module.exports = router;