/**
 * Created by medjdoub on 20/03/17.
 */
var express = require('express');
var userModel = require('../../models/userModel');
var userAccountModel = require('../../models/userAccountModele');
var userFacebookAccountModel = require('../../Features/Authentification/Social networks/Facebook/facebookModel');
//tested
function getAllUsers(callback){
    userModel.getUsersWithProfiles(callback);
}

//tested
function getSpecificUser(userId, callback){
    userModel.getSpecificUser(userId, callback);
}

//tested
function getProductsViewedOfASpecificUser(userId, callback){
    userModel.findViewedProducts(userId, callback);
}

//tested
function getShopsFollowedOfASpecificUser(userId, callback){
    userModel.findFollowedShops(userId, callback);
}

//tested
function getGroupOfASpecificUser(userId, callback){
    userModel.findGroupsOfUser(userId, callback);
}

//tested
function getShopsVisitedOfASpecificUser(userId, callback){
    userModel.findViewedShops(userId, callback);
}

//tested
function getProfileOfASpecificUser(userId, callback){
    userModel.getProfileOfUser(userId, callback);
}

//tested
function addAFieldToProfileOfASpecificUser(userId, field, callback){
    userModel.addNewFieldsToProfile(userId, field, callback);
}

//tested
function updateAFieldToProfileOfAspecificUser(userId, field,callback){
    userModel.updateFieldToProfileOfUser(userId, field,callback);
}

//tested
function addAProductToProductsViewedOfASpecificUser(userId, productId, callback){
    userModel.insertToViewedProduct(userId, productId, callback);
}

//tested
function addAShopToShopsFollowedByASpecificUser(userId, shopId, callback){
    userModel.insertToFollowedShops(userId, shopId, callback);
}

//not ready
function addAGroupToGroupsOfASpecificUser(userId, groupId, callback){
    userModel.findGroupsOfUser(userId, groupId, callback);
}

//tested
function addAShopToShopsViewedOfASpecificUser(userId, shopId, callback){
    userModel.insertToViewedShop(userId, shopId, callback);
}

//tested
function blockMySelf(userId, callback){
    userModel.blockUser(userId, callback);
}

//tested
function getAccountOfASpecificUser(userId, callback){
    userModel.getUserAccount(userId, callback);
}

//tested
function updateAccountOfASpecificUser(userId, field, callback){
    userModel.updateFieldsUserAccount(userId, field, callback);
}
function emailExist(email, callback){
    userAccountModel.findOne({accountEmail: email}, function(err, res){
        if(!res){
            userFacebookAccountModel.findOne({accountEmail: email}, function(err, res){
                callback(res);
            })
        }else{
            callback(res);
        }
    })
}


module.exports = {
    getAllUsers: getAllUsers,
    getSpecificUser: getSpecificUser,
    getProductsViewedOfASpecificUser: getProductsViewedOfASpecificUser,
    getShopsFollowedOfASpecificUser: getShopsFollowedOfASpecificUser,
    getGroupOfASpecificUser: getGroupOfASpecificUser,
    getShopsVisitedOfASpecificUser: getShopsVisitedOfASpecificUser,
    getProfileOfASpecificUser: getProfileOfASpecificUser,
    addAFieldToProfileOfASpecificUser: addAFieldToProfileOfASpecificUser,
    updateAFieldToProfileOfAspecificUser: updateAFieldToProfileOfAspecificUser,
    addAProductToProductsViewedOfASpecificUser: addAProductToProductsViewedOfASpecificUser,
    addAShopToShopsFollowedByASpecificUser: addAShopToShopsFollowedByASpecificUser,
    addAGroupToGroupsOfASpecificUser: addAGroupToGroupsOfASpecificUser,
    addAShopToShopsViewedOfASpecificUser: addAShopToShopsViewedOfASpecificUser,
    blockMySelf: blockMySelf,
    getAccountOfASpecificUser: getAccountOfASpecificUser,
    updateAccountOfASpecificUser: updateAccountOfASpecificUser,
    emailExist: emailExist
}






