/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
const firebase = require('firebase');
const root = "event06042019";

function getAttendeesData(){
    const ref = firebase.database().ref(root).child('attendees');    
    return ref.once('value');
}

function getAttendeesDataByTicket(ticketno){
    const ref = firebase.database().ref(root).child('attendees');    
    return ref.orderByChild('ticketno').equalTo(ticketno).once('value');
}

function getAttendeesDataBySurname(surname){
    const ref = firebase.database().ref(root).child('attendees');
    return ref.orderByChild('surname').startAt(surname).once('value');        
}

function createAttendee(attendee){
    return new Promise((resolve, reject) => {
        checkIfAttendeeExists(attendee)
        .then(result => {
            if(!result){
                const ref = firebase.database().ref(root).child('attendees');
                // eslint-disable-next-line promise/no-nesting
                ref.push(attendee).then(result => {
                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                });                
            }
            else{
                resolve(false);
            }
        })
        .catch(error => {
            reject(error);
        });
    });
}

function checkIfAttendeeExists(attendee){
    return new Promise((resolve, reject) => {
        const ref = firebase.database().ref(root).child('attendees');
        ref.orderByChild('ticketno').equalTo(attendee.ticketno)
            .once('value')
        .then(snap => {
            var exists = false;
            var values = [];
            snap.forEach(data => {
                values.push(data.val());
            });
            for (let index = 0; index < values.length; index++) {
                const value = values[index];
                exists = (value.firstname === attendee.firstname && value.surname === attendee.surname);
                if(exists){
                    break;
                }                
            }
            resolve(exists);
        })
        .catch(error => {
            reject(error);
        });
    });
}

var dbHelper = {
    getAttendeesData: getAttendeesData,
    getAttendeesDataByTicket: getAttendeesDataByTicket,
    getAttendeesDataBySurname:getAttendeesDataBySurname,
    createAttendee:createAttendee
}

module.exports = dbHelper;