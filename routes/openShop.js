
var express = require("express");
var route = express.Router();


route.get('/',function(req,res){

    res.render('openShop',{session: req.session});
});

module.exports = route;