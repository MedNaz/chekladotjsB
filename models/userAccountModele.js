var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userModel= require('./userModel');

var userProfileModel = require('./userProfileModel');

var productModel = require('./productModel');
var shopModel=require('./shopModel');


var UserAccountSchema = new Schema({

    accountUsername: {type: String},
    accountEmail: {type: String, unique: true},
    accountPassword: {type: String, required: true},

    createdOn: {type: Date, default: Date.now()}
});



UserAccountSchema.statics.getAccountIdFromUsername=function (username,callback) {
    this.findOne({accountUsername:username},callback)/* {

        userModel.findOne({userAccountId:accout._id},function (err,user) {
            userModel.findVisitedShops(user._id);
            userModel.findVisitedProducts(user._id);



        })
    })*/
};





var userAccountModele = mongoose.model('account', UserAccountSchema);


module.exports=userAccountModele;
