var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserAccountSchema = new Schema({

    facebookId: {type: Number},
    accountUsername: {type: String},
    accountEmail: {type: String},
    createdOn: {type: Date, default: Date.now()}
});

var userAccountModel = mongoose.model('accountFacebook', UserAccountSchema);
module.exports = userAccountModel;