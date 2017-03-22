/**
 * Created by kissi on 21/03/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var profile = require('./userProfileModel')
var userModel = require('./userModel')
var shopModel = require('./shopModel')


var SocialNetworkSchema=new Schema({
    socialNetworkName:String,
    socialNetworkLink:String
})


SocialNetworkSchema.statics.updateSocialNetwork=function (socialid,fields,callback) {// 2params err, docs
    socialNetworkModel.update({_id:socialid},{$set:fields},callback)
}

var socialNetworkModel=mongoose.model('socialnetwork',SocialNetworkSchema)