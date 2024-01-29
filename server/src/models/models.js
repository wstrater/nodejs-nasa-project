const { loadLaunchData } = require('./launches.model.js');
const { loadPlanetData } = require('./planets.model.js');

async function initModels() {
    await loadLaunchData();
    await loadPlanetData();
}

module.exports = {
    initModels
}