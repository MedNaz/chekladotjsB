/**
 * Created by kissi on 13/03/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userModel = require('./userModel')

var SellerSchema = new Schema({
    sellerUserId: {type: Schema.Types.ObjectId, ref: userModel},
    sellerShopId: Schema.Types.ObjectId,
    createdOn: {type: Date, default: Date.now()}

});
var sellerModel = mongoose.model('Seller', SellerSchema);
module.exports = sellerModel