var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userModel=require('./userModel')

var userProfileModel = require('./userProfileModel');

var productModel = require('./productModel');
var shopModel=require('./shopModel')


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
//
// var useraccount1=new  userAccountModele({
//     accountUsername:"nazimov",
//     accountEmail : "nazim@mail.com",
//     accountPassword :"123456"
// });
// //useraccount1.save();
// var user1=new userModel({
//     userAccountId:"58c9a8943cdd4f40e8cd2089"
// });
// //user1.save();
// var useraccount2=new  userAccountModele({
//     accountUsername:"hicheMed",
//     accountEmail : "hichem@mail.com",
//     accountPassword :"11123"
// });
// //useraccount2.save();
// var user2=new userModel({
//     userAccountId:"58c9c3bda6a90d4cccec3c16"
// });
// //user2.save()
module.exports=userAccountModele;