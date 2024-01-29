const mongoose = require('mongoose');

const { isEmpty, isNumber } = require('./validate.js');

const schema = new mongoose.Schema({
    collectionName: {
        type: String,
        required: true
    },
    propertyName: {
        type: String,
        required: true
    },
    counterValue: {
        type: Number,
        required: true,
        default: 1
    }
});

schema.index({
    collectionName: 1,
    propertyName: 1
}, {
    unique: true
});

schema.statics.nextValue = async function(collectionName, propertyName, incValue = 1, startValue = 1, maxTries = 10) {
    console.log('nextValue', collectionName, propertyName, incValue, startValue, maxTries);

    if (isEmpty(collectionName)) {
        throw new Error('Missing collectionName');
    } else if (isEmpty(propertyName)) {
        throw new Error('Missing propertyName');
    } else if (!isNumber(incValue) || incValue < 0) {
        throw new Error('Missing or invalid incValue');
    }

    // const counter = await Counter.findAndModify({
    //     query: { 
    //         collectionName: collectionName, 
    //         propertyName: propertyName
    //     },
    //     update: {
    //         $inc: {
    //             counterValue: incValue
    //         }
    //     },
    //     upsert: true,
    //     new: true
    // });

    const counter = await Counter.findOneAndUpdate(
        { 
            collectionName: collectionName, 
            propertyName: propertyName
        },
        {
            $inc: {
                counterValue: incValue
            }
        },
        {
            upsert: true,
            new: true
        }
    );

    console.log('nextValue', counter);

    if (counter) {
        return counter.counterValue;
    }

    throw new Error(`Unable to increment ${collectionName}.${propertyName} counter`);
}

/*
db.counters.findAndModify({
    query: { 
        collectionName: 'bumble', 
        propertyName: 'bee'
    },
    update: {
        $expr: {
            $cond: {
                if: {
                    counterValue: { $exists: true }
                },
                then: {
                    $inc: {
                        counterValue: 10
                    }
                },
                else: {
                    $set: {
                        counterValue: 100
                    }
                }
            }
        }
    },
    upsert: true,
    new: true
});

db.counters.findAndModify({
    query: { 
        collectionName: 'bumble', 
        propertyName: 'bee'
    },
    update: {
        $set: {
            counterValue: {
                $cond: {
                    if: {
                        counterValue: { $exists: true }
                    },
                    then: {
                        $add: ['$counterValue', 10]
                    },
                    else: 100
                }
            }
        }
    },
    upsert: true,
    new: true
});
*/

schema.statics.nextValueOld = async function(collectionName, propertyName, incValue = 1, startValue = 1, maxTries = 10) {
    // console.log('nextValueOld', collectionName, propertyName, incValue, startValue, maxTries);

    if (isEmpty(collectionName)) {
        throw new Error('Missing collectionName');
    } else if (isEmpty(propertyName)) {
        throw new Error('Missing propertyName');
    } else if (!isNumber(startValue) || startValue < 1) {
        throw new Error('Missing or invalid startValue');
    } else if (!isNumber(incValue) || incValue < 0) {
        throw new Error('Missing or invalid incValue');
    } else if (!isNumber(maxTries) || maxTries < 1 || maxTries > 100) {
        throw new Error('Missing or invalid maxTries');
    }

    for (var attempt = 0; attempt < maxTries; attempt++) {
        const counter = await this.findOne({
            collectionName: collectionName,
            propertyName: propertyName
        });

        // console.log('nextValue counter', counter);

        if (counter) {
            const counterValue = counter.counterValue + incValue;
            const results = await this.updateOne({
                collectionName: collectionName,
                propertyName: propertyName,
                counterValue: counter.counterValue
            }, {
                $set: {
                    counterValue: counterValue
                }
            });

            // console.log('nextValue results', results);

            if (results.modifiedCount == 1) {
                return counterValue;
            }
        } else {
            try {
                await this.create({
                    collectionName: collectionName,
                    propertyName: propertyName,
                    counterValue: startValue - incValue
                });
            } catch (err) {

            }
        }
    }

    throw new Error(`Unable to increment ${collectionName}.${propertyName} counter`);
}

schema.statics.withNextValue = async function(options, callback) {
    const params = options || {};

    console.log('withNextValue', params);

    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            const nextValue = await Counter.nextValue(
                params.collectionName,
                params.propertyName,
                params.incValue || 1,
                params.startValue || 1,
                params.maxTries || 10);

            const results = await callback(nextValue);

            return results;
        });
    } finally {
        session.endSession();
    }
}

// https://mongoosejs.com/docs/transactions.html
async function insertLaunch(launch) {
    const session = await mongoose.startSession();
    try {
        session.withTransaction(async () => {
            const flightNumber = await Counter.increment('launches', 'flightNumber', 100, 10);
            launch.flightNumber = flightNumber;

            console.log('insertOne', launch);

            const results = await Launches.insertOne(launch);
            console.log('insertOne', results);

            if (results.modifiedCount > 0) {
                return launch;
            } else {
                return null;
            }
        });
    } finally {
        session.endSession();
    }
}

const Counter = mongoose.model('Counter', schema);

module.exports = {
    Counter
}