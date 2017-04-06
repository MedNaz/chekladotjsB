/**
 * Created by medjdoub on 15/03/17.
 */


var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var session = require('express-session');

//require all necessary models to sign in
var account = require('../../../models/userAccountModele');
var userModel = require('../../../models/userModel');


//check if a key is defined in an object
function verifyIfKeyIsSet(obj,key){
    return obj[key] !== undefined;
}

//check if email is set
function verifyEmail(obj){
    return (verifyIfKeyIsSet(obj,"accountEmail") && obj.accountEmail !=="" );
}




function handleSignIn(queryRes, errorMessages,res,req,user){


    //testing if there was no errors

    if(!(errorMessages.email) && !(errorMessages.password)){

        authenticate(user.accountPassword,user,res,req,errorMessages);

    }else{


        res.render('signin',{errors : errorMessages, accountDoesNotExist: 0});
    }
}
function verifyPassword(obj){
    return (verifyIfKeyIsSet(obj,"accountPassword") && obj.accountPassword !== '');
}

function verifyUserBeforeSave(obj,req){
    var errorMessages = {};
    if(!verifyEmail(obj)){
        errorMessages.email = "Veuillez entrer votre email";

    }
    if(!verifyPassword(obj)){
        errorMessages.password = "Veuillez entrer votre mot de passe";
    }
    return errorMessages;
}




//
function authenticate(password,user,res,req,errorMessages) {
    account.findOne({accountEmail: user.accountEmail},
        function (err, data) {
            if (err) {
                throw err;
            } else if (data) {
                bcrypt.compare(password, data.accountPassword, function (err, result) {
                    if (err) {
                        throw err;
                    } else if (result) {
                        userModel.getUserIdFromAccountId(data._id, function(userID){
                            req.session._userID = userID;
                            console.log("this is the session "+ req.session._userID);
                            var hour = 3600000000000;
                            req.session.cookie.maxAge = hour;


                            res.redirect("/");
                        })


                    } else {
                        var notIdentifiedAccount = {
                            "message" : "Veuillez vérifier votre email et votre mot de passe."
                        }
                        res.render('signin',{errors: errorMessages, accountDoesNotExist: notIdentifiedAccount})
                    }
                });
            }else{
                var notIdentifiedAccount = {
                    "message" : "Veuillez vérifier votre email et votre mot de passe."
                }
                res.render('signin',{errors: errorMessages, accountDoesNotExist: notIdentifiedAccount});
            }
        });
}



//return an object from a body request provied by the body parser middleware
function constructUser(body){
    return {
        accountEmail: body.email,
        accountPassword: body.password
    }
}




//save a new user into the model



module.exports = {

    constructUser: constructUser,
    verifyUserBeforeSave:verifyUserBeforeSave,
    handleSignIn:handleSignIn
}












