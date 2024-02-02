const http = require('http');
const path = require('path');

require('dotenv').config();

const app = require('./app.js');
const { initializeMongo } = require('./services/mongo.js');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    await initializeMongo();

    server.listen(PORT, HOST, () => {
        const startTime = new Date();
        console.log(`\n\nListening on ${HOST}:${PORT} at ${startTime}`);
    });
}

startServer();
