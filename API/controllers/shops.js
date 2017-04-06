/**
 * Created by medjdoub on 21/03/17.
 */

var express = require('express');
var shopModel = require('../../models/shopModel');
var userModel = require('../../models/userModel');
var productModel = require('../../models/productModel');
var announcementModel = require('../../models/announcementModel');
var socialNetworkModel = require('../../models/socialNetworkModel');
var sellerModel = require('../../models/sellerModel');


function getAllShops(callback){
    shopModel.getAllShops(callback)
}
function getBasicInformationOfASpecificShop(shopId, callback) {
    shopModel.getBasicInformationOfShop(shopId, callback);
}

function getCategoriesOfASpecificShop(shopId, callback){
    shopModel.getCategoriesOfShop(shopId, callback);
}

function getProductsOfASpecificShop(shopId, callback){
    shopModel.getProductsOfShop(shopId, callback);
}

function getAProductOfASpecificShop(productId, callback){
    productModel.getProductById(productId, callback);
}

function getFollowersOfASpecificShop(shopId, callback){
    shopModel.getFollowersOfShop(shopId, callback);
}

function getAnnouncementsOfASpecificShop(shopId, callback){
    shopModel.getAnnouncementsOfShop(shopId, callback);
}

function getAnnouncementOfASpecificShop(announceId, callback){
    announcementModel.getAnnouncement(announceId, callback);
}

function addCategoryToCategoriesOfASpecificShop(categoryId, shopId, callback){
    shopModel.addNewCategoryToShop(categoryId, shopId, callback);
}

function addAProductToProductsOfASpecificShop( shopId,fields, callback){
    productModel.addNewProductToShop( shopId,fields,  callback);
}

function addAFollowerToFollowersOfASpecificShop(userId, shopId, callback){
    shopModel.addNewFollowerToShop(userId, shopId, callback);
}

function addAnAnnoucementToAnnouncementsOfASpecificShop(announceId, shopId, callback){
    shopModel.addNewAnnouncementToShop(announceId, shopId, callback);
}

function addASocialLinkOfASpecificShop(socialid,shopId,callback){
    shopModel.addNewSocialNetworkToShop(socialid,shopId,callback);
}

function updateInformationOfASpecifiShop(shopid,fields,callback){
    shopModel.updateShop(shopid,fields,callback);
}

// function updateCategoriesOfASpecificShop(){
//
// }

function updateAProductOfASpecificShop(prodid, fields, callback){
    productModel.updateProduct(prodid, fields, callback);
}

function updateAnAnnouncementOfASpecificShop(announceid, fields, callback){
    announcementModel.updateAnnouncement(announceid, fields, callback);
}

function updateSocialLinksOfASpecificShop(socialNetworkId, fields, callback) {
    socialNetworkModel.updateSocialNetwork(socialNetworkId, fields, callback);
}

function deleteAShop(shopId, callback) {
    shopModel.deleteShop(shopId, callback);
}

// function deleteAProductOfASpecificShop()
function updateImage(userID, imageLink, callback){
    sellerModel.updateImageOfShop(userID, imageLink, callback);
}
function addShop(userId,fields, callback) {
    userModel.createShop(userId,fields, callback);
}







module.exports = {
    getAllShops: getAllShops,
    getBasicInformationOfASpecificShop: getBasicInformationOfASpecificShop,
    getCategoriesOfASpecificShop: getCategoriesOfASpecificShop,
    getProductsOfASpecificShop: getProductsOfASpecificShop,
    getAProductOfASpecificShop: getAProductOfASpecificShop,
    getFollowersOfASpecificShop: getFollowersOfASpecificShop,
    getAnnouncementsOfASpecificShop: getAnnouncementsOfASpecificShop,
    getAnnouncementOfASpecificShop: getAnnouncementOfASpecificShop,
    addCategoryToCategoriesOfASpecificShop: addCategoryToCategoriesOfASpecificShop,
    addAProductToProductsOfASpecificShop: addAProductToProductsOfASpecificShop,
    addAFollowerToFollowersOfASpecificShop: addAFollowerToFollowersOfASpecificShop,
    addAnAnnoucementToAnnouncementsOfASpecificShop: addAnAnnoucementToAnnouncementsOfASpecificShop,
    addASocialLinkOfASpecificShop: addASocialLinkOfASpecificShop,
    updateInformationOfASpecifiShop: updateInformationOfASpecifiShop,
    updateAProductOfASpecificShop: updateAProductOfASpecificShop,
    updateAnAnnouncementOfASpecificShop: updateAnAnnouncementOfASpecificShop,
    updateSocialLinksOfASpecificShop: updateSocialLinksOfASpecificShop,
    deleteAShop: deleteAShop,
    addShop:addShop,
    updateImage: updateImage
}






