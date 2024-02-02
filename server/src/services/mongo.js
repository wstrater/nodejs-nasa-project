const mongoose = require('mongoose');

require('dotenv').config();

const { loadLaunchData } = require('../models/launches.model.js');
const { loadPlanetData } = require('../models/planets.model.js');

const MONGO_CONNECTION = process.env.MONGO_CONNECTION || 'learnmongodb.whe2o7y.mongodb.net/nasa?retryWrites=true&w=majority';
const MONGO_USER = process.env.MONGO_USER || 'nasa-api';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const MONGO_URL = process.env.MONGO_URL || `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CONNECTION}`;

async function finalizeMongo() {
    mongoose.disconnect();
}

async function initializeMongo() {
    console.log('initializeMongo', `${MONGO_USER}@${MONGO_CONNECTION}`);

    mongoose.connection.once('open', () => {
        console.log(`MongoDB Connected: ${MONGO_USER}@${MONGO_CONNECTION}`);
    });

    mongoose.connection.on('error', err => {
        console.error(err);
    })

    // console.log('initializeMongo', MONGO_URL);
    await mongoose.connect(MONGO_URL);

    await loadPlanetData();
    await loadLaunchData();
}

module.exports = {
    finalizeMongo, 
    initializeMongo
}
