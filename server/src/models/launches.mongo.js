const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    externalId: {
        type: String,
        required: false
    },
    externalSource: {
        type: String,
        required: false
    },
    flightNumber: {
        type: Number,
        required: true,
        unique: false
    },
    mission: {
        type: String,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    target: {
        type: String,
        required: false
    },
    customers: [
        {
            type: String
        }
    ],
    upcoming: {
        type: Boolean,
        default: true,
        required: true
    },
    success: {
        type: Boolean,
        default: true,
        required: true
    }
});

const Launch = mongoose.model('Launch', schema);

module.exports = {
    Launch
}
