/**
 * Created by kissi on 13/03/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sellerModel = require('./sellerModel')
var categoryModel = require('./categoryModel')
var detailProductModel = require('./detailProductModel')


var ProductSchema = new Schema({
    productSellerId: {type: Schema.Types.ObjectId, ref : 'seller'},
    categoryId: {type:Schema.Types.ObjectId, ref : 'category'},
    productName: {type: String},
    productBenchmark: {type: Schema.Types.ObjectId,ref :'benchmark'},
    productPrice: {type: Number},
    // img: { data: Buffer, contentType: String }, need array une main et les autres pour plus de detail
    productShopLocationId: {type : Schema.Types.ObjectId, ref : 'location'},
    productTags: [String],
    productState: String,
    productDetail: {type: Schema.Types.ObjectId,ref :'detailproduct' },
    createdOn: {type: Date, default: Date.now()}
});

ProductSchema.statics.getProductById=function(prodid,callback){//2params err,product object
    productModel.findOne({_id:prodid},callback)
}

ProductSchema.statics.updateProduct=function (prodid,fields,callback) {//2params err,doc
    productModel.update({_id:prodid},{$set:fields},callback)
}

/**related to search engine*/
ProductSchema.statics.findAllProductsWithAnyCondition=function(condition,callback){
    productModel.find(condition,function (err,prod) {
        if(err)
            throw err;
        var arrayOfProduct=[]
        arrayOfProduct.push(prod)
        arrayOfProduct.forEach(callback)


    })

};


var productModel = mongoose.model('product', ProductSchema);

module.exports = productModel;
