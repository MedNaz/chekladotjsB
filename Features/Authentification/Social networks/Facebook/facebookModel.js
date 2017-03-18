var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userModel = require('../../../../models/userModel');
var UserAccountSchema = new Schema({

    facebookId: {type: Number},
    accountUsername: {type: String},
    accountEmail: {type: String},
    createdOn: {type: Date, default: Date.now()}
});

UserAccountSchema.statics.getAccountIdFromUsername=function (username,callback) {
    this.findOne({accountUsername:username},callback)
};


var userAccountModel = mongoose.model('accountFacebook', UserAccountSchema);
module.exports = userAccountModel;