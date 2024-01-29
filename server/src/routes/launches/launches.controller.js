const { 
    modelAbortLaunch,
    modelAddLaunch,
    modelDeleteLaunch,
    modelGetAllLaunches,
    modelGetLaunch,
    modelUpdateLaunch,
    modelValidateLaunch
} = require('../../models/launches.model.js');
const {
    isDate,
    validateIsEmpty,
    validateIsNotEmpty
} = require('../../models/validate.js');
const {
    getPagination
} = require('../../services/query.js');

async function httpAbortLaunch(req, res) {
    const flightNumber = Number(req.params.flightNumber || -1);

    console.log('httpAbortLunch', flightNumber, req.body, res.locals.xTraceId);

    try {
        const launch = await modelGetLaunch(flightNumber);
        if (launch) {
            const aborted = await modelAbortLaunch(flightNumber);
            if (aborted) {
                return res
                    .status(200)
                    .header('X-Trace-Id', `${res.locals.xTraceId}`)
                    .json({
                        success: true
                    });
            } else {
                return res
                    .status(409)
                    .header('X-Trace-Id', `${res.locals.xTraceId}`)
                    .json({
                        success: false,
                        error: 'Launch not aborted'
                    })
            }
            } else {
                return res
                    .status(404)
                    .header('X-Trace-Id', `${res.locals.xTraceId}`)
                    .json({
                        success: false,
                        error: 'Launch not found'
                    })
            }
    } catch (err) {
        console.error(err);
        return res
            .status(400)
            .header('X-Trace-Id', `${res.locals.xTraceId}`)
            .json({
                success: false,
                error: err.message
            })
    }
}

async function httpAddLaunch(req, res) {
    const flightNumber = Number(req.body.flightNumber || -1);

    console.log('httpAddLaunch', flightNumber, req.body, res.locals.xTraceId);

    try {
        const newLaunch = req.body;

        const errors = modelValidateLaunch(newLaunch);
        validateIsEmpty(errors, newLaunch.flightNumber, 'Excess launch flightNumber');
        if (errors.length > 0) {
            return res
                .status(400)
                .header('X-Trace-Id', `${res.locals.xTraceId}`)
                .json({
                    success: false,
                    error: 'Invalid Launch',
                    message: errors.join(', ')
                });
        }

        if (!isDate(newLaunch.launchDate)) {
            newLaunch.launchDate = new Date(newLaunch.launchDate);
        }

        const launch = await modelAddLaunch(newLaunch);
        if (launch) {
            return res
                .status(201)
                .header('X-Trace-Id', `${res.locals.xTraceId}`)
                .header('Location', `${req.baseUrl}${req.url}/${launch.flightNumber}`)
                .json(launch);
        } else {
            return res
                .status(409)
                .header('X-Trace-Id', `${res.locals.xTraceId}`)
                .json({
                    success: false,
                    error: 'Launch not added'
                });
        }
    } catch (err) {
        console.error(err);
        return res
            .status(400)
            .header('X-Trace-Id', `${res.locals.xTraceId}`)
            .json({
                success: false,
                error: err.message
            })
    }
}

async function httpDeleteLaunch(req, res) {
    const flightNumber = Number(req.params.flightNumber || -1);

    console.log('httpDeleteLaunch', flightNumber, res.locals.xTraceId);

    try {
        if (await modelDeleteLaunch(flightNumber)) {
            return res
                .status(206)
                .header('X-Trace-Id', `${res.locals.xTraceId}`)
                .end();
        } else {
            return res
                .status(404)
                .header('X-Trace-Id', `${res.locals.xTraceId}`)
                .json({
                    success: false,
                    error: 'Launch not found'
                })
        }
    } catch (err) {
        console.error(err);
        return res
            .status(400)
            .header('X-Trace-Id', `${res.locals.xTraceId}`)
            .json({
                success: false,
                error: err.message
            })
    }
}

async function httpGetAllLaunches(req, res) {
    console.log('httpGetAllLaunches', res.locals.xTraceId, req.query);

    const launches = await modelGetAllLaunches({
        sort: {
            flightNumber: 1
        },
        options: getPagination(req.query)
    });

    return res
        .status(200)
        .header('X-Trace-Id', `${res.locals.xTraceId}`)
        .json(launches);
}

async function httpGetLaunch(req, res) {
    const flightNumber = Number(req.params.flightNumber || -1);

    console.log('httpGetAllLaunches', flightNumber);

    const launch = await modelGetLaunch(flightNumber);
    if (launch) {
        return res
            .status(200)
            .header('X-Trace-Id', `${res.locals.xTraceId}`)
            .json(launch);
    } else {
        return res
            .status(404)
            .header('X-Trace-Id', `${res.locals.xTraceId}`)
            .json({
                success: false,
                error: 'Launch not found'
            })
    }
}

async function httpSubmitLaunch(req, res) {
    const flightNumber = Number(req.body.flightNumber || -1);

    console.log('httpSubmitLaunch', flightNumber, req.body, res.locals.xTraceId);

    if (flightNumber > 0) {
        return await httpUpdateLaunch(req, res);
    } else {
        return await httpAddLaunch(req, res);
    }
}

async function httpUpdateLaunch(req, res) {
    const flightNumber = Number(req.params.flightNumber || -1);

    console.log('httpUpdateLaunch', flightNumber, req.body, res.locals.xTraceId);

    const errors = await modelValidateLaunch(newLaunch);
    validateIsNotEmpty(errors, newLaunch.flightNumber, 'Missing launch flightNumber');
    if (errors.length > 0) {
        return res
            .status(400)
            .header('X-Trace-Id', `${res.locals.xTraceId}`)
            .json({
                success: false,
                error: 'Invalid Launch',
                message: errors.join(', ')
            });
    }

    if (!isDate(newLaunch.launchDate)) {
        newLaunch.launchDate = new Date(newLaunch.launchDate);
    }

    try {
        if (flightNumber == req.body.flightNumber) {
            const launch = await modelUpdateLaunch(req.body);
            if (launch) {
                return res
                    .status(200)
                    .header('X-Trace-Id', `${res.locals.xTraceId}`)
                    .json(launch);
            } else {
                return res
                    .status(404)
                    .header('X-Trace-Id', `${res.locals.xTraceId}`)
                    .json({
                        success: false,
                        error: 'Launch not found'
                    });
            }
        } else {
            return res
                .status(400)
                .header('X-Trace-Id', `${res.locals.xTraceId}`)
                .json({
                    success: false,
                    error: 'Invalid flightNumber'
                });
        }
    } catch (err) {
        console.error(err);
        return res
            .status(400)
            .header('X-Trace-Id', `${res.locals.xTraceId}`)
            .json({
                success: false,
                error: err.message
            })
    }
}

module.exports = {
    httpAbortLaunch,
    httpAddLaunch,
    httpDeleteLaunch,
    httpGetAllLaunches,
    httpGetLaunch,
    httpSubmitLaunch,
    httpUpdateLaunch
}