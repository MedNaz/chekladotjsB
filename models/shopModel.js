/**
 * Created by kissi on 13/03/17.
 */
var mongoose =require('mongoose');
var Schema =mongoose.Schema;
var userModel=require('./userModel')
var sellerModel=require('./sellerModel')
var categoryModel=require('./categoryModel')
var productModel=require('./productModel')

var ShopSchema =new Schema({

    shopName : {type: String},
    shopSellerId : {type: Schema.Types.ObjectId, ref: sellerModel },
    shopCategoriesId : [{type: Schema.Types.ObjectId, ref: categoryModel }],
    shopProductsId : [{type: Schema.Types.ObjectId, ref: productModel }],
    shopFollowersId : [{type: Schema.Types.ObjectId, ref: userModel }],
    shopVisitorsNumber : Number,
    shopLocation : {type : LocationSchema},
    shopLinksToSocialNetworks : [String],   //create object of socialnetworks  {name :"", link:""}
    shopAnnouncementsId : [Schema.Types.ObjectId],
    createdOn : {type :Date, default:Date.now()}

});
var shopModel=mongoose.model('Shop',ShopSchema);
module.exports=shopModel