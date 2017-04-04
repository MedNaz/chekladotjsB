/**
 * Created by medjdoub on 13/03/17.
 */

var express = require("express");

var route = express.Router();

var userAccount = require('../models/userAccountModele');
var signInController = require('../Features/Authentification/signIn/controller');

route.get('/', function(req, res){

    res.render('signin',{session: req.session});
});

route.post('/', function (req, res) {
    var user = signInController.constructUser(req.body);
    var errorMessages = signInController.verifyUserBeforeSave(user,req);
    signInController.handleSignIn(user.accountPassword,errorMessages,res,req,user);

});

module.exports = route;

