/**
 * Created by kissi on 13/03/17.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userModel = require('./userModel');
var sellerModel = require('./sellerModel');
var categoryModel = require('./categoryModel');
var productModel = require('./productModel');
var announcementModel = require('./announcementModel');
var locationModel = require('./locationModel');
var socialNetworkModel = require('./socialNetworkModel')
var validator = require('./validator');

var ShopSchema = new Schema({

    shopName: {type: String},
    shopSellerId: {type: Schema.Types.ObjectId, ref: 'seller'},
    shopCategoriesId: [{type: Schema.Types.ObjectId, ref: 'category'}],
    shopProductsId: [{type: Schema.Types.ObjectId, ref: 'product'}],
    shopFollowersId: [{type: Schema.Types.ObjectId, ref: 'user'}],
    shopVisitorsNumber: Number,
    shopImage:String,
    shopCategory:String,
    shopLocation : {
        location: {
            type: Schema.Types,
            coordinates: [Number],

        },
        locationName: {
            country: String,
            address:String,
            city: String
        }},
    shopTel:String,
    shopLinksToSocialNetworks: [{type: Schema.Types.ObjectId, ref: 'socialnetwork'}],
    shopAnnouncementsId: [{type: Schema.Types.ObjectId, ref: 'announcement'}],
    shopState: String,
    createdOn: {type: Date, default: Date.now()}

});



ShopSchema.statics.getAllShops = function (callback) {//callback 2 param err,shops
    if (typeof callback === 'function') {
        shopModel.find(callback)
    }
    else {
        callback(null);

    }


}


ShopSchema.statics.getSpecificShopDeepInformation = function (shopid, callback) { //2 params err, shop object

    if (validator.params2AreValid(arguments)) {
        shopModel.findOne({_id: shopid}, callback).populate('shopSellerId').populate(' shopCategoriesId').populate('shopProductsId').populate('shopFollowersId').populate('shopLocationId').populate('shopAnnouncementsId')
    }
    else {
        callback(err, null);

    }

};


ShopSchema.statics.getProductsOfShop = function (id, callback) { // 1 param array of all products

    if (validator.params2AreValid(arguments)) {
        this.findOne({_id: id}).populate('shopProductsId').exec(function (err, prods) {
            var arrayOfProducts = [];
            if (err)
                throw err;
            if (!prods)
                callback(null)
            else {

                prods.shopProductsId.forEach(function (e) {
                    arrayOfProducts.push(e)

                });
                var temp = []
                temp[0] = arrayOfProducts;

                temp.forEach(callback)
            }
        });

    }
    else {
        callback(null)
    }

};


ShopSchema.statics.getBasicInformationOfShop = function (shopid, callback) {
    if (validator.params2AreValid(arguments)) {
        shopModel.findOne({_id: shopid}, callback)
    }
    else {
        callback(err, null)
    }
};

/**BONUUUS HHH :)*/
ShopSchema.statics.getProductsOfShopByCategory = function (shopid, categoryid, callback) { //1param array of products
    if (validator.params3IdAreValid(arguments)) {
        shopModel.findOne({_id: shopid}, function (err, shop) {

            var arrayByCategory = [];
            shop.shopProductsId.forEach(function (e) {

                if (e.categoryId == categoryid) {
                    arrayByCategory.push(e)
                }
            });
            var temp = [];
            temp[0] = arrayByCategory;
            temp.forEach(callback)

        }).populate('shopProductsId')
    }
    else {
        callback(null)
    }
}

ShopSchema.statics.getCategoriesOfShop = function (id, callback) {// 1 param array of categories

    if (validator.params2AreValid(arguments)) {

        this.findOne({_id: id}).populate('shopCategoriesId').exec(function (err, categories) {
            if (!categories)
                callback(null)
            else {
                var arrayOFCategories = []
                if (err)
                    throw err;
                if (!categories) {
                    callback(null)
                }
                else {
                    if (categories.shopCategoriesId.length == 0)
                        callback(null)
                    else {
                        categories.shopCategoriesId.forEach(function (e) {
                            arrayOFCategories.push(e)
                        })
                        var temp = []
                        temp[0] = arrayOFCategories
                        temp.forEach(callback)
                    }
                }
            }


        });
    }
    else {
        callback(null)
    }
};


ShopSchema.statics.getFollowersOfShop = function (id, callback) {//1param array of ...
    if (validator.params2AreValid(arguments)) {
        this.findOne({_id: id}).populate('shopFollowersId').exec(function (err, users) {
            if (err)
                throw err;

            if (!users) {
                callback(null)
            }
            else {
                var arrayOfFollowers = []
                if (users.shopFollowersId.length == 0)
                    callback(null)
                else {
                    users.shopFollowersId.forEach(function (e) {
                        arrayOfFollowers.push(e)

                    })
                    var temp = []
                    temp[0] = arrayOfFollowers
                    temp.forEach(callback)
                }
            }


        });
    }
    else {
        callback(null)
    }


};


