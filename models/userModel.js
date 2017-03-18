/**
 * Created by kissi on 13/03/17.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userAccount = require('./userAccountModele');
var userProfileModel = require('./userProfileModel');

var productModel = require('./productModel');
var shopModel = require('./shopModel')


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
    createdOn: {type: Date, default: Date.now()}
});

UserSchema.statics.getProfileFromAccountId = function (accountId, callback) {
    userModel.findOne({userAccountId: accountId}, function (err, user) {
        if(err){
            throw err;
        }else if(!user){
            console.log("there's no user with this accountID:" + accountId)
        }else{
            console.log("found user: "+ user + " with account id : "+ accountId);
            var profileId = user.userProfileId;
            userProfileModel.findOne({_id: profileId}, callback)
        }



    }).populate('userProfileId')

};


/*
 UserSchema.statics.getInformationOfUser=function (username) {

 userAccount.findOne({accountUsername:username},function (err,accout) {

 userModel.findOne({userAccountId:accout._id},function (err,user) {
 userModel.findVisitedShops(user._id);



 })
 })
 };*/

 UserSchema.statics.findVisitedShops=function(userid,callback){
    userModel.findOne({_id:userid},callback).populate('userShopsVisitedId')

};



/* a hint how to use the callbacl */
/*
UserSchema.statics.findVisitedShops = function (userid) {
    userModel.findOne({_id: userid}, function (err, user) {
        if (err)
            throw err;
        user.userShopsVisitedId.forEach(function (e) {
            var shopid = e.shopId;
            shopModel.findOne({_id: shopid}, function (err, shop) {
                if (err)
                    throw err;
                console.log(shop.shopName)
            })

        })
    }).populate('userShopsVisitedId')
};*/

 UserSchema.statics.findVisitedProducts=function(userid,callback){
    userModel.findOne({_id:userid},callback).populate('userProductVisitedId') 
}


/* hint how to use callback */

/*UserSchema.statics.findVisitedProducts = function (userid) {
    userModel.findOne({_id: userid}, function (err, user) {
        if (err)
            throw err;
        user.userProductVisitedId.forEach(function (e) {
            var prodid = e.prodId;
            productModel.findOne({_id: prodid}, function (err, prod) {
                if (err)
                    throw err;
                console.log(prod.toString())
            })
        })


    }).populate('userProductVisitedId')

};**/


UserSchema.statics.findGroupsOfUser = function (userid, callback) {
    userModel.findOne({_id: userid}, callback).populate('userMemberOfGroupsId')
};


UserSchema.statics.insertToVisitedProduct = function (userid, prodid) {
    userModel.findOne({_id: userid}, function (err, user) {
        if (err)
            throw err;
        var testEchec = 0;
        user.userProductVisitedId.forEach(function (e) {
            if (e.prodId == prodid) {
                console.log(e.visitedOn);
                e.visitedOn = Date.now();
                user.save();
                console.log(e.visitedOn)
            }
            else {
                console.log(e.prodId + 'else');
                testEchec++;
            }

        });
        if (testEchec === user.userProductVisitedId.length) {
            console.log('new' + testEchec);
            user.userProductVisitedId.push({prodId: prodid, visitedOn: Date.now()});
            user.save();
            console.log(user.userProductVisitedId)
        }
    })
};

/*test to announce..*/


UserSchema.statics.insertToVisitedShop = function (userid, shopid) {
    userModel.findOne({_id: userid}, function (err, user) {
        if (err)
            throw err;
        var testEchec = 0;
        user.userShopsVisitedId.forEach(function (e) {
            if (e.shopId == shopid) {
                console.log(e.visitedOn);
                e.visitedOn = Date.now();
                user.save();
                console.log(e.visitedOn)
            }
            else {
                console.log(e.shopId + 'else');
                testEchec++;
            }

        });
        if (testEchec == user.userShopsVisitedId.length) {
            console.log('new shop');
            user.userShopsVisitedId.push({shopId: shopid, visitedOn: Date.now()});
            user.save();
            console.log(user.userShopsVisitedId)
        }
    })
};


//create user account once he signs up
UserSchema.statics.createUserAccount = function (accountId,user) {
    var fbuser = user;
    var user1=new userModel({
        userAccountId:accountId
    })
    userModel.create(user1, function(err,user){
        if(err){
            throw err;
        }else{

            var Profile = {

            };
            if(fbuser){
                Profile.profileFirstName = fbuser.displayName

            }
            console.log("this is the profile " + Profile.profileFirstName);
            userProfileModel.create(Profile ,function(err, profile){
                if(err){
                    throw err;
                }else{
                    userModel.createUserProfile(user._id,profile._id);
                }
            })
        }

    });
};



//query to update userProfileId
UserSchema.statics.createUserProfile = function (userId, profileId) {
    this.findOne({_id: userId}, function (err, user) {
        user.userProfileId = profileId;
        user.save()
    })
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

UserSchema.statics.findUserAccount = function (userid, callback) {
    this.findOne({_id: userid}, callback).populate('userAccountId')
};

var userModel = mongoose.model('user', UserSchema);
module.exports = userModel;