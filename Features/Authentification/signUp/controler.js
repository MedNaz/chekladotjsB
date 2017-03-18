/**
 * Created by medjdoub on 14/03/17.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


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

//return all documents
function emailExists(email,errorMessages,res,req,user) {

   account.find({accountEmail:email},function(err,result){
       if(result.length > 0){
           errorMessages.emailExist = "email already exists";
       }
       userNameExists(errorMessages,res,req,user);
   });

}

function userNameExists(errorMessages,res,req,user){
    account.find({accountUsername:user.accountUsername},function(err,result){
        console.log(result )
        if(result.length > 0){
            errorMessages.username = "username already exists";
        }
        handleSignUp(errorMessages,res,req,user);
    });
}
function handleSignUp(errorMessages,res,req,user){



    //testing if there was no errors
    if(!(errorMessages.email) && !(errorMessages.password) && !(errorMessages.emailExist) &&
        !(errorMessages.passwordsMismatch) && !(errorMessages.username) ){

        hashPassword(user.accountPassword,user,res);

    }else{
        console.log(errorMessages);
        res.render('signup',{errors : errorMessages});
    }
}


function verifyUserBeforeSave(obj,req){
    var errorMessages = {};
    if(!verifyUsername(obj)){
        errorMessages.username = "username is not submitted";
    }
    if(!verifyEmail(obj)){
        errorMessages.email = "email is not submitted";
    }
    if(!verifyPassword(obj)){
        errorMessages.password = "password is not submitted";
    }
    if(obj.accountPassword !== req.body.passwordConfirmation){
        errorMessages.passwordsMismatch = "passwords must match";
    }
    return errorMessages;
}


function verifyPassword(obj){
    return (verifyIfKeyIsSet(obj,"accountPassword") && obj.accountPassword !== '');
}

function verifyUsername(obj){
    return (verifyIfKeyIsSet(obj,"accountUsername") && obj.accountUsername !== '');
}

//verify if all fields
function verifyAllKeysAreSet(obj,arr) {
    var valueAreSet = false;
    var objProperties = Object.getOwnPropertyNames(obj);
    objProperties = objProperties.sort();
    arr = arr.sort();
    return objProperties.toString() === arr.toString();

}

//Hash the password hashPassword(user.accountPassword,user,res);

function hashPassword(password,user,res){
    var salt = 10;
    bcrypt.hash(password,salt,function (err,hash) {
        if(err){
            throw err;
        }else{
            console.log('this is the password '+ password);
            user.accountPassword = hash;
            console.log('this is the hash '+ user.accountPassword);
            saveUser(account,user);

        }
        res.redirect('/signin');

    });
}




//return an object from a body request provied by the body parser middleware
function constructUser(body){
    return {
        accountEmail: body.email,
        accountPassword: body.password,
        accountUsername: body.username
    }
}




//save a new user into the model
function saveUser(model,user){
    model.create(user,function(err,user){
        if(err){
            throw err;
        }else{
            console.log('user saved ' + user.toString());
        }
    });

}

module.exports = {
    verifyIfKeyIsSet: verifyIfKeyIsSet,
    verifyAllKeysAreSet: verifyAllKeysAreSet,
    constructUser: constructUser,
    saveUser:saveUser,
    verifyPassword: verifyPassword,
    verifyEmail: verifyEmail,
    verifyUserBeforeSave:verifyUserBeforeSave,
    emailExists:emailExists
}











