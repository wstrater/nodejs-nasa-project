const { 
    modelGetAllPlanets
} = require('../../models/planets.model.js');

async function httpGetAllPlanets(req, res) {
    console.log('httpGetAllPlanets', res.locals.xTraceId);

    return res
        .status(200)
        .header('X-Trace-Id', `${res.locals.xTraceId}`)
        .json(await modelGetAllPlanets());
}

module.exports = {
    httpGetAllPlanets
}
