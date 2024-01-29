const assert = require('assert');

const {
    finalizeMongo,
    initializeMongo
} = require('../services/mongo.js');
const { Counter } = require('./counters.mongo.js');

describe('Counters Test', () => {
    const COLLECTION_NAME = "Jest";
    const PROPERTY_NAME = "Test";
    const START_VALUE = 1;
    const INCREMENT_VALUE = 11;

    afterAll(async () => {
        await Counter.deleteMany({
            collectionName: {
                $regex: COLLECTION_NAME 
            },
            propertyName: {
                $regex: PROPERTY_NAME 
            }
        });

        await finalizeMongo();
    });

    beforeAll(async () => {
        await initializeMongo();

        await Counter.deleteMany({
            collectionName: {
                $regex: COLLECTION_NAME 
            },
            propertyName: {
                $regex: PROPERTY_NAME 
            }
        });
    });

    describe('Test nextValue', () => {
        test('New Counter', async () => {
            const PROPERTY = PROPERTY_NAME + ' nextValue New Counter';

            const firstValue = await Counter.nextValue(
                COLLECTION_NAME, 
                PROPERTY,
                INCREMENT_VALUE);

            assert.equal(firstValue, INCREMENT_VALUE, 'Initial Value Not Expected Value');

            const secondValue = await Counter.nextValue(
                COLLECTION_NAME, 
                PROPERTY,
                INCREMENT_VALUE);

            assert.equal(secondValue, 2 * INCREMENT_VALUE, 'Second Value Not Expected Value');
        });

    });

    describe('Test withNextValue', () => {
        test('New Counter', async () => {
            const PROPERTY = PROPERTY_NAME + ' withNextValue New Counter';

            let firstValue;
            await Counter.withNextValue({
                collectionName: COLLECTION_NAME,
                propertyName: PROPERTY,
                incValue: INCREMENT_VALUE
            }, async (nextValue) => {
                firstValue = nextValue;
            });

            assert.equal(firstValue, INCREMENT_VALUE, 'Initial Value Not Expected Value');

            let secondValue;
            await Counter.withNextValue({
                collectionName: COLLECTION_NAME,
                propertyName: PROPERTY,
                incValue: INCREMENT_VALUE
            }, async (nextValue) => {
                secondValue = nextValue;
            });

            assert.equal(secondValue, 2 * INCREMENT_VALUE, 'Second Value Not Expected Value');
        });

    });
});