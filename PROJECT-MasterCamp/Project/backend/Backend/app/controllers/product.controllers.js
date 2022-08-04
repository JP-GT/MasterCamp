const Product = require('../models/product.models');
const {promises: fs} = require("fs");

// POST a Customer
exports.create = (req, res) => {
 // Create a Customer
 const product = new Product({
 file: req.body.file,
 key1: req.body.key1,
     key2: req.body.key2,
 idUser: req.body.idUser
});

    //let product = new Product(req.body);
    console.log(product);
// Save a Customer in the MongoDB
product.save()
.then(data => {
res.send(data);
}).catch(err => {
res.status(500).send({
message: err.message
});
});
};

exports.getFile = (req, res) => {
    Product.findOne(req.body._id)
        .then(r=> {
            if(!r) {
                return res.status(404).send({
                    message: "Vote not found with the id"
                });
            }
            res.send(r)
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Vote not found with id " +
                        req.body.idUser
                });
            }
            return res.status(500).send({
                message: "Error retrieving Product with id " +
                    req.body.idUser
            });

        });
 }
// exports.getFilelist = (req, res) => {
//     Product.findById(req.body._id)
//         .then(r=> {
//             if(!r) {
//                 return res.status(404).send({
//                     message: "Vote not found with the id"
//                 });
//             }
//             res.send(r)
//         })
//         .catch(err => {
//             if (err.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     message: "Vote not found with id " +
//                         req.body.idUser
//                 });
//             }
//             return res.status(500).send({
//                 message: "Error retrieving Product with id " +
//                     req.body.idUser
//             });
//
//         });
// }
// FETCH all Customers
exports.findAll = (req, res) => {
    Product.find(req.body.idUser)
    .then(products => {
    res.send(products);
    }).catch(err => {
    res.status(500).send({
    message: err.message
    });
    });
   };
   
   // FIND a Customer
   exports.findOne = (req, res) => {
    Product.findById(req.params._id)
    .then(product => {
    if(!product) {
    return res.status(404).send({
    message: "Product not found with id " +
   req.params._id
   });
   }
   res.send(product);
   }).catch(err => {
   if(err.kind === 'ObjectId') {
   return res.status(404).send({
   message: "Product not found with id " +
   req.params.productId
   });
   }
   return res.status(500).send({
   message: "Error retrieving Customer with id " +
   req.params.productId
   });
   });
   };

   // UPDATE a Product
   exports.update = (req, res) => {
   // Find customer and update it
   Product.findOneAndUpdate({ _id: req.params.productId }, {
       name: req.body.name,
    title: req.body.title,
    active: req.body.active
    }, {new: true})
    .then(product => {
    if(!product) {
    return res.status(404).send({
    message: "Product not found with id " +
   req.params.productId
    });
    }
    res.send(product);
    }).catch(err => {
    if(err.kind === 'ObjectId') {
    return res.status(404).send({
    message: "Product not found with id " +
   req.params.productId
    });
    }
    return res.status(500).send({
    message: "Error updating customer with id " +
   req.params.productId
    });
    });
   };
   
   // DELETE a Customer
  /* exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.productId)
    .then(product => {
    if(!product) {
    return res.status(404).send({
       message: "Product not found with id " +
       req.params.productId
        });
        }
        res.send({message: "Product deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
        message: "Product not found with id " +
        req.params.productId
        });
        }
        return res.status(500).send({
        message: "Could not delete customer with id " +
       req.params.productId
        });
        });
       };*/

exports.delete = (req, res) => {
    console.log(req.body);
    Product.findByIdAndRemove(req.body._id)
    .then(response => res.send(response))
};

exports.findByName = (req, res) => {
    Product.find({ file: req.params.file})
        .then(
            products => {
                res.send(products)
            }
        )
        .catch(err => {
            res.status(500).send("Error -> " + err);
        })
}

exports.FileString =  (avatar) => {


    var height = 200;
    var width  = 200;

    avatar.width  = width;
    avatar.height = height;

    var ctx = avatar.getContext('2d');

    ctx.strokeStyle = '#090';
    ctx.beginPath();
    ctx.arc(width/2, height/2, width/2 - width/10, 0, Math.PI*2);
    ctx.stroke();

    avatar.toBlob(function (blob) {
        var reader = new FileReader();

        reader.onload = function () {
            console.log(reader.result);
        }

        reader.readAsBinaryString(blob);
    });
}

exports.WriteFile = async (avatar, text) => {
    const fs = require('fs').promises;

// Define some text to be written to a file


    try {
        // Write text to the given file name
        // await tells JavaScript to wait for the asyncronous function (Promise) to resolve before continuing
        await fs.writeFile('avatar', text);
    } catch (error) {
        // Output any errors for inspection
        console.log(error);
    }
}

