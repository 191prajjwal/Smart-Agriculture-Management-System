const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    analyzeField,
    getFieldAnalysisHistory,
    getLatestAnalysis
} = require('../controllers/analysisController');

router.use(protect);

router.post('/fields/:fieldId/analyze', analyzeField);
router.get('/fields/:fieldId/history', getFieldAnalysisHistory);
router.get('/fields/:fieldId/latest', getLatestAnalysis);

module.exports = router;