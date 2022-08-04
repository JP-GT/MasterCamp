// import User model
const User = require("../models/user.models");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const rsa = require('js-crypto-rsa');
const NodeRSA = require('node-rsa');
let QuickEncrypt = require('quick-encrypt')
const EncryptRsa = require('encrypt-rsa').default;
const fs = require('fs')
const ursa = require('ursa-purejs')
const axios = require("axios");
const config = require('../config/auth.config');
const url = 'backend/Backend/app/FIles';
/*import bcryptjs  hashing function*/
const bcrypt = require('bcryptjs');
const multer = require("multer");

//DEFINE CONTROLLER FUNCTIONS

// User Register function
exports.register = async (req, res) => {
    try{
    console.log(req.body);
    let newUser = new User(req.body);
    newUser.hash_password =  bcrypt.hashSync(req.body.hash_password, 10);
    newUser.role = "user";
    console.log(newUser);
        
    let data = await newUser.save();
    const token = await newUser.generateAuthToken();
    res.status(201).json({data, token});
    } catch(err){
        res.status(400).json({err: err});
    }
}; 
   

// User Sign function
exports.signIn = async (req, res) => {
   try{ 
    const newUser = await User.findOne({email: req.body.email})
    if (!newUser) {
        alert("User not found");
        return res.status(401).json({ message: 'Authentication failed. User not found.' });
    } 
    if (!newUser.comparePassword(req.body.hash_password)) {
           alert("Wrong password");
           return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
    }
        
        console.log(newUser);
        const token = await newUser.generateAuthToken();
        //console.log(newUser.role);
        res.status(201).json({newUser, token})
         
    }catch(err){
        res.status(400).json({err: err});
    }
};

// User Register function
exports.loginRequired = (req, res, next) => {
if (req.user) {
res.json({ message: 'Authorized User, Action Successful!'});
} else {
res.status(401).json({ message: 'Unauthorized user!' });
}
};

exports.getUserDetails = async (req, res) => {
    //await res.json(req.body);
    newUser = User;
    await res.json(newUser);
};

// FETCH all Customers
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
    res.send(users);
    }).catch(err => {
    res.status(500).send({
    message: err.message
    });
    });
};

 // FIND a Customer
 exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
    if(!user) {
    return res.status(404).send({
    message: "User not found with id " +
    req.params.userId 
   });
   }
   res.send(user);
   }).catch(err => {
   if(err.kind === 'ObjectId') {
   return res.status(404).send({
   message: "User not found with id " +
   req.params.userId
   });
   }
   return res.status(500).send({
   message: "Error retrieving User with id " +
   req.params.userId
   });
   });
};

exports.findByEmail = (req, res) => {
    
    User.find({ email: req.params.email})
        .then(
            users => {
                res.status(200).json(users)
            }
        )
        .catch(err => {
            res.status(500).send("Error -> " + err);
        })
};
// exports.saveFiles = (req) =>{
//
//
//     return axios
//         .post(url, req).catch(error =>{console.log("ça marche pas")})
//             // headers: {
//             //     "Content-Type": "multupart/form-data",
//             // },

// };
// exports.saveFiles2 =(req,res) => {
//     // axios({
//     //     url: 'http://localhost:5000/backend/Backend/app/FIles',
//     //     method: 'GET',
//     //     responseType: 'blob',
//     // }).then((response) => {
//     //     var fileURL = window.URL.createObjectURL(new Blob([response.data]));
//     //     var fileLink = document.createElement('a');
//     //
//     //     fileLink.href = fileURL;
//     //     fileLink.setAttribute('download', 'file.pdf');
//     //     document.body.appendChild(fileLink);
//     //
//     //     fileLink.click();
//         axios({
//             method: 'post',
//             url: 'http://localhost:5000/backend/Backend/app/FIles',
//             data: {
//                header: "multipart/form-data"
//             }
//         })
//             .then(function ({data}) {
//                 console.log('Success ' + JSON.stringify(data))
//             })
//             .catch(function (error) {
//                 console.log('Error ' + error.message)
//             })
//     };