ShopSchema.statics.getSocialNetworkLinksOfShop = function (id, callback) {//1param array of ...
    if (validator.params2AreValid(arguments)) {
        this.findOne({_id: id}).populate('shopLinksToSocialNetworks').exec(function (err, links) {
            if (err)
                throw err;
            var arrayOfLinks = []
            if (links.shopLinksToSocialNetworks.length == 0)
                callback(null)
            else {
                links.shopLinksToSocialNetworks.forEach(function (e) {
                    arrayOfLinks.push(e)


                })
                var temp = []
                temp[0] = arrayOfLinks
                temp.forEach(callback)
            }

        });
    }
    else {
        callback(null)
    }
};

ShopSchema.statics.getAnnouncementsOfShop = function (id, callback) {//1param array of ...
    if (validator.params2AreValid(arguments)) {
        this.findOne({_id: id}).populate('shopAnnouncementsId').exec(function (err, announcement) {
            if (err)
                throw err;
            if (!announcement) {
                callback(null)
            }
            else {
                var arrayOfAnnoucements = []

                if (announcement.shopAnnouncementsId.length == 0)
                    callback(null)
                else {
                    announcement.shopAnnouncementsId.forEach(function (e) {
                        arrayOfAnnoucements.push(e)
                    })
                    var temp = []
                    temp[0] = arrayOfAnnoucements
                    temp.forEach(callback)


                }
            }
        });
    }
    else {
        callback(null)
    }
};

ShopSchema.statics.updateShop = function (shopid, fields, callback) {//2 params err, docs
    if (validator.params3AreValid(arguments)) {
        shopModel.update({_id: shopid}, {$set: fields}, callback)
    }
    else {
        callback(null, null)
    }
}


ShopSchema.statics.updateSellerIdOfShop = function (sellerId, callback) {
    if (validator.params2AreValid(arguments)) {
        sellerModel.findOne({_id: sellerId}, function (err, seller) {

            if (err)
                throw err;
            if (!seller) {
                callback(err, null)
            }
            else {
                var shopid = seller.sellerShopId;
                shopModel.findOne({_id: shopid}, function (err, shop) {
                    if (err)
                        throw err;
                    if (!shop) {
                        callback(err, null)
                    }
                    else {
                        shop.shopSellerId = sellerId;
                        shop.save(callback);
                        //console.log(shop.toString())
                    }
                })
            }
        })
    }
    else {
        callback(null)
    }

};

ShopSchema.statics.addNewFollowerToShop = function (userId, shopId, callback) {//2 params err , follower object
    if (validator.params3IdAreValid(arguments)) {
        shopModel.findOne({_id: shopId}, function (err, shop) {
            if (err)
                throw err;
            if (!shop) {
                callback(err, null)
            }
            else {
                if (shop.shopFollowersId.indexOf(userId) === -1) {
                    shop.shopFollowersId.push(userId);
                    shop.save(callback)
                }
                else {
                    callback(err, null)
                }
            }
        })
    }
    else {
        callback(null, null)
    }
};


ShopSchema.statics.addNewCategoryToShop = function (categoryId, shopId, callback) {//2 params err , category object
    if (validator.params3IdAreValid(arguments)) {
        this.findOne({_id: shopId}, function (err, shop) {
            if (err)
                throw err;
            if (!shop) {
                callback(err, null)

            }
            else {
                if (shop.shopCategoriesId.indexOf(categoryId) === -1) {
                    shop.shopCategoriesId.push(categoryId);
                    shop.save(callback)
                }
                else {
                    callback(err, null)
                }
            }
        })
    }
    else {
        callback(null, null)
    }
};


ShopSchema.statics.addNewAnnouncementToShop = function (shopId, fields, callback) {//2 params err , announce object
    if (validator.params3AreValid(arguments)) {
        shopModel.findOne({_id: shopId}, function (err, shop) {
            if (err)
                throw err;
            if (!shop) {
                callback(err, null)
            }
            else {//if (shop.shopAnnouncementsId.indexOf(announceId) === -1) {
                var newannoucement = new announcementModel(fields)
                newannoucement.save(callback)
                var announceId = newannoucement._id;
                shop.shopAnnouncementsId.push(announceId);
                shop.save()

            }
        })
    }
    else {
        callback(null, null)
    }
};

ShopSchema.statics.addNewSocialNetworkToShop = function (shopId, fields, callback) {//2 params err , social object
    if (validator.params3AreValid(arguments)) {
        shopModel.findOne({_id: shopId}, function (err, shop) {
            if (err)
                throw err;
            if (!shop) {
                console.log('no shop')
                callback(err, null)
            }
            else {
                var newsocial = new socialNetworkModel(fields);
                newsocial.save(callback);
                var socialid = newsocial._id;
                shop.shopLinksToSocialNetworks.push(socialid);
                shop.save()

            }
        })
    }
    else {
        console.log('no param')
        callback(null, null)
    }
};

ShopSchema.statics.deleteShop = function (shopid, callback) { // you don't need callback in this moment
    shopModel.find({_id: shopid}, function (err, shop) {
        if (err)
            throw err
        shop.shopState = "blocked"
        // inchallah this method will be personalized with adding shop blocked in all objects related to this shop
    })
}

var shopModel = mongoose.model('shop', ShopSchema);


module.exports = shopModel;