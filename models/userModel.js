/**
 * Created by kissi on 13/03/17.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('./validator');

var userAccount = require('./userAccountModele');
var sellerModel = require('./sellerModel');

var userProfileModel = require('./userProfileModel');

var productModel = require('./productModel');
var shopModel = require('./shopModel')
var groupeModel = require('./groupeModel')


var UserSchema = new Schema({

    userProfileId: {type: Schema.Types.ObjectId, ref: 'profile'},
    userAccountId: {type: Schema.Types.ObjectId, ref: 'account'},
    userProductVisitedId: [{
        prodId: {type: Schema.Types.ObjectId, ref: 'product'},
        visitedOn: {type: Date, default: Date.now()}
    }],
    userShopsFollowedId: [{type: Schema.Types.ObjectId, ref: 'shop'}],
    userMemberOfGroupsId: [{type: Schema.Types.ObjectId, ref: 'groupe'}],
    userShopsVisitedId: [{
        shopId: {type: Schema.Types.ObjectId, ref: 'shop'},
        visitedOn: {type: Date, default: Date.now()}
    }],
    userLocationId: {type: Schema.Types.ObjectId, ref: 'location'},
    isBlocked: {type: Boolean, default: false},
    createdOn: {type: Date, default: Date.now()}
});
UserSchema.statics.getUserIdFromAccountId=function (accountid,callback) {
    userModel.findOne({userAccountId:accountid},function (err,user) {
        if(err)
            throw err;
        var id=user._id;
        callback(id);
    })
}
UserSchema.statics.createShop = function (userid, fields, callback) {
    if (validator.params3AreValid(arguments)) {
        userModel.findOne({_id: userid}, function (err, user) {

            if (!user) {
                console.log('no user')
                callback(err, null)
            }
            else {
                var location={
                    type:'Point',
                    coordinates:[fields.longitude,fields.latitude]
                };
                var locationName={
                    city:fields.shopCity,
                    address:fields.shopAddress
                };

                var shopObj ={
                    shopName:fields.shopName,
                    shopCategory: fields.shopCategory,
                    shopLocation:{
                        location:location,
                        locationName:locationName
                    },

                    shopTel: fields.shopTel,
                    shopImage:fields.shopImage
                };



                var shop = new shopModel(shopObj);
                console.log('shop created')
                shop.save()
                console.log(shop.toString())
                var shopid = shop._id;
                var seller = new sellerModel({
                    sellerUserId: userid,
                    sellerShopId: shopid
                });
                seller.save()
                console.log('seller created')
                shop.shopSellerId=seller._id;
                shop.save(callback);
                console.log('shop updated')
                console.log(shop.toString())

            }

        })
    }
    else{   console.log('no param')
        callback(null,null)
    }
};

UserSchema.statics.getUsersWithProfiles = function (callback) {
    if (typeof callback === 'function') {
        var temp = []
        userModel.find({}, {'userAccountId': 1, 'userProfileId': 1}, function (err, users) {
            if (err)
                throw err
            if (!users) {
                callback(null)
            }
            else {

                temp[0] = users
                temp.forEach(callback)
            }
        }).populate('userProfileId')
    }
    else {
        callback(null)
    }
};

UserSchema.statics.getSpecificUser = function (userid, callback) {
    if (validator.params2AreValid(arguments)) {
        var temp = []
        userModel.findOne({_id: userid}, function (err, user) {
            if (err)
                throw err
            if (!user) {
                callback(null)
            }
            else {
                temp[0] = user;
                temp.forEach(callback)
            }

        })
    }
    else {
        callback(null)
    }
}


UserSchema.statics.findViewedProducts = function (userid, callback) {
    if (validator.params2AreValid(arguments)) {
        var arrayOfProducts = [];
        userModel.findOne({_id: userid}, function (err, user) {
            if (err)
                throw err;
            if (!user) {
                callback(null)
            } else {

                user.userProductVisitedId.forEach(function (e) {

                    arrayOfProducts.push(e)
                })
                var temp = []
                temp[0] = arrayOfProducts

                temp.forEach(callback)
            }
        }).populate('userProductVisitedId.prodId')
    }
    else {
        callback(null)
    }
};


UserSchema.statics.findFollowedShops = function (userid, callback) {
    if (validator.params2AreValid(arguments)) {
        userModel.findOne({_id: userid}, function (err, user) {
            if (err)
                throw err;
            if (!user) {
                callback(null)
            } else {
                var arrayOfShops = [];
                user.userShopsFollowedId.forEach(function (e) {
                    arrayOfShops.push(e)
                })
                var temp = []
                temp[0] = arrayOfShops
                temp.forEach(callback)
            }
        }).populate('userShopsFollowedId')
    }
    else {
        callback(null)
    }

};


UserSchema.statics.findGroupsOfUser = function (userid, callback) {
    if (validator.params2AreValid(arguments)) {
        userModel.findOne({_id: userid}, function (err, user) {
            if (err)
                throw err;
            if (!user) {
                callback(null)
            } else {
                var arrayOfGroyps = [];
                user.userMemberOfGroupsId.forEach(function (e) {
                    arrayOfGroyps.push(e)
                })
                var temp = []
                temp[0] = arrayOfGroyps
                temp.forEach(callback)
            }
        }).populate('userMemberOfGroupsId')
    }
    else {
        callback(null)
    }
};


UserSchema.statics.findViewedShops = function (userid, callback) {
    if (validator.params2AreValid(arguments)) {
        userModel.findOne({_id: userid}, function (err, user) {
            if (err)
                throw err;
            if (!user) {
                callback(null)
            } else {
                var arrayOfVisitedShops = [];
                user.userShopsVisitedId.forEach(function (e) {
                    arrayOfVisitedShops.push(e)
                });
                var temp = [];
                temp[0] = arrayOfVisitedShops;
                temp.forEach(callback)
            }
        }).populate('userShopsVisitedId.shopId')
    }
    else {
        callback(null)
    }

};


UserSchema.statics.getProfileOfUser = function (userid, callback) {
    if (validator.params2AreValid(arguments)) {
        userModel.findOne({_id: userid}, function (err, user) {
            if (err)
                throw err;
            if (!user) {
                callback(null, null)
            } else {
                var prof = user.userProfileId;
                userProfileModel.findOne({_id: prof}, callback)
            }

        }).populate('userProfileId')
    } else {
        callback(null, null)
    }
}


UserSchema.statics.updateFieldToProfileOfUser = function (userid, field, callback) {
    if (validator.params3AreValid(arguments)) {
        userModel.findOne({_id: userid}, function (err, user) {
            if (err)
                throw err;
            if (!user) {
                callback(null, null)
            } else {

                userProfileModel.update({_id: user.userProfileId._id}, {$set: field}, callback)
            }
        }).populate('userProfileId')
    } else {
        callback(null, null)
    }

};

UserSchema.statics.addNewFieldsToProfile = function (userid, fields, callback) {
    if (validator.params3AreValid(arguments)) {
        userModel.findOne({_id: userid}, function (err, user) {
            if (err)
                throw err;

            if (!user) {
                callback(null, null)
            } else {

                var profileid = user.userProfileId
                userProfileModel.update({_id: profileid}, fields, callback)
            }

        })
    } else {
        callback(null, null)
    }


}


UserSchema.statics.insertToViewedProduct = function (userid, prodid, callback) {
    if (validator.params3IdAreValid(arguments)) {
        userModel.findOne({_id: userid}, function (err, user) {
            if (err)
                throw err;
            if (!user) {
                callback(null, null)
            } else {
                var testEchec = 0;
                user.userProductVisitedId.forEach(function (e) {
                    if (e.prodId == prodid) {

                        e.visitedOn = Date.now();

                        user.save(callback);

                    }
                    else {

                        testEchec++;
                    }

                });
                if (testEchec == user.userProductVisitedId.length) {

                    user.userProductVisitedId.push({prodId: prodid, visitedOn: Date.now()});
                    user.save(callback);
                }
            }
        })
    } else {
        callback(null, null)
    }
};

UserSchema.statics.insertToFollowedShops = function (userid, shopid, callback) {
    if (validator.params3IdAreValid(arguments)) {
        userModel.findOne({_id: userid}, function (err, user) {
            if (err)
                throw err;
            if (!user) {
                callback(null, null)
            } else {
                if (user.userShopsFollowedId.indexOf(shopid) === -1) {

                    user.userShopsFollowedId.push(shopid)
                    // user.save(callback)

                }
                user.save(callback)

            }
        })
    } else {
        callback(null, null)
    }

}


UserSchema.statics.insertToViewedShop = function (userid, shopid, callback) {
    if (validator.params3IdAreValid(arguments)) {
        userModel.findOne({_id: userid}, function (err, user) {
            if (err)
                throw err;
            if (!user) {
                callback(null, null)
            } else {
                var testEchec = 0;
                user.userShopsVisitedId.forEach(function (e) {
                    if (e.shopId == shopid) {
                        //console.log(e.visitedOn);
                        e.visitedOn = Date.now();
                        user.save(callback);
                        //console.log(e.visitedOn)
                    }
                    else {
                        console.log(e.shopId + 'else');
                        testEchec++;
                    }

                });
                if (testEchec == user.userShopsVisitedId.length) {
                    //console.log('new shop');
                    user.userShopsVisitedId.push({shopId: shopid, visitedOn: Date.now()});
                    user.save(callback);
                    // console.log(user.userShopsVisitedId)
                }
            }
        })
    }
    else {
        callback(null, null)
    }
};


UserSchema.statics.insertGroupToGroupsOfUser = function (userid, groupid, callback) {
    if (validator.params3IdAreValid(arguments)) {
        userModel.findOne({_id: userid}, function (err, user) {
            if (err)
                throw err;
            if (!user) {
                callback(null, null)
            } else {
                if (user.userMemberOfGroupsId.indexOf(groupid) === -1) {

                    user.userMemberOfGroupsId.push(groupid)
                    // user.save(callback)

                }
                user.save(callback)
            }


        })
    }
    else {
        callback(null, null)
    }
}

UserSchema.statics.blockUser = function (userid, callback) {
    if (validator.params2AreValid(arguments)) {
        userModel.findOne({_id: userid}, function (err, user) {
            if (err)
                throw err
            if (!user) {
                callback(null, null)
            } else {
                user.isBlocked = true;
                user.save(callback)
            }

        })
    }
    else {
        callback(null, null)
    }
}

UserSchema.statics.getUserAccount = function (userid, callback) {
    this.findOne({_id: userid}, callback).populate('userAccountId')
};


//update Account in account model


/*
 UserSchema.statics.getInformationOfUser=function (username) {

 userAccount.findOne({accountUsername:username},function (err,accout) {

 userModel.findOne({userAccountId:accout._id},function (err,user) {
 userModel.findVisitedShops(user._id);



 })
 })
 };*/
