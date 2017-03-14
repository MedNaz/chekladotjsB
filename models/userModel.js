/**
 * Created by kissi on 13/03/17.
 */


var mongoose =require('mongoose');
var userProfileModel =require('./userProfileModel');
var userAccountModele =require('./userAccountModele');
var Schema =mongoose.Schema;
var UserSchema =new Schema({


    userProfileId :{ type: Schema.Types.ObjectId, ref: 'userProfileModel'},
    userAccountId:  { type: Schema.Types.ObjectId, ref: 'userAccountModele'},
    createdOn : {type :Date, default:Date.now()}
});
var userModel=mongoose.model('users',user);
module.exports=userModel;