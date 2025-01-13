const mongoose = require('mongoose');
const  Subscription  = require('../models/subscriptionModel');
require('dotenv').config();

const subscriptionPlans = [
    {
        planName: 'basic',
        price: 499,
        duration: 1, 
        features: ['Soil Analysis', 'Basic Crop Monitoring']
    },
    {
        planName: 'premium',
        price: 999,
        duration: 3, 
        features: ['Soil Analysis', 'Advanced Crop Monitoring', 'Pest Detection']
    },
    {
        planName: 'enterprise',
        price: 2499,
        duration: 12, 
        features: ['All Features', 'Priority Support', 'Custom Reports']
    }
];

const seedSubscriptions = async () => {
    try {
       
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');

       
        await Subscription.deleteMany({});
        console.log('Deleted existing subscription plans');

       
        const createdSubscriptions = await Subscription.insertMany(subscriptionPlans);
        console.log('Added subscription plans:', createdSubscriptions);

        console.log('Seeding completed successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedSubscriptions();