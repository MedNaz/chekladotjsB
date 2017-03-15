var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserAccountSchema = new Schema({

    accountUsername: {type: String},
    accountEmail: {type: String, unique: true},
    accountPassword: {type: String, required: true},
    accountUserGender: {type: String},
    createdOn: {type: Date, default: Date.now()}
});

var userAccountModele = mongoose.model('account', UserAccountSchema);
module.exports = userAccountModele;