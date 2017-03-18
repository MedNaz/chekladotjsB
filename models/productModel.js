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
    productTags: [String],
    productState: String,
    productDetail: {type: Schema.Types.ObjectId,ref :'detailproduct' },
    createdOn: {type: Date, default: Date.now()}
});

ProductSchema.statics.findAllProduct=function(condition,callback){
    this.find(condition,function (err,prod) {
        if(err)
            throw err
        prod.forEach(callback)


    })

}

/*
ProductSchema.statics.updateCategoryOfProduct=function(phoneId){
    this.findOne({_id:phoneId}).populate('categoryId').exec(function (err,phone) {
        category.findOne({_id:phone.categoryId._id},function (err,cat) {
            // cat.productsId
            if(err)
                throw err
            //cat.categoryAllProducts.push("58cac6c9c6559b40856d8852");
            console.log(cat.categoryAllProducts  +'updated')
        })
    });

}
*/


var productModel = mongoose.model('product', ProductSchema);
var prod1=new productModel({
    productName:'galaxy s5',
    categoryId:"58cac30fc281993f7a4bfec8"
});

var prod2=new productModel({
    productName:'AsusNj550k',
    categoryId:"58cac30fc281993f7a4bfec9"
});

/*
prod1.save();
prod2.save();
*/

module.exports = productModel;