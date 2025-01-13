const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createOrder,
    verifyPayment,
    getSubscriptionPlans,
    getPaymentHistory
} = require('../controllers/paymentController');

router.use(protect);

router.get('/subscription-plans', getSubscriptionPlans);
router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);
router.get('/payment-history', getPaymentHistory);

module.exports = router;