const express = require('express');
const middleware = require('../middleware/middleware.js');
const attendeeManager = require('../managers/attendeeManager.js');

var attendeesRouter = express.Router();

attendeesRouter.get('/', middleware.getAttendeesData, (request,response) => {
    response.send(request.attendeesData);
});

attendeesRouter.get('/ticketNo:ticketNo', middleware.getAttendeesDataByTicket, (request,response) => {
    response.send(request.attendeesData);
});

attendeesRouter.get('/surname:surname', middleware.getAttendeesDataBySurname, (request,response) => {
    response.send(request.attendeesData);
});

attendeesRouter.post('/', attendeeManager.createAttendee, (request, response) => {
    response.send(JSON.stringify({result:true}));
});

function setUpRouting(app){
    app.use('/attendees', attendeesRouter);
}

module.exports = {
    setUpRouting:setUpRouting
}