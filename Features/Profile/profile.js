/**
 * Created by medjdoub on 18/03/17.
 */



var userModel = require("../../models/userModel");
var accountModel = require("../../models/userAccountModele");
var facebokAccountModel = require('../Authentification/Social networks/Facebook/facebookModel');

var profile = {};
var shopsFollowed = {}
var productsRecentlyViewed = {};
var shopsRecentlyVisited = {};



var getAccountIdFromUsernameFacebook = function(username, callback){
    facebokAccountModel.getAccountIdFromUsername(username, callback);
}
var getAccountIdFromUsername = function(username, callback){
    accountModel.getAccountIdFromUsername(username, callback);
}
var getProfileFromAccountID = function(accountID,callback){
    userModel.getProfileFromAccountId(accountID, callback);
}
var getProfileFromAccountIDfacebook = function(accountID,callback){

}

module.exports = {
    getAccountIdFromUsername: getAccountIdFromUsername,
    getProfileFromAccountID : getProfileFromAccountID,
    getAccountIdFromUsernameFacebook: getAccountIdFromUsernameFacebook
};