const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contactInfo: {
        type: String
    }
});

module.exports = mongoose.model('Owner', ownerSchema);
