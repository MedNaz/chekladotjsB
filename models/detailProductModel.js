/**
 * Created by kissi on 13/03/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productModel = require('./productModel')

var DetailProductSchema = new Schema({
    productId: {type: Schema.Types.ObjectId, ref: 'product'},
    //all  caracteristics possibl
    quantityOfProduct:Number,

    createdOn: {type: Date, default: Date.now()}
});
var detailProductModel = mongoose.model('detailproduct', DetailProductSchema);
module.exports = detailProductModel;