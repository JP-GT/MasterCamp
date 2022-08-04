//const express = require('express'); 
const { get } = require('http');
const users = require('../controllers/auth.controllers');
module.exports = function(app) {
    //app = express.Router();
   
    // test server
   /* app.get("/hello", (req, res) => {
    res.send("GET hello");
    });*/
    // Create a new user in the DB
    app.post('/auth/register', users.register);

   // login the user
     app.post('/auth/login', users.signIn);
    // app.get('/api/auth/saveFiles2', users.saveFiles2);
    // get user
    
    app.get('/auth/me', users.getUserDetails);



   // app.get('/auth/user/', users.findByCredentials);

    app.get('/auth/users', users.findAll);

    app.get('/auth/register/:email', users.findByEmail);
}

 