/**
 * Created by medjdoub on 31/03/17.
 */

var express = require('express');
var router  = express.Router();
var APIProductsController = require('../controllers/products');

router.get('/', function(req, res){
    APIProductsController.getProductsByCategory(function(arr){
        res.setHeader("Access-Control-Allow-Origin", "*");
        arr = JSON.stringify(arr);

            res.json(arr);
       

    })

});

module.exports = router;