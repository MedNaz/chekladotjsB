/**
 * Created by kissi on 13/03/17.
 */
var mongoose =require('mongoose');
var Schema =mongoose.Schema;
var ProductSchema=new Schema({
    productSellerId :Schema.Types.ObjectId,
    categoryName:String,
    productName:{type: String},
    productBenchmark :{type: String},
    productPrice : {type : Number},
    // img: { data: Buffer, contentType: String }, need array une main et les autres pour plus de detail
    productTags : [String],
    productState : String,
    productDetail : {type :Schema.Types.ObjectId},
    createdOn : {type :Date, default:Date.now()}
});
var productModel=mongoose.model('Product',ProductSchema);
module.exports=productModel