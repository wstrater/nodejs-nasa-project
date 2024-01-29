const express = require('express');

const launchesRouter = require('./launches/launches.router.js');
const planetsRouter = require('./planets/planets.router.js');

const api = express.Router();

api.use('/launches', launchesRouter);
api.use('/planets', planetsRouter);

module.exports = api;
