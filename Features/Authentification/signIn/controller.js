/**
 * Created by medjdoub on 15/03/17.
 */


var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var session = require('express-session');

//require all necessary models to sign in
var account = require('../../../models/userAccountModele');


//check if a key is defined in an object
function verifyIfKeyIsSet(obj,key){
    return obj[key] !== undefined;
}

//check if email is set
function verifyEmail(obj){
    return (verifyIfKeyIsSet(obj,"accountEmail") && obj.accountEmail !=="" );
}




function handleSignIn(queryRes, errorMessages,res,req,user){

    console.log(errorMessages)
    //testing if there was no errors
    if(errorMessages.length === 0){

        authenticate(user.accountPassword,user,res,req,errorMessages);

    }else{
        console.log(errorMessages);
        res.render('signin',{errors : errorMessages});
    }
}
function verifyPassword(obj){
    return (verifyIfKeyIsSet(obj,"accountPassword") && obj.accountPassword !== '');
}

function verifyUserBeforeSave(obj,req){
    var errorMessages = [];
    if(!verifyEmail(obj)){
        errorMessages.push({"email": "email is not submitted"});
    }
    if(!verifyPassword(obj)){
        errorMessages.push({"password": "password is not submitted"});
    }
    return errorMessages;
}





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
                        req.session._userID = data._id;

                        res.send("authentified " + req.session._userID);

                    } else {
                        res.send("no user with these credentials");
                    }
                });
            }else{
                res.send("no user with these credentials");
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












