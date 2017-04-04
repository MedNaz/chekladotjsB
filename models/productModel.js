/**
 * Created by kissi on 13/03/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sellerModel = require('./sellerModel')
var categoryModel = require('./categoryModel')
var detailProductModel = require('./detailProductModel')
var shopModel=require('./shopModel')
var validator = require('./validator')


var ProductSchema = new Schema({
    productSellerId: {type: Schema.Types.ObjectId, ref : 'seller'},
    productShopId: {type: Schema.Types.ObjectId, ref : 'shop'},
    productShopName:{type: String},
    categoryId: {type:Schema.Types.ObjectId, ref : 'category'},
    productName: {type: String},
    productBenchmark: {type: Schema.Types.ObjectId,ref :'benchmark'},
    productPrice: {type: Number},
    // img: { data: Buffer, contentType: String }, need array une main et les autres pour plus de detail
    productLocation:
        {location: {
            type: Schema.Types,
            coordinates: [Number],

        },
            locationName: {
                country: String,
                wilaya: String,
                city: String
            },
            default:""
        },

    productTags: [String],
    productState: String,
    productDetail: {type: Schema.Types.ObjectId,ref :'detailproduct' },
    productDescription:String,
    createdOn: {type: Date, default: Date.now()}
});



ProductSchema.statics.updateProductShopName=function(prodId,callback){//2param err object of product saved
    productModel.findOne({_id:prodId},function (err,prod) {
        if(err)
            throw err
        shopModel.findOne({_id:prod.productShopId},function (err,shop) {
            if(err)
                throw err
            prod.productShopName=shop.shopName;
            prod.save(callback)
        })
    })
};


ProductSchema.statics.addNewProductToShop=function(shopId,fields,callback){
    if (validator.params3AreValid(arguments)) {
        shopModel.findOne({_id: shopId}, function (err, shop) {
            if (err)
                throw err;
            if (!shop) {
                console.log('shop does not exist');
                callback(err, null)
            }
            else {
                console.log(fields);
                console.log('shop exists');
                var newproduct = new productModel(fields);
                newproduct.save(callback);
                var prodId = newproduct._id;
                shop.shopProductsId.push(prodId);
                categoryModel.findOne({_id: fields.categoryId}, function(err, res){
                    if(res){
                        var category = res;
                        category.categoryAllProducts.push(prodId);
                        category.save(function(){

                        });
                    }

                })
                shop.save();


            }
        })
    }
    else {
        console.log('param not valid')
        callback(null,null)
    }
}


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
