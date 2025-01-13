const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    planName: {
        type: String,
        required: true,
        enum: ['basic', 'premium', 'enterprise']
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,  
        required: true
    },
    features: [{
        type: String
    }],
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports=Subscription