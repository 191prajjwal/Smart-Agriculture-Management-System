const Razorpay = require('razorpay');
const crypto = require('crypto');
const  Subscription= require('../models/subscriptionModel');
const   Transaction= require('../models/transactionModel');
const User = require('../models/userModel');


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});



exports.createOrder = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.body.subscriptionId);
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription plan not found' });
        }

        const options = {
            amount: subscription.price * 100, 
            currency: 'INR',
            receipt: `order_${new Date().getTime()}`
        };

        const order = await razorpay.orders.create(options);

        
        const transaction = await Transaction.create({
            user: req.user._id,
            subscription: subscription._id,
            razorpayOrderId: order.id,
            amount: subscription.price
        });

        res.json({
            orderId: order.id,
            currency: order.currency,
            amount: order.amount,
            transactionId: transaction._id
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
        } = req.body;

       
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (!isAuthentic) {
            return res.status(400).json({ message: 'Payment verification failed' });
        }

       
        const transaction = await Transaction.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            {
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
                status: 'completed',
                paymentDate: new Date()
            },
            { new: true }
        );

        
        await User.findByIdAndUpdate(req.user._id, {
            activeSubscription: transaction.subscription,
            subscriptionEndDate: calculateSubscriptionEndDate(transaction.subscription)
        });

        res.json({
            message: 'Payment verified successfully',
            transaction
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getSubscriptionPlans = async (req, res) => {
    try {
        const plans = await Subscription.find({ active: true });
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getPaymentHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id })
            .populate('subscription')
            .sort({ createdAt: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const calculateSubscriptionEndDate = (subscription) => {
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + subscription.duration);
    return endDate;
};