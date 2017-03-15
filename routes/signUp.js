/**
 * Created by medjdoub on 13/03/17.
 */
var express = require("express");
var route = express.Router();
//var bcrypt = require('bcrypt');

//testing
var userAccount = require('../models/userAccountModele');
var signInController = require('../Features/Authentification/signUp/controler');


route.get('/', function(req,res){
    res.render('signup');
});


route.post('/', function (req, res) {

    var user = signInController.constructUser(req.body);
    var errorMessages = signInController.verifyUserBeforeSave(user,req);
    signInController.emailExists(user.accountEmail,errorMessages,res,req,user);




});

module.exports = route;