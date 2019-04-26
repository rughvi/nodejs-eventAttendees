/* eslint-disable promise/catch-or-return */
const functions = require('firebase-functions');
const firebaseAdmin = require('firebase-admin');
const firebase = require('firebase');
const express = require('express');
const config = require('./config/firebaseconfig.js');
const middleware = require('./middleware/middleware.js');
const authentication = require('./authentication/authentication.js');
const attendeeManager = require('./managers/attendeeManager.js');
const routing = require('./routing/routing.js');


firebase.initializeApp(config.config);

const app = express();
routing.setUpRouting(app);

app.post('/login', authentication.signIn, (request, response) => {
    response.send(request.userDetails);
});

app.get('/timestamp-cached', (request,response) => {
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    response.send(`${Date.now()}`);
});
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);
