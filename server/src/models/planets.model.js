const fs = require('fs');
const path = require('path');

const { parse } = require('csv-parse');

const { Planet } = require('./planets.mongo.js')
const {
    validateIsBooleanOrEmpty,
    validateIsDateValue,
    validateIsNotEmpty,
    validateIsNumberOrEmpty
} = require('./validate.js');

let habitableCount = 0;
let skipCount = 0;

function isHabitable(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] >= 0.36
        && planet['koi_insol'] <= 1.11
        && planet['koi_prad'] <= 1.6;
}

function loadPlanetData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true
            }))
            .on('data', async (planet) => {
                if (isHabitable(planet)) {
                    habitableCount++;
                    await modelAddPlanet({
                        kepId: planet.kepid,
                        keplerName: planet.kepler_name,
                        koiDisposition: planet.koi_disposition,
                        koiInsol: planet.koi_insol,
                        koiPrad: planet.koi_prad,
                        habitable: true
                    });
                } else {
                    skipCount++
                }
            })
            .on('error', err => {
                console.error(err);
                reject(err);
            })
            .on('end', async () => {
                console.log('habitableCount', habitableCount);
                console.log('skipCount', skipCount);
                console.log('End of File');
                const mongoPlanets = (await modelGetAllPlanets(true));
                console.log('mongoCount', mongoPlanets.length);
                console.log('mongoPlanets', mongoPlanets.map(planet => planet.keplerName));
                resolve(habitableCount);
            });
    });
}

async function modelAddPlanet(planet) {
    console.log('modelAddPlanet', planet);

    if (typeof planet.kepId != 'string' || planet.kepId.trim().length == 0) {
        throw new Error('Missing or invalid kepId');
    } else if (typeof planet.keplerName != 'string' || planet.keplerName.trim().length == 0) {
        throw new Error('Missing or invalid keplerName');
    }

    try {
        const results = await Planet.updateOne(
            {
                keplerName: planet.keplerName
            },
            planet,
            {
                upsert: true
            }
        );

        console.log('modelAddPlanet results', results);

        return planet;
    } catch(err) {
        console.log(modelAddPlanet, err);

        return [];
    }
}

async function modelGetAllPlanets(habitable = true) {
    console.log('modelGetAllPlanets', habitable);

    const query = {};
    if (habitable) {
        query.habitable = true;
    }

    const results = await Planet
        .find(query)
        .select({
            _id: 0,
            __v: 0
        })
        .sort({
            keplerName: 1
        })
        .exec();

    console.log('modelGetAllPlanets', results.length);

    return results;
}

module.exports = {
    loadPlanetData,
    modelAddPlanet,
    modelGetAllPlanets
}
