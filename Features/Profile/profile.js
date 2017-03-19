/**
 * Created by medjdoub on 18/03/17.
 */



var userModel = require("../../models/userModel");
var accountModel = require("../../models/userAccountModele");
var facebokAccountModel = require('../Authentification/Social networks/Facebook/facebookModel');
var productModel = require('../../models/productModel');

var profile = {};
var shopsFollowed = {}
var productsRecentlyViewed = {};
var shopsRecentlyVisited = {};


var constructObject = function(username, req, response){
    var obj = {};
    getAccountIdFromUsername(username, function(err, account){
        if(err){
            throw err;

        }else if(!account){
        getAccountIdFromUsernameFacebook(username,function(err, account){
                if(err){
                    throw err;
                }else{
                    if(!account){
                        response.send("profile not found 404");
                    }else{

                        getProfileFromAccountID(account._id,function(err,profile){
                            if(err){
                                throw err;
                            }else if(profile){
                                // console.log(profile);
                                // obj.userID = profile._id;
                                obj.username = username;
                                obj.profileFirstName = profile.profileFirstName;
                                obj.profileLastName = profile.profileLastName;
                                obj.profilePhone    = profile.profilePhone;
                                obj.accountUserGender = profile.accountUserGender;
                                obj.profileDescription = profile.profileDescription;
                                obj.productsVisited = [];
                                obj.shopsVisited = [];
                                obj.shopFollowed = [];
                                userModel.findOne({userAccountId: account._id}, function(err, res){

                                    getVisitedProducts(res._id, function(products){
                                        products.forEach(function(product){

                                            obj.productsVisited.push(product.prodId);


                                        });
                                        getVisitedShops(res._id, function(shops){

                                            shops.forEach(function(shop){
                                                obj.shopsVisited.push(shop.shopId);
                                            });
                                            getFollowedShops(res._id, function(shops){
                                                shops.forEach(function(shop){
                                                    obj.shopFollowed.push(shop);

                                                });
                                                response.render('profile', {obj: obj});
                                            })

                                        })

                                    });
                                });

                                // response.send("profile found");
                            }else{
                                response.send('Error while loading the profile')
                            }

                        });
                    }
                }
            })

        }else{

            getProfileFromAccountID(account._id,function(err,profile){
                if(err){
                    throw err;
                }else if(profile){
                    // console.log(profile);
                    // obj.userID = profile._id;
                    obj.username = username;
                    obj.profileFirstName = profile.profileFirstName;
                    obj.profileLastName = profile.profileLastName;
                    obj.profilePhone    = profile.profilePhone;
                    obj.accountUserGender = profile.accountUserGender;
                    obj.profileDescription = profile.profileDescription;
                    obj.productsVisited = [];
                    obj.shopsVisited = [];
                    obj.shopFollowed = [];
                    userModel.findOne({userAccountId: account._id}, function(err, res){

                        getVisitedProducts(res._id, function(products){
                            products.forEach(function(product){

                                obj.productsVisited.push(product.prodId);


                            });
                            getVisitedShops(res._id, function(shops){

                                shops.forEach(function(shop){
                                    obj.shopsVisited.push(shop.shopId);
                                });
                                getFollowedShops(res._id, function(shops){
                                    shops.forEach(function(shop){
                                        obj.shopFollowed.push(shop);

                                    });
                                    response.render('profile', {obj: obj});
                                })

                            })

                        });
                    });

                    // response.send("profile found");
                }else{
                    response.send('Error while loading the profile')
                }

            });

        }

    });
    var obj = {};
}
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
var getVisitedProducts = function(userID, callback){
    userModel.findVisitedProducts(userID, callback);
}
var getVisitedShops = function(userID, callback){
    userModel.findVisitedShops(userID, callback);
}
var getFollowedShops = function(userID, callback){
    userModel.findFollowedShops(userID, callback);
}
module.exports = {
    constructObject: constructObject
};