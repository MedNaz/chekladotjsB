/**
 * Created by medjdoub on 14/03/17.
 */

var mongoose = require('mongoose');

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
    var res = res;
    console.log(req.body.email);
   account.find({accountEmail:email},function(err,result){
        handleSignUp(result,errorMessages,res,req,user);
   });

}


function handleSignUp(queryRes, errorMessages,res,req,user){
    if(queryRes.length > 0){
        errorMessages.push({"emailExist":"email already exists"});
    }
    //testing if there was no errors
    if(errorMessages.length === 0){

        saveUser(account,user);
        res.send('passed the form');
    }else{
        console.log(errorMessages);
        res.render('signup',{errors : errorMessages});
    }
}


function verifyUserBeforeSave(obj,req){
    var errorMessages = [];
    if(!verifyEmail(obj)){
        errorMessages.push({"email": "email is not submitted"});
    }
    if(!verifyPassword(obj)){
        errorMessages.push({"password": "password is not submitted"});
    }
    if(obj.accountPassword !== req.body.passwordConfirmation){
        errorMessages.push({"passwordsMismatch":"passwords must match"});
    }
    return errorMessages;
}

//check if email is set
function verifyPassword(obj){
    return (verifyIfKeyIsSet(obj,"accountPassword") && obj.accountPassword !== '');
}

//verify if all fields
function verifyAllKeysAreSet(obj,arr) {
    var valueAreSet = false;
    var objProperties = Object.getOwnPropertyNames(obj);
    objProperties = objProperties.sort();
    arr = arr.sort();
    return objProperties.toString() === arr.toString();

}


//return an object from a body request provied by the body parser middleware
function constructUser(body){
    return {
        accountEmail: body.email,
        accountPassword: body.password
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











