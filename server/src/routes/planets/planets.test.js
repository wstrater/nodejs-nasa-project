const request = require('supertest');

const app = require('../../app.js');
const {
    finalizeMongo,
    initializeMongo
} = require('../../services/mongo.js');

describe('Planets API', () => {
    afterAll(async () => {
        await finalizeMongo();
    });

    beforeAll(async () => {
        await initializeMongo();
    });

    describe('Get All Planets', () => {
        test('Expect 200 Status Code', async () => {
            const response = await request(app)
                .get('/v1/planets')
                .expect(200)
                .expect('Content-Type', /json/);

            expect((response.body).length).toBeGreaterThan(0);

            // expect(response.body).toContainEqual({
            //     "kepid": "4138008",
            //     "kepler_name": "Kepler-442 b"
            // });
        });
    });

});
