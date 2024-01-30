const assert = require('assert');
const request = require('supertest');

const app = require('../../app.js');
const {
    finalizeMongo,
    initializeMongo
} = require('../../services/mongo.js');
const { Launch } = require('../../models/launches.mongo.js');

describe('Launches API', () => {
    const MISSION_NAME = "Jest Test";

    const LAUNCH = {
        mission: MISSION_NAME,
        rocket: "ZTM Experimental IS1",
        launchDate: "2035-12-27",
        target: "Kepler-442 b"
    };
    const LAUNCH_DATE = new Date(LAUNCH.launchDate);

    afterAll(async () => {
        await Launch.deleteMany({
            mission: { 
                $regex: MISSION_NAME 
            }
        })

        await finalizeMongo();
    });

    beforeAll(async () => {
        await initializeMongo();
    });

    describe('Get All Launches', () => {
        test('Expect 200 Status Code', async () => {
            const response = await request(app)
                .get('/v1/launches')
                .expect(200)
                .expect('Content-Type', /json/);

            const launches = response.body;

            expect(launches.length).toBeGreaterThan(0);

            // expect(response.body).toMatchObject([
            //     {
            //         mission: 'Kepler Exploration',
            //         rocket: 'Explorer IS1',
            //         target: 'Kepler-442 b',
            //         customers: ['NASA', 'ZTM'],
            //         upcoming: true,
            //         success: true
            //     }
            // ]);
        });
    });

    describe('Add Launch', () => {
        test('Expect 200 Status Code on Success', async () => {
            const EXPECTED = (() => {
                const RESP = { ...LAUNCH };
                delete RESP.launchDate;
                return RESP;
            })();

            const response = await request(app)
                .post('/v1/launches')
                .set('Content-Type', 'application/json')
                .send(LAUNCH)
                .expect(201)
                .expect('Content-Type', /json/);

            expect(response.body).toMatchObject(EXPECTED);
            expect(new Date(response.body.launchDate).valueOf()).toBe(LAUNCH_DATE.valueOf());
        });

        test('Expect 400 on Missing mission', async () => {
            const MISSING_MISSION = (() => {
                const RESP = { ...LAUNCH };
                delete RESP.mission;
                return RESP;
            })();

            const response = await request(app)
                .post('/v1/launches')
                .set('Content-Type', 'application/json')
                .send(MISSING_MISSION)
                .expect(400)
                .expect('Content-Type', /json/);

            expect(response.body).toStrictEqual({
                success: false,
                error: 'Invalid Launch',
                message: 'Missing launch mission'
            });
        });

        test('Expect 400 on Missing rocket', async () => {
            const MISSING_ROCKET = (() => {
                const RESP = { ...LAUNCH };
                delete RESP.rocket;
                return RESP;
            })();

            const response = await request(app)
                .post('/v1/launches')
                .set('Content-Type', 'application/json')
                .send(MISSING_ROCKET)
                .expect(400)
                .expect('Content-Type', /json/);

            expect(response.body).toStrictEqual({
                success: false,
                error: 'Invalid Launch',
                message: 'Missing launch rocket'
            });
        });

        test('Expect 400 on Missing launchDate', async () => {
            const MISSING_LAUNCH_DATE = (() => {
                const RESP = { ...LAUNCH };
                delete RESP.launchDate;
                return RESP;
            })();

            const response = await request(app)
                .post('/v1/launches')
                .set('Content-Type', 'application/json')
                .send(MISSING_LAUNCH_DATE)
                .expect(400)
                .expect('Content-Type', /json/);

            expect(response.body).toStrictEqual({
                success: false,
                error: 'Invalid Launch',
                message: 'Missing launch launchDate'
            });
        });

        test('Expect 400 on Missing target', async () => {
            const MISSING_TARGET = (() => {
                const RESP = { ...LAUNCH };
                delete RESP.target;
                return RESP;
            })();

            const response = await request(app)
                .post('/v1/launches')
                .set('Content-Type', 'application/json')
                .send(MISSING_TARGET)
                .expect(400)
                .expect('Content-Type', /json/);

            expect(response.body).toStrictEqual({
                success: false,
                error: 'Invalid Launch',
                message: 'Missing launch target'
            });
        });

        test('Expect 400 on Invalid target', async () => {
            const INVALID_TARGET = (() => {
                const RESP = { ...LAUNCH };
                RESP.target = 'Not ' + RESP.target;
                return RESP;
            })();

            const response = await request(app)
                .post('/v1/launches')
                .set('Content-Type', 'application/json')
                .send(INVALID_TARGET)
                .expect(400)
                .expect('Content-Type', /json/);

            expect(response.body).toStrictEqual({
                success: false,
                error: 'Invalid launch target'
            });
        });

        test('Expect 400 on invalid launchDate', async () => {
            const INVALID_LAUNCH_DATE = (() => {
                const RESP = { ...LAUNCH };
                RESP.launchDate = "NOW";
                return RESP;
            })();

            const response = await request(app)
                .post('/v1/launches')
                .set('Content-Type', 'application/json')
                .send(INVALID_LAUNCH_DATE)
                .expect(400)
                .expect('Content-Type', /json/);

            expect(response.body).toStrictEqual({
                success: false,
                error: 'Invalid Launch',
                message: 'Invalid launch launchDate'
            });
        });
    });

    describe('Get Launch', () => {
        test('Get existing launch', async () => {
            const EXPECTED = (() => {
                const RESP = { ...LAUNCH };
                delete RESP.launchDate;
                return RESP;
            })();

            const addedResponse = await request(app)
                .post('/v1/launches')
                .set('Content-Type', 'application/json')
                .send(LAUNCH)
                .expect(201)
                .expect('Content-Type', /json/);

            const addedLaunch = addedResponse.body;
            console.log('addedLaunch', addedLaunch);

            expect(addedLaunch.success).toBeTruthy();
            expect(addedLaunch.upcoming).toBeTruthy();

            const flightNumber = Number(addedLaunch.flightNumber || -1);
            expect(flightNumber).toBeGreaterThan(0);

            const response = await request(app)
                .get(`/v1/launches/${flightNumber}`)
                .expect(200)
                .expect('Content-Type', /json/);

            expect(response.body).toMatchObject(EXPECTED);
        });

        test('Get missing launch', async () => {
            const response = await request(app)
                .get(`/v1/launches/111111111`)
                .expect(404);

            expect(response.body).toMatchObject({
                success: false,
                error: 'Launch not found'
            })
        });
    });

    describe('Abort Launch', () => {
        test('Abort existing launch', async () => {
            const addedResponse = await request(app)
                .post('/v1/launches')
                .set('Content-Type', 'application/json')
                .send(LAUNCH)
                .expect(201)
                .expect('Content-Type', /json/);

            const addedLaunch = addedResponse.body;
            console.log('addedLaunch', addedLaunch);

            expect(addedLaunch.success).toBeTruthy();
            expect(addedLaunch.upcoming).toBeTruthy();

            const flightNumber = Number(addedLaunch.flightNumber || -1);
            expect(flightNumber).toBeGreaterThan(0);

            const abortResponse = await request(app)
                .delete(`/v1/launches/${flightNumber}`)
                .expect(200);

            const abortBody = abortResponse.body;

            expect(abortBody.success).toBeTruthy();

            const abortedResponse = await request(app)
                .get(`/v1/launches/${flightNumber}`)
                .expect(200)
                .expect('Content-Type', /json/);

            const abortedLaunch = abortedResponse.body;
            console.log('abortedLaunch', abortedLaunch);

            expect(abortedLaunch.success).toBeFalsy();
            expect(abortedLaunch.upcoming).toBeFalsy();
        });

        test('Abort missing launch', async () => {
            const response = await request(app)
                .delete(`/v1/launches/111111111`)
                .expect(404);

            expect(response.body).toMatchObject({
                success: false,
                error: 'Launch not found'
            })
        });

    });

});
