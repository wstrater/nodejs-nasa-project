const mongoose = require('mongoose');

require('dotenv').config();

const { loadLaunchData } = require('../models/launches.model.js');
const { loadPlanetData } = require('../models/planets.model.js');

const MONGO_URL = process.env.MONGO_URL || 'learnmongodb.whe2o7y.mongodb.net/nasa';
const MONGO_USER = process.env.MONGO_USER || 'nasa-api';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const mongoUri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}?retryWrites=true&w=majority`;

async function finalizeMongo() {
    mongoose.disconnect();
}

async function initializeMongo() {
    console.log('initializeMongo', `${MONGO_USER}@${MONGO_URL}`);

    mongoose.connection.once('open', () => {
        console.log(`MongoDB Connected: ${MONGO_USER}@${MONGO_URL}`);
    });

    mongoose.connection.on('error', err => {
        console.error(err);
    })

    await mongoose.connect(mongoUri);

    await loadPlanetData();
    await loadLaunchData();
}

module.exports = {
    finalizeMongo, 
    initializeMongo
}
