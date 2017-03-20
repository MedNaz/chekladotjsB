/**
 * Created by kissi on 13/03/17.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userAccount =require('./userAccountModele');

var userProfileModel = require('./userProfileModel');

var productModel = require('./productModel');
var shopModel=require('./shopModel')


var UserSchema = new Schema({

    userProfileId: {type: Schema.Types.ObjectId, ref: 'profile'},
    userAccountId: {type: Schema.Types.ObjectId, ref: 'account'},
    userProductVisitedId: [{prodId: {type:Schema.Types.ObjectId, ref:'product'},visitedOn:{type: Date, default: Date.now()}}],
    userShopsFollowedId:[{type:Schema.Types.ObjectId , ref: 'shop'}],
    userMemberOfGroupsId:[{type:Schema.Types.ObjectId , ref: 'groupe'}],
    userShopsVisitedId:[{shopId: {type:Schema.Types.ObjectId, ref:'shop'},visitedOn:{type: Date, default: Date.now()}}],
    userLocationId: {type : Schema.Types.ObjectId, ref : 'location'},
    isBlocked:{type:Boolean,default:false},
    createdOn: {type: Date, default: Date.now()}
});

UserSchema.statics.getUsersWithProfiles=function (callback) {
    var temp=[]
    userModel.find({},{'userAccountId':1,'userProfileId':1},function (err,users) {
        if(err)
            throw err
        //console.log(users)

        temp[0]=users
        temp.forEach(callback)

    }).populate('userProfileId')
};

UserSchema.statics.getSpecificUser=function (userid,callback) {
    var temp=[]
    userModel.findOne({_id:userid},function (err,user) {
        if(err)
            throw err
        temp[0]=user;
        temp.forEach(callback)

    })

}



UserSchema.statics.findViewedProducts=function(userid,callback){
    userModel.findOne({_id:userid},function (err,user) {
        if(err)
            throw err;
        var arrayOfProducts=[];
        user.userProductVisitedId.forEach(function (e) {

            arrayOfProducts.push(e)
        })
        var temp=[]
        temp[0]=arrayOfProducts

        temp.forEach(callback)
    }).populate('userProductVisitedId.prodId')

};


UserSchema.statics.findFollowedShops=function(userid,callback){
    userModel.findOne({_id:userid},function (err,user) {
        if(err)
            throw err;
        var arrayOfShops=[];
        user.userShopsFollowedId.forEach(function (e) {
            arrayOfShops.push(e)
        })
        var temp=[]
        temp[0]=arrayOfShops
        temp.forEach(callback)
    }).populate('userShopsFollowedId')

};


UserSchema.statics.findGroupsOfUser=function(userid,callback){
    userModel.findOne({_id:userid},function (err,user) {
        if(err)
            throw err;
        var arrayOfGroyps=[];
        user.userMemberOfGroupsId.forEach(function (e) {
            arrayOfGroyps.push(e)
        })
        var temp=[]
        temp[0]=arrayOfGroyps
        temp.forEach(callback)
    }).populate('userMemberOfGroupsId')
};


UserSchema.statics.findViewedShops=function(userid,callback){
    userModel.findOne({_id:userid},function (err,user) {
        if(err)
            throw err;
        var arrayOfVisitedShops=[];
        user.userShopsVisitedId.forEach(function (e) {
            arrayOfVisitedShops.push(e)
        });
        var temp=[];
        temp[0]=arrayOfVisitedShops;
        temp.forEach(callback)
    }).populate('userShopsVisitedId.shopId')

};


UserSchema.statics.getProfileOfUser=function(userid,callback){
    userModel.findOne({_id:userid},function (err,user) {
        if(err)
            throw err
        console.log(user.userProfileId);
        var prof=user.userProfileId;
        userProfileModel.findOne({_id:prof},callback)

    }).populate('userProfileId')
}


UserSchema.statics.updateFieldToProfileOfUser=function (userid, field,callback) {
    userModel.findOne({_id:userid},function (err,user) {
        if (err)
            throw err;
        userProfileModel.update({_id:user.userProfileId._id},{$set:field},callback)
    }).populate('userProfileId')

};
UserSchema.statics.updateFieldsUserAccount=function(userid, field,callback) {
    userModel.findOne({_id:userid},function (err,user) {
        if (err)
            throw err;
        userAccount.update({_id:user.userAccountId._id},{$set:field},callback)
    }).populate('userAccountId')



};
UserSchema.statics.addNewFieldsToProfile=function(userid,fields,callback){
    userModel.findOne({_id:userid},function (err,user) {
        if(err)
            throw err
        var profileid=user.userProfileId
        userProfileModel.update({_id:profileid},fields,callback)

    })


}


UserSchema.statics.insertToViewedProduct=function(userid,prodid,callback){
    userModel.findOne({_id:userid},function (err,user) {
        if(err)
            throw err;
        var testEchec=0;
        user.userProductVisitedId.forEach(function (e) {
            if(e.prodId==prodid){
                //console.log(e.visitedOn);
                e.visitedOn=Date.now();

                user.save(callback);
                //console.log(e.visitedOn)
            }
            else{
                //console.log(e.prodId +'else');
                testEchec++;
            }

        });
        if(testEchec==user.userProductVisitedId.length){
            //console.log('new'  +testEchec);
            user.userProductVisitedId.push({prodId:prodid,visitedOn:Date.now()});
            user.save(callback);
            //console.log(user.userProductVisitedId)
        }
    })
};

UserSchema.statics.insertToFollowedShops=function(userid,shopid,callback) {
    userModel.findOne({_id: userid}, function (err, user) {
        if (err)
            throw err;
        if (user.userShopsFollowedId.indexOf(shopid) === -1) {

            user.userShopsFollowedId.push(shopid)
            // user.save(callback)

        }
        user.save(callback)


    })

}



UserSchema.statics.insertToViewedShop=function(userid,shopid,callback){
    userModel.findOne({_id:userid},function (err,user) {
        if(err)
            throw err;
        var testEchec=0;
        user.userShopsVisitedId.forEach(function (e) {
            if(e.shopId==shopid){
                //console.log(e.visitedOn);
                e.visitedOn=Date.now();
                user.save(callback);
                //console.log(e.visitedOn)
            }
            else{
                console.log(e.shopId +'else');
                testEchec++;
            }

        });
        if(testEchec==user.userShopsVisitedId.length){
            //console.log('new shop');
            user.userShopsVisitedId.push({shopId:shopid,visitedOn:Date.now()});
            user.save(callback);
            // console.log(user.userShopsVisitedId)
        }
    })
};



UserSchema.statics.insertGroupToGroupsOfUser=function(userid,groupid,callback) {
    userModel.findOne({_id: userid}, function (err, user) {
        if (err)
            throw err;
        if (user.userMemberOfGroupsId.indexOf(groupid) === -1) {

            user.userMemberOfGroupsId.push(groupid)
            // user.save(callback)

        }
        user.save(callback)


    })

}

UserSchema.statics.blockUser=function(userid,callback){
    userModel.findOne({_id:userid},function (err,user) {
        if(err)
            throw err
        user.isBlocked=true;
        user.save(callback);

    })
}

UserSchema.statics.getUserAccount = function (userid, callback) {
    this.findOne({_id: userid}, callback).populate('userAccountId')
};


//update Account in account model



//hadou ne sont pas demandées c bon nta hna kamlou drahmek

UserSchema.statics.getProfileFromAccountId=function(accountId,callback){
    userModel.findOne({userAccountId:accountId},function (err,user) {
        var profileId=user.userProfileId;
        userProfileModel.findOne({_id:profileId},callback)


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
    var user1=new userModel({
        userAccountId:accountId
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



var userModel = mongoose.model('user', UserSchema);
module.exports = userModel;
