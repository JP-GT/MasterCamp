const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const config = require('./Backend/app/config/auth.config');
const RouteProduct = require('./Backend/app/routes/product.routes');
const RouteUser = require('./Backend/app/routes/user.routes')
const { post } = require("./Backend/app/routes/product.routes");

mongoose.Promise = global.Promise; 
const uri = "mongodb+srv://Pedro:root@mastercamp.2vxfzdv.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }
   ).then(()=>{console.log('Database Connected');
    console.log("Successfully connected to MongoDB.");
    }).catch(err=>{
    console.log(err);
    console.log('Could not connect to MongoDB.');
   }); 

var corsOptions = {
 origin: "http://localhost:8081"
};



'use strict'


 // import jsonwebtoken
 const jwt = require('jsonwebtoken');

 // Token Verification
 app.use((req, res, next) => {
 if (req.headers && req.headers.authorization &&
req.headers.authorization.split(' ')[0] === 'JWT') {
 jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err,
decode) => {
 if (err) req.user = undefined;
 req.user = decode;
 next();
 });
 } else {
 req.user = undefined;
 next();
 }
 });


 /*const jwt = require("jsonwebtoken");
 module.exports = (req, res, next) => {
   try {
     const token = req.headers.authorization.replace("Bearer ", "");
     console.log(token);
     const decoded = jwt.verify(token, config.secret);
     req.userData = decoded;
     // console.log(req.userData);
     next();
   } catch (err) {
     return res.status(401).json({
       message: "Authentification Failed"
     });
   }
 };
*/


 // API endpoint



app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
 res.json({ message: "Server lives!!!" });
});
app.post('/hello', function(req, res){
    res.send('POST bye!');
});
app.get('/hello', function(req, res){
    res.send('GET bye!');
});

RouteProduct(app);
RouteUser(app);
app.listen(5000, () => {
 console.log("Server has started!")
}); 
