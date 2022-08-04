const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
 file: {type: String},
 key1: {type:String},
 key2: {type:String},
 idUser: Object
});

module.exports = mongoose.model('Product', ProductSchema); 