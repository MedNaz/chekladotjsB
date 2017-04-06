/**
 * Created by medjdoub on 13/03/17.
 */
var express = require('express');

var route = express.Router();


route.get('/:id',function(req,res){

    res.render('shop');



});

route.get('/openshop', function(req, res){
    res.render('openShop');
})

route.post('/openshop', function(req, res){
    res.send('openShop');
})

module.exports = route;
