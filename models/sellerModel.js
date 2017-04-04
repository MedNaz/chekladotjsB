/**
 * Created by kissi on 13/03/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var profile = require('./userProfileModel')
var userModel = require('./userModel')
var shopModel = require('./shopModel')


var SellerSchema = new Schema({
    sellerUserId: {type: Schema.Types.ObjectId, ref: 'user'},
    sellerShopId: {type:Schema.Types.ObjectId,ref :'shop' },
    createdOn: {type: Date, default: Date.now()}

});/*
SellerSchema.statics.updateUserAndShopOfSeller=function(userId,shopId,sellerId){
    this.findOne({_id:sellerId},function (err,seller) {
        seller.sellerUserId=userId;
        seller.sellerShopId=shopId;
        seller.save()

    })
};*/
// to get the shop object of a specific seller
SellerSchema.statics.findShopOfSeller=function(sellerId,callback){
    this.findOne({_id:sellerId},callback).populate('sellerShopId')
};




SellerSchema.statics.findUserProfileOfSeller=function(sellerId,callback){
    this.findOne({_id:sellerId},function (err,seller) {
        if (err)
            throw err
        var userid=seller.sellerUserId._id;
        userModel.findUserProfile(userid,callback); /** example of callback ohw to get userProfileId function (err,userProfil) {
            if (err)
                throw err
            //console.log(userProfil.userProfileId.toString())
        },*/
    }).populate('sellerUserId')
};


var sellerModel = mongoose.model('seller', SellerSchema);
var seller1=new sellerModel({});
//seller1.save();

module.exports = sellerModel;