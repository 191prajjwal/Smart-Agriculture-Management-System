const Field = require('../models/fieldModel');


exports.createField = async (req, res) => {
    try {
        const field = new Field({
            ...req.body,
            owner: req.user._id
        });

        const savedField = await field.save();
        res.status(201).json(savedField);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateField = async (req, res) => {
    try {
        const field = await Field.findOneAndUpdate(
            { _id: req.params.id, owner: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!field) {
            return res.status(404).json({ message: 'Field not found' });
        }

        res.json(field);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteField = async (req, res) => {
    try {
        const field = await Field.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!field) {
            return res.status(404).json({ message: 'Field not found' });
        }

        res.json({ message: 'Field deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





exports.getNearbyFields = async (req, res) => {
    try {
        const { latitude, longitude, radius = 10 } = req.query; 

        const fields = await Field.find({
            owner: req.user._id,
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: radius * 1000 
                }
            }
        });

        res.json(fields);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




exports.getFields = async (req, res) => {
    try {
        const fields = await Field.find({ owner: req.user._id });
        res.json(fields);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getField = async (req, res) => {
    try {
        const field = await Field.findOne({
            _id: req.params.id,
            owner: req.user._id
        });
        
        if (!field) {
            return res.status(404).json({ message: 'Field not found' });
        }
        
        res.json(field);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};