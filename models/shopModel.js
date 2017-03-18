/**
 * Created by kissi on 13/03/17.
 */
var mongoose =require('mongoose');
var Schema =mongoose.Schema;
var userModel=require('./userModel')
var sellerModel=require('./sellerModel')
var categoryModel=require('./categoryModel')
var productModel=require('./productModel')
var announcementModel=require('./announcementModel')

var ShopSchema =new Schema({

    shopName : {type: String},
    shopSellerId : {type: Schema.Types.ObjectId, ref: 'seller' },
    shopCategoriesId : [{type: Schema.Types.ObjectId, ref: 'category' }],
    shopProductsId : [{type: Schema.Types.ObjectId, ref: 'product' }],
    shopFollowersId : [{type: Schema.Types.ObjectId, ref: 'user'}],
    shopVisitorsNumber : Number,
    //shopLocation : {type : LocationSchema},
    shopLinksToSocialNetworks : [String],   //create object of socialnetworks  {name :"", link:""}
    shopAnnouncementsId : [{type:Schema.Types.ObjectId, ref :'announcement' }],
    createdOn : {type :Date, default:Date.now()}

});

ShopSchema.statics.updateSellerIdOfShop=function(sellerId){
    sellerModel.findOne({_id:sellerId},function (err,seller) {
        if (err)
            throw err;
        var shopid = seller.sellerShopId;
        shopModel.findOne({_id:shopid},function (err,shop) {
            if (err)
                throw err;
            shop.shopSellerId=sellerId;
            shop.save();
            console.log(shop.toString())

        })
    })

};

ShopSchema.statics.insertProductInShop=function (prodId,shopId) {
    this.findOne({_id:shopId},function (err,shop) {
        if(err)
            throw err;

        if(shop.shopProductsId.indexOf(prodId)===-1) {
            shop.shopProductsId.push(prodId);
            shop.save()
        }
        else {
            console.log("product already exists")
        }
    })
};
ShopSchema.statics.addNewFollowerToShop=function(userId,shopId){
    this.findOne({_id:shopId},function (err,shop) {
        if(err)
            throw err;

        if(shop.shopFollowersId.indexOf(userId)===-1) {
            shop.shopFollowersId.push(userId);
            shop.save()
        }
        else {
            console.log("follower already exists")
        }
    })
};



ShopSchema.statics.addNewCategoryToShop=function(categoryId,shopId){
    this.findOne({_id:shopId},function (err,shop) {
        if(err)
            throw err;

        if(shop.shopCategoriesId.indexOf(categoryId)===-1) {
            shop.shopCategoriesId.push(categoryId);
            shop.save()
        }
        else {
            console.log("category already exists")
        }
    })
};


ShopSchema.statics.addNewCategoryToShop=function(announceId,shopId){
    this.findOne({_id:shopId},function (err,shop) {
        if(err)
            throw err;
        shop.shopAnnouncementsId.push(announceId);
        shop.save()


    })
};




ShopSchema.statics.findProductsOfShop=function(id,callback){
    this.findOne({_id:id}).populate('shopProductsId').exec(function (err,prods) {
        if (err)
            throw err;
        prods.shopProductsId.forEach(callback)

       /* prods.forEach(function (e) {
            //console.log(((e.productsId)[0]).prix)
            e.productsId.forEach(callback)

        });*/
    });


};


ShopSchema.statics.findFollowersOfShop=function(id,callback){
    this.findOne({_id:id}).populate('shopFollowersId').exec(function (err,users) {
        if (err)
            throw err;
        if(users.shopFollowersId.length==0)
            console.log('there is no follower')
        else
            users.shopFollowersId.forEach(callback)

    });


};


ShopSchema.statics.findCategoriesOfShop=function(id,callback){
    this.findOne({_id:id}).populate('shopCategoriesId').exec(function (err,categories) {
    if (err)
        throw err;
    if(categories.shopCategoriesId.length==0)
        console.log('there is no category')
    else
        categories.shopCategoriesId.forEach(callback)


});
};


ShopSchema.statics.findAnnouncementsOfShop=function(id,callback){
    this.findOne({_id:id}).populate('shopAnnouncementsId').exec(function (err,announcement) {
        if (err)
            throw err;
        if(announcement.shopAnnouncementsId.length==0)
            console.log('there is no announcement')
        else
            announcement.shopAnnouncementsId.forEach(callback)


    });
};


ShopSchema.statics.findSocialNetworkLinksOfShop=function(id,callback){
    this.findOne({_id:id}).populate('shopLinksToSocialNetworks').exec(function (err,links) {
        if (err)
            throw err;
        if(links.shopLinksToSocialNetworks.length==0)
            console.log('there is no social network')
        else
            links.shopLinksToSocialNetworks.forEach(callback)


    });
};


var shopModel=mongoose.model('shop',ShopSchema);

/*
var shop1=new shopModel({
    shopName:"bigMarket"

});
shop1.save();

*/

module.exports=shopModel;