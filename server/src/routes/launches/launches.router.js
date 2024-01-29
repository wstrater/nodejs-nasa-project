const express = require('express');

const {
    httpAbortLaunch,
    httpAddLaunch,
    httpDeleteLaunch,
    httpGetAllLaunches,
    httpGetLaunch,
    httpUpdateLaunch
} = require('./launches.controller.js');

const router = express.Router();

router.get('', httpGetAllLaunches);
router.post('', httpAddLaunch);
router.delete('/:flightNumber', httpAbortLaunch);
router.get('/:flightNumber', httpGetLaunch);
router.put('/:flightNumber', httpUpdateLaunch);

module.exports = router;
