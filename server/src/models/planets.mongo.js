const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    kepId: {
        type: String,
        required: true
    },
    keplerName: {
        type: String,
        unique: true,
        required: true
    },
    habitable: {
        type: Boolean,
        required: true,
        default: false
    },
    koiDisposition: {
        type: String,
        required: true
    },
    koiInsol: {
        type: Number,
        required: true
    },
    koiPrad: {
        type: Number,
        required: true
    }
});

const Planet = mongoose.model('Planet', schema);

module.exports = {
    Planet
}