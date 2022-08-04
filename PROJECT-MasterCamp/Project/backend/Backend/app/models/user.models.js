'use strict';

 // Import mongoose
 const mongoose = require("mongoose");

 // Import bcryptjs - for password hashing
 const bcrypt = require('bcryptjs');

 const jwt = require("jsonwebtoken");

 // Declare schema and assign Schema class
 const Schema = mongoose.Schema;

 // Create Schema Instance for User and add properties
 const UserSchema = new Schema({ 
    fullName: {
        type: String,
        trim: true,
        required: true
        },
       
        email: {
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        required:true
        } ,
       
        hash_password: {
        type:String,
        required:true
        },
        basket:{
            type:Array
        },
        role: {
        type:String,
        required:true,
        //default: "user"
        },
       
        createdOn: {
        type: Date,
        default: Date.now
        },
        tokens: [
            {
              token: {
                type: String,
                required: true
              }
            }
          ]
        });
       
        //Create a Schema method to compare password
        UserSchema.methods.comparePassword = function(password){
        return bcrypt.compareSync(password, this.hash_password);
        }

        UserSchema.methods.generateAuthToken = async function() {
            const user = this;
            const token = jwt.sign(
              { _id: user._id, fullName: user.fullName, email: user.email, role: user.role, basket: user.basket },
              "secret"
            );
            user.tokens = user.tokens.concat({ token });
            await user.save();
            return token;
        };
          
        UserSchema.methods.findByCredentials = async (email, password) => {
            /*const newUser = await User.findOne({ email });
            console.log(newUser);
            if (!newUser) {
              throw new Error({ error: "Invalid login details" });
            }
            const isPasswordMatch = await bcrypt.compareSync(password, this.hash_password);
            if (!isPasswordMatch) {
              throw new Error({ error: "Invalid login details" });
            }
            console.log("no");
            return newUser;*/
            return "Hello";
        };
       
        // Create and export User model
        module.exports = mongoose.model("User", UserSchema);
       