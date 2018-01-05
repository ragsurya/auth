//starting point of the app
'use strict';
import express  from 'express';
import http  from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
const app = express();
import router from './router';
import mongoose from 'mongoose';

//DB Setup
mongoose.connect("mongodb://localhost:27017/auth",{ useMongoClient: true});

//App Setup



//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
app.use(morgan('combined'));
app.use(bodyParser.json());
router(app);
server.listen(port);
console.log('Server listening on : ', port);
