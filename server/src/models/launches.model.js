const axios = require('axios');

const { Counter } = require('./counters.mongo.js')
const { Launch } = require('./launches.mongo.js')
const { Planet } = require('./planets.mongo.js')
const {
    isBoolean,
    validateIsBooleanOrEmpty,
    validateIsDateValue,
    validateIsNotEmpty,
    validateIsNumberOrEmpty
} = require('./validate.js');

const SPACEX_LAUNCHES_API_URL = process.env.SPACEX_LAUNCHES_API_URL || 'https://api.spacexdata.com/v5/launches';

async function loadLaunchData() {
    // Find the greatest loaded flightNumber from SpaceX
    const flightNumbers = await Launch.aggregate(
        [
            { 
                $match: {
                    externalSource: 'SpaceX'
                }
            },
            {
                $group: {
                    _id: null,
                    flightNumber: {
                        $max: "$flightNumber"
                    }
                }
            }
        ]);

    let maxFlightNumber = 0;
    if (flightNumbers.length > 0) {
        maxFlightNumber = flightNumbers[0].flightNumber;
    }

    const query = {
        flight_number: {
            $gt: maxFlightNumber
        }
    };

    console.log('SpaceX query', query);

    // Page through missing SpaceX launches
    let nextPage = 1;
    while (nextPage) {
        const response = await axios.post(`${SPACEX_LAUNCHES_API_URL}/query`, {
            query: query,
            options: {
                pagination: true,
                limit: 20,
                page: nextPage,
                select: {
                    date_utc: 1,
                    flight_number: 1,
                    name: 1,
                    success: 1,
                    upcoming: 1
                },
                populate: [
                    {
                        path: 'payloads',
                        select: {
                            customers: 1
                        }
                    },
                    {
                        path: 'rocket',
                        select: {
                            name: 1
                        }
                    }
                ]
            }
        });

        // console.log('SpaceX response', response);
        if (response.status != 200) {
            console.error('Error downloading SpaceX Launches', response.status, response.data);
            break;
        }

        nextPage = response.data.nextPage;

        // Map SpaceX Launches to our Model
        for (const doc of response.data.docs) {
            // console.log('SpaceX doc', doc);

            const launch = {
                externalId: doc.id,
                externalSource: 'SpaceX',
                customers: doc.payloads.flatMap(payload => payload.customers),
                flightNumber: doc.flight_number,
                launchDate: new Date(doc.date_utc),
                mission: doc.name,
                rocket: doc.rocket.name,
                success: isBoolean(doc.success) ? doc.success : false,
                // target: 'Orbit',
                upcoming: isBoolean(doc.upcoming) ? doc.upcoming : false
            }

            // console.log('SpaceX launch', launch);
            console.log(launch.flightNumber, launch.mission);

            // Save the SpaceX Launch
            // await modelAddLaunch(launch);
            await Launch.updateOne(
                {
                    externalId: launch.externalId,
                    externalSource: launch.externalSource
                },
                launch,
                {
                    upsert: true
                }
            );
        }
    }

    // Ensure that the Counter is greater than any Launch.
    const nextFlightNumber = await modelNextFlightNumber();

    const counter = Counter.findOne({
        collectionName: 'launches',
        propertyName: 'flightNumber'
    });

    if (counter) {
        if (counter.counterValue < nextFlightNumber) {
            console.log('Updating Counter', nextFlightNumber);

            Counter.updateOne({
                collectionName: 'launches',
                propertyName: 'flightNumber',
                counterValue: counter.counterValue
            },
            {
                $set: {
                    counterValue: nextFlightNumber
                }
            });
        }
    } else {
        console.log('Creating Counter', nextFlightNumber);

        Counter.create({
            collectionName: 'launches',
            propertyName: 'flightNumber',
            counterValue: nextFlightNumber
        })
    }
}

async function modelAbortLaunch(flightNumber) {
    const id = Number(flightNumber || -1);

    console.log('modelAbortLaunch', id);

    const results = await Launch.updateOne(
        {
            flightNumber: id
        },
        {
            success: false,
            upcoming: false
        }
    )

    console.log('modelAbortLaunch', results);

    return results.modifiedCount > 0;
}

async function modelAddLaunch(launch) {
    console.log('modelAddLaunch', launch);

    if (launch.target) {
        const planet = await Planet.findOne({
            keplerName: launch.target
        });
        if (!planet) {
            throw new Error('Invalid launch target');
        }
    }

    // Default values
    const newLaunch = Object.assign(
        {
            success: true,
            upcoming: true
        },
        launch
    );

    let results;

    if (newLaunch.flightNumber) {
        console.log('modelAddLaunch upsert', newLaunch.flightNumber, newLaunch);

        results = await Launch
            .updateOne({
                flightNumber: newLaunch.flightNumber
            },
            newLaunch,
            {
                upsert: true
            });
    } else {
        // const flightNumber = await Counter.nextValue('launches', 'flightNumber', 100, 10);

        // newLaunch.flightNumber = flightNumber;

        // console.log('modelAddLaunch create', newLaunch.flightNumber, newLaunch);

        // results = await Launch.create(newLaunch);

        // console.log('modelAddLaunch results', results);

        await Counter.withNextValue({
            collectionName: 'launches',
            propertyName: 'flightNumber',
            startValue: 100,
            incValue: 10
        }, async (nextValue) => {
            newLaunch.flightNumber = nextValue;

            console.log('modelAddLaunch create', newLaunch.flightNumber, newLaunch);

            results = await Launch.findOneAndUpdate(
                {
                    flightNumber: newLaunch.flightNumber
                },
                newLaunch,
                {
                    upsert: true
                }
            );

            results = newLaunch;
        });
    }

    console.log('modelAddLaunch results', results);

    return results;
}

