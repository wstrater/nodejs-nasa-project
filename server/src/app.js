const crypto = require('crypto');
const path = require('path');

const cors = require('cors');
const express = require('express');
const morgan = require('morgan')

const api_v1 = require('./routes/api_v1.js');

const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

const app = express();

app.use(
    cors({
        origin: CORS_ORIGIN
    })
);

app.use(morgan('combined'));

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
    const xTraceId = req.headers['x-trace-id'] || crypto.randomUUID();
    res.locals.xTraceId = xTraceId;

    const xParentId = req.headers['x-span-id'] || xTraceId;
    res.locals.xParentId = xParentId;

    const xSpanId = crypto.randomUUID();
    res.locals.xSpanId = xSpanId;

    console.log(`\nBefore Request: ${req.method} ${req.url} [${xTraceId}]`);

    const startMillis = Date.now();
    const startTime = process.hrtime();

    next();

    const diffTime = process.hrtime(startTime);
    const diffMillis = Date.now() - startMillis;

    console.log(`After Request: ${res.statusCode} (${diffTime}) (${diffMillis}) [${xTraceId}]\n`);
});

app.use('/v1', api_v1);

app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

module.exports = app;
