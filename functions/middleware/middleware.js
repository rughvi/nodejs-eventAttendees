/* eslint-disable promise/always-return */
const dbHelper = require('../db/dbhelper.js');

function getAttendeesData(request, response, next){
    dbHelper.getAttendeesData()
    .then(snap => {
        request.attendeesData = JSON.stringify(snap.val());
        next();
    }).catch(error => {
        return response.status(500).send(JSON.stringify({code:error.code, message:error.message}));
    });
}

function getAttendeesDataByTicket(request, response, next){
    //const ref = firebase.database().ref(root).child('attendees');
    let ticketno = request.params.ticketNo;
    if(ticketno === undefined ||  ticketno === null){
        return response.status(400).send(JSON.stringify({code:400, message:'Ticket not found in the request'}));
    }

    dbHelper.getAttendeesDataByTicket(ticketno)
        .then(snap => {
            var value = snap.val();
            if(value === null){
                return response.status(404).send(JSON.stringify({code:404, message:'Ticket not found'}));
            }
            request.attendeesData = JSON.stringify(snap.val());
            next();
        })
        .catch(error => {
            console.log('Error in getAttendeesDataByTicket: Code ' + error.code + ', message: ' + error.message);
            return response.status(404).send(JSON.stringify({code:404, message:'Ticket not found'}));
        });
}

function getAttendeesDataBySurname(request, response, next){
    var surname = request.params.surname;
    if(surname === undefined ||  surname === null){
        return response.status(400).send(JSON.stringify({code:400, message:'Surname not found in the request'}));
    }
    dbHelper.getAttendeesDataBySurname(surname)
        .then(snap => {
            var value = snap.val();
            if(value === null){
                return response.status(404).send(JSON.stringify({code:404, message:'Surname not found'}));
            }
            request.attendeesData = JSON.stringify(snap.val());
            next();
        })
        .catch(error => {
            console.log('Error in getAttendeesDataBySurname: Code ' + error.code + ', message: ' + error.message);
            return response.status(404).send(JSON.stringify({code:404, message:'Surname not found'}));
        });
}

module.exports = {
    getAttendeesData:getAttendeesData,
    getAttendeesDataByTicket:getAttendeesDataByTicket,
    getAttendeesDataBySurname:getAttendeesDataBySurname
}