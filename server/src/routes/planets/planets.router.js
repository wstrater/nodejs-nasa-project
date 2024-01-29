const express = require('express');

const {
    httpGetAllPlanets
} = require('./planets.controller.js');

const router = express.Router();

console.log(httpGetAllPlanets);

router.get('', httpGetAllPlanets);

module.exports = router;
