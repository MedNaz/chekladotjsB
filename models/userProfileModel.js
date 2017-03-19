/**
 * Created by kissi on 13/03/17.
 */


var mongoose =require('mongoose');
var Schema =mongoose.Schema;
var userAccount =require('./userAccountModele');
var userModel=require('./userModel')

var productModel = require('./productModel');
var shopModel=require('./shopModel')


var UserProfileSchema =new Schema({

    profileFirstName : {type:String},
    profileLastName : {type:String},
    profilePhone : {type: String},
    //img: { data: Buffer, contentType: String },
    accountUserGender: {type: String},
    profileDescription:String,
    createdOn : {type :Date, default:Date.now()}
});
var userProfileModel=mongoose.model('profile',UserProfileSchema);









module.exports=userProfileModel;