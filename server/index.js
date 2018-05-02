//starting point of the app
'use strict';
const express  = require('express');
const http  = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const  PromiseProvider = require('mongoose');
const cors = require('cors');
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
const ZipkinTracer = require('../zipkin/zipkinTracer');
const fetch = require('node-fetch');
const wrapFetch = require('zipkin-instrumentation-fetch');


//DB Setup
mongoose.connect("mongodb://localhost:27017/auth",{ useMongoClient: true});

//App Setup


//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());


app.use(zipkinMiddleware({
    tracer: ZipkinTracer,
    serviceName: 'UserSigninService'
}));


router(app);
server.listen(port);
console.log('Server listening on : ', port);
module.exports = server;
