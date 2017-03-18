/**
 * Created by medjdoub on 18/03/17.
 */



var userModel = require("../../models/userModel");
var accountModel = require("../../models/userAccountModele");


var profile = {};
var shopsFollowed = {}
var productsRecentlyViewed = {};
var shopsRecentlyVisited = {};




var getAccountIdFromUsername = function(username, callback){
    accountModel.getAccountIdFromUsername(username, callback);
}
var getProfileFromAccountID = function(accountID,callback){
    userModel.getProfileFromAccountId(accountID, callback);
}

module.exports = {
    getAccountIdFromUsername: getAccountIdFromUsername,
    getProfileFromAccountID : getProfileFromAccountID
};