async function modelDeleteLaunch(flightNumber) {
    const id = Number(flightNumber || -1);

    console.log('modelDeleteLaunch', id);

    const results = Launch.deleteOne({
        flightNumber: id
    })

    console.log('modelDeleteLaunch', results);

    return results.ok;
}

async function modelFindLaunches(options) {
    const opts = options || {};
    opts.options = opts.options || {};

    console.log('modelFindLaunches', opts);

    const results = await Launch
        .find(opts.filter || {})
        .select({
            _id: 0,
            __v: 0
        })
        .sort(opts.sort || {})
        .skip(opts.options.skip || 0)
        .limit(opts.options.limit || 0)
        .exec();

    console.log('modelFindLaunches', results.length);

    return results;
}

async function modelFindOneLaunch(filter) {
    console.log('modelFindOneLaunch', filter);

    const results = await Launch
        .findOne(
            filter
        )
        .select({
            _id: 0,
            __v: 0
        })
        .exec();

    console.log('modelFindOneLaunch', results);

    return result;
}

async function modelGetAllLaunches(request) {
    console.log('modelGetAllLaunches', request);

    const req = request || {};

    const results = await modelFindLaunches({
        filter: req.filter || {},
        sort: req.sort || {
                launchDate: 1
            },
        options: req.options
    });

    // const results = await Launch
    //     .find()
    //     .select({
    //         _id: 0,
    //         __v: 0
    //     })
    //     .sort({
    //         launchDate: 1
    //     })
    //     .exec();

    console.log('modelGetAllLaunches', results.length);

    return results;
}

async function modelGetLaunch(flightNumber) {
    const id = Number(flightNumber || -1);

    console.log('modelGetLaunch', id);

    return await modelFindOneLaunch({
        flightNumber: id
    });
}

async function modelNextFlightNumber() {
    // const flightNumbers = await Launch
    //     .find(
    //         {},
    //         {
    //             flightNumber: 1,
    //             _id: 0
    //         }
    //     )
    //     .sort({
    //         flightNumber: -1
    //     });

    const flightNumbers = await Launch.aggregate(
        [
            {
                $group: {
                    _id: null,
                    flightNumber: {
                        $max: "$flightNumber"
                    }
                }
            }
        ]);

    if (flightNumbers.length > 0) {
        return flightNumbers[0].flightNumber + 10;
    } else {
        return 100;
    }
}

async function modelUpdateLaunch(launch) {
    const id = Number(launch.flightNumber || -1);

    console.log('modelUpdateLaunch', id, launch);

    const planet = await Planet.findOne({
        keplerName: launch.target
    });
    if (!planet) {
        throw new Error('Invalid launch target');
    }

    launch.flightNumber = id;

    const results = await Launch.updateOne(
        {
            flightNumber: id
        },
        {
            $set: {
                mission: launch.mission,
                rocket: launch.rocket,
                launchDate: launch.launchDate,
                target: launch.target,
                customers: launch.customers,
                upcoming: launch.upcoming,
                success: launch.success
            }
        }
    )

    console.log('modelUpdateLaunch', results);

    return results.modifiedCount > 0 ? launch : null;
}

function modelValidateLaunch(launch) {
    const errors = [];

    validateIsNumberOrEmpty(errors, launch.flightNumber, 'Invalid launch flightNumber');
    validateIsNotEmpty(errors, launch.mission, 'Missing launch mission');
    validateIsNotEmpty(errors, launch.rocket, 'Missing launch rocket');
    validateIsNotEmpty(errors, launch.target, 'Missing launch target');
    if (validateIsNotEmpty(errors, launch.launchDate, 'Missing launch launchDate')) {
        validateIsDateValue(errors, launch.launchDate, 'Invalid launch launchDate');
    }
    validateIsBooleanOrEmpty(errors, launch.success, 'Invalid launch success');
    validateIsBooleanOrEmpty(errors, launch.upcoming, 'Invalid launch upcoming');

    if (errors.length > 0) {
        console.log('errors', errors);
    }

    return errors;
}

module.exports = {
    loadLaunchData,
    modelAbortLaunch,
    modelAddLaunch,
    modelDeleteLaunch,
    modelFindLaunches,
    modelFindOneLaunch,
    modelGetAllLaunches,
    modelGetLaunch,
    modelUpdateLaunch,
    modelValidateLaunch
}
