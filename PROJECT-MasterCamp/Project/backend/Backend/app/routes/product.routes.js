//const express = require('express'); 
var products = require('../controllers/product.controllers');
module.exports = function(app) {
    //app = express.Router();
   
    // test server
   /* app.get("/hello", (req, res) => {
    res.send("GET hello");
    });*/
    // Create a new product
    app.post('/api/products', products.create);

   //
    // Retrieve all product
   app.post('/api/productsget', products.findAll);

    // Retrieve a single Customer by Id
    app.post('/api/product/', products.getFile);
   
    // Update a Customer with Id
    app.put('/api/product/:productId', products.WriteFile);
   
   // Retrieve Customers Age
    app.get('/api/products/:file', products.findByName);
    // Delete a Product with Id
    app.post('/api/productDelete', products.delete);
   }

 