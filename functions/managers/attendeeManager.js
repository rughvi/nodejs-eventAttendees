const dbHelper = require('../db/dbhelper.js');

function validateAttendeeData(attendee){
    if(attendee === null || attendee === undefined ||
        attendee.surname === null || attendee.surname === undefined ||
        attendee.ticketno === null || attendee.ticketno === undefined ||
        attendee.firstname === null || attendee.firstname === undefined){
            return false;
    }
    return true;
}

function createAttendee(request, response, next){
    if(request.body === null || request.body === undefined){
        return response.status(400).send(JSON.stringify({code:400,message:'Body not found'}));
    }

    var attendee = {
        firstname: request.body.firstname,
        surname:request.body.surname,
        age:request.body.age,
        ticketno:request.body.ticketno
    }

    if(!validateAttendeeData(attendee)){
        return response.status(400).send(JSON.stringify({code:400,message:'Form data is not valid'}));
    }

    dbHelper.createAttendee(attendee)
    .then(result => {
        if(result){
            next();
            return;
        }
        else {
            return response.status(409).send(JSON.stringify({code:409, message:'Details already exists'}));
        }
    })
    .catch(error => {
        return response.status(500).send(JSON.stringify({code:error.code, message:error.message}));
    });    
}

module.exports = {
    createAttendee: createAttendee
}