/**for hichem
 UserSchema.statics.findVisitedShops=function(userid,callback){
    userModel.findOne({_id:userid},callback).populate('userShopsVisitedId')

};

 */








/* inspire callback
 UserSchema.statics.findFollowedShops=function(userid,callback){
 userModel.findOne({_id:userid},function (err,user) {
 if(err)
 throw err;
 var arrayOfShops=[];
 user.userShopsFollowedId.forEach(function (e) {
 var shopid=e._id

 shopModel.findOne({_id:shopid},function (err,shop) {
 if(err)
 throw err;
 console.log(shop.toString())

 })
 })
 }).populate('userShopsFollowedId')

 };

 */

UserSchema.statics.getProfileFromAccountId = function (accountId, callback) {
    userModel.findOne({userAccountId: accountId}, function (err, user) {
        var profileId = user.userProfileId;
        userProfileModel.findOne({_id: profileId}, callback)


    }).populate('userProfileId')

};


//query to update userProfileId
UserSchema.statics.createUserProfile = function (userId, profileId) {
    this.findOne({_id: userId}, function (err, user) {
        user.userProfileId = profileId;
        user.save()
    })
};

UserSchema.statics.createUserAccount = function (accountId) {
    var user1 = new userModel({
        userAccountId: accountId
    })
    user1.save();
};


//query to get array of many profiles object
UserSchema.statics.findUsersProfile = function (callback) {
    this.find().populate('userProfileId').exec(function (err, users) {
        if (err)
            throw err;
        users.forEach(callback)
    })

};
//query to get one profile object of only specific user
UserSchema.statics.findUserProfile = function (userid, callback) {
    this.findOne({_id: userid}, callback).populate('userProfileId')

};
UserSchema.statics.doesUserHaveShop=function(userid,callback) {
    if(validator.params2AreValid(arguments)){
        sellerModel.findOne({sellerUserId:userid},function (err,seller) {
            if(err)
                throw err

            if (!seller){
                callback(null,null)
            }
            else{
                shopModel.findOne({_id:seller.sellerShopId},callback)
            }
        })
    }
    else{
        callback(null,null)

    }
}


var userModel = mongoose.model('user', UserSchema);
module.exports = userModel;