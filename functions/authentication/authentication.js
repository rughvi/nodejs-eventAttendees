const firebase = require('firebase');

function signIn(request, response, next) {
    let username = request.body.username;
    let password = request.body.password;
    // firebase.auth.signInWithEmailAndPassword
    firebase.auth().signInWithEmailAndPassword(username, password)
                    // eslint-disable-next-line promise/always-return
                    .then(result =>{
                        request.userDetails = JSON.stringify({uid:result.user.uid, token:result.user.refreshToken});
                        // response.send();
                        next();
                    })
                    .catch(error =>{
                        console.log('error while signin : ' + error.code + ' - ' + error.message);
                        response.status(500).send(JSON.stringify({code:error.code, message:error.message}));
                    });
}

module.exports = {
    signIn:signIn
};