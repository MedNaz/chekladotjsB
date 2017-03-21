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
var locationModel=require('./locationModel')

var ShopSchema =new Schema({

    shopName : {type: String},
    shopSellerId : {type: Schema.Types.ObjectId, ref: 'seller' },
    shopCategoriesId : [{type: Schema.Types.ObjectId, ref: 'category' }],
    shopProductsId : [{type: Schema.Types.ObjectId, ref: 'product' }],
    shopFollowersId : [{type: Schema.Types.ObjectId, ref: 'user'}],
    shopVisitorsNumber : Number,
    shopLocationId : {type : Schema.Types.ObjectId, ref : 'location'},
    shopLinksToSocialNetworks : [{type:Schema.Types.ObjectId, ref:'socialnetwork'}],
    shopAnnouncementsId : [{type:Schema.Types.ObjectId, ref :'announcement' }],
    shopState:String,
    createdOn : {type :Date, default:Date.now()}

});


ShopSchema.statics.getAllShops=function (callback) {//callback 2 param err,shops
    shopModel.find(callback)
}


ShopSchema.statics.getSpecificShopDeepInformation=function (shopid,callback) { //2 params err, shop object
    shopModel.findOne({_id:shopid},callback).populate('shopSellerId').populate(' shopCategoriesId').populate('shopProductsId').populate('shopFollowersId').populate('shopLocationId').populate('shopAnnouncementsId')

};



ShopSchema.statics.getProductsOfShop=function(id,callback){ // 1 param array of all products
    this.findOne({_id:id}).populate('shopProductsId').exec(function (err,prods) {
        var arrayOfProducts=[];
        if (err)
            throw err;
        prods.shopProductsId.forEach(function (e) {
            arrayOfProducts.push(e)

        });
        var temp=[]
        temp[0]=arrayOfProducts;
        temp.forEach(callback)
    });

};



ShopSchema.statics.getBasicInformationOfShop=function(shopid,callback){
    shopModel.findOne({_id:shopid},callback)
};

/**BONUUUS HHH :)*/
ShopSchema.statics.getProductsOfShopByCategory=function(shopid,categoryid,callback){ //1param array of products
    shopModel.findOne({_id:shopid},function (err,shop) {
        var arrayByCategory=[];
        shop.shopProductsId.forEach(function (e) {

            if (e.categoryId==categoryid){
                arrayByCategory.push(e)
            }
        });
        var temp=[];
        temp[0]=arrayByCategory;
        temp.forEach(callback)

    }).populate('shopProductsId')
}

ShopSchema.statics.getCategoriesOfShop=function(id,callback){// 1 param array of categories
    this.findOne({_id:id}).populate('shopCategoriesId').exec(function (err,categories) {
        var arrayOFCategories=[]
        if (err)
            throw err;
        if(categories.shopCategoriesId.length==0)
            console.log('there is no category')
        else
        {
            categories.shopCategoriesId.forEach(function (e) {
                arrayOFCategories.push(e)
            })
            var temp=[]
            temp[0]=arrayOFCategories
            temp.forEach(callback)
        }



    });
};


ShopSchema.statics.getFollowersOfShop=function(id,callback){//1param array of ...

    this.findOne({_id:id}).populate('shopFollowersId').exec(function (err,users) {
        if (err)
            throw err;
        var arrayOfFollowers=[]
        if(users.shopFollowersId.length==0)
            console.log('there is no follower')
        else{
                users.shopFollowersId.forEach(function (e) {
                    arrayOfFollowers.push(e)

                })
            var temp=[]
            temp[0]=arrayOfFollowers
            temp.forEach(callback)


        }


    });


};



ShopSchema.statics.getSocialNetworkLinksOfShop=function(id,callback){//1param array of ...
    this.findOne({_id:id}).populate('shopLinksToSocialNetworks').exec(function (err,links) {
        if (err)
            throw err;
        var arrayOfLinks=[]
        if(links.shopLinksToSocialNetworks.length==0)
            console.log('there is no social network')
        else {
                links.shopLinksToSocialNetworks.forEach(function (e) {
                    arrayOfLinks.push(e)


            })
            var temp=[]
            temp[0]=arrayOfLinks
            temp.forEach(callback)
        }

    });
};

ShopSchema.statics.getAnnouncementsOfShop=function(id,callback){//1param array of ...
    this.findOne({_id:id}).populate('shopAnnouncementsId').exec(function (err,announcement) {
        if (err)
            throw err;
        var arrayOfAnnoucements = []

        if (announcement.shopAnnouncementsId.length == 0)
                console.log('there is no announcement')
        else{
            announcement.shopAnnouncementsId.forEach(function (e) {
                arrayOfAnnoucements.push(e)
                })
            var temp=[]
            temp[0]=arrayOfAnnoucements
            temp.forEach(callback)


        }
    });
};

ShopSchema.statics.updateShop=function (shopid,fields,callback) {//2 params err, docs
    shopModel.update({_id:shopid},{$set:fields},callback)
}


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

ShopSchema.statics.addProductInShop=function (prodId,shopId,callback) { //2 params err , product object
    this.findOne({_id:shopId},function (err,shop) {
        if(err)
            throw err;

        if(shop.shopProductsId.indexOf(prodId)===-1) {
            shop.shopProductsId.push(prodId);
            shop.save(callback)
        }
        else {
            console.log("product already exists")
        }
    })
};
ShopSchema.statics.addNewFollowerToShop=function(userId,shopId,callback){//2 params err , follower object
    this.findOne({_id:shopId},function (err,shop) {
        if(err)
            throw err;

        if(shop.shopFollowersId.indexOf(userId)===-1) {
            shop.shopFollowersId.push(userId);
            shop.save(callback)
        }
        else {
            console.log("follower already exists")
        }
    })
};



ShopSchema.statics.addNewCategoryToShop=function(categoryId,shopId,callback){//2 params err , category object
    this.findOne({_id:shopId},function (err,shop) {
        if(err)
            throw err;

        if(shop.shopCategoriesId.indexOf(categoryId)===-1) {
            shop.shopCategoriesId.push(categoryId);
            shop.save(callback)
        }
        else {
            console.log("category already exists")
        }
    })
};


ShopSchema.statics.addNewAnnouncementToShop=function(announceId,shopId,callback){//2 params err , announce object
    this.findOne({_id:shopId},function (err,shop) {
        if(err)
            throw err;
        if(shop.shopAnnouncementsId.indexOf(announceId)===-1){
        shop.shopAnnouncementsId.push(announceId);
        shop.save(callback)
        }
        else
        {
            console.log('already exists')
        }


    })
};

ShopSchema.statics.addNewSocialNetworkToShop=function(socialid,shopId,callback){//2 params err , social object
    this.findOne({_id:shopId},function (err,shop) {
        if(err)
            throw err;

        if(shop.socialNetworkLink.indexOf(socialid)===-1) {
            shop.socialNetworkLink.push(socialid);
            shop.save(callback)
        }
        else {
            console.log("link already exists")
        }
    })
};

ShopSchema.statics.deleteShop=function(shopid,callback){ // you don't need callback in this moment
    shopModel.find({_id:shopid},function (err,shop) {
        if(err)
            throw err
        shop.shopState="blocked"
        // inchallah this method will be personalized with adding shop blocked in all objects related to this shop
    })
}

var shopModel=mongoose.model('shop',ShopSchema);


module.exports=shopModel;