/**
 * Created by medjdoub on 19/03/17.
 */
var express = require('express');
var router  = express.Router();
var APIShopController = require('../controllers/shops');



//get all shops
router.get('/', function(req, res){

    APIShopController.getAllShops(function(err, shops){
        if(err) throw err;
        else{
            res.json(shops);
        }
    });
});// tested

//get a specific shop
router.get('/:id', function(req, res){

    APIShopController.getBasicInformationOfASpecificShop('58ddb838892e621cfabc2d92', function(err, shop){
        if(err) throw err;
        else{
            res.json(shop);
        }
    });
});//tested

//get categories of a specific shop
router.get('/:id/categories', function(req, res){

    APIShopController.getCategoriesOfASpecificShop('58ddb838892e621cfabc2d12', function(shopCategories){


            res.json(shopCategories);

    });
})// need fixing

//get products of a specific shop
router.get('/:id/products', function(req, res){
    APIShopController.getProductsOfASpecificShop('58ddb838892e621cfabc2d92', function(shopProducts){


        res.json(shopProducts);

    });

});//tested

//get a product of a specific shop
router.get('/:id/products/:productId', function(req, res){
    APIShopController.getAProductOfASpecificShop('58cac6c9c6559b40856d8853', function(err, product){


        res.json(product);

    });
});//tested

//get followers of a specific shop
router.get('/:id/followers', function(req, res){
    APIShopController.getFollowersOfASpecificShop('58ddb838892e621cfabc2d92', function(followers){


        res.json(followers);

    });
});//need fixing

//get announcements of a specific shop
router.get('/:id/announcements', function(req, res){
    APIShopController.getAnnouncementsOfASpecificShop('58ddb838892e621cfabc2d92', function(announcements){
        // if(announcements === null){
        //     res.json("{}");
        // }
        console.log(announcements);

        res.json(announcements);

    });
});// need fixing

//get announcement of a specific shop
router.get('/:id/announcements/:announcementId', function(req, res){
    APIShopController.getAnnouncementOfASpecificShop('58ddb838892e621cfabc2d92', function(announcement){


        res.json(announcement);

    });
});// not tested

// add a shop to shops
router.post('/shops', function(req, res){

});//query is not done yet

//add a category to categories of a specific shop
router.post('/:id/categories', function(req, res){
    APIShopController.addCategoryToCategoriesOfASpecificShop('58cac30fc281993f7a4bfec8','58ddb838892e621cfabc2d92', function(err, category){


        res.json(category);

    });
});// need fixing

//add a product to products of a specific shop
router.post('/:id/products', function(req, res){
    APIShopController.addAProductToProductsOfASpecificShop('58cac6c9c6559b40856d8852','58ddb838892e621cfabc2d92', function(err, product){
        if(err) throw err;
        else{
            res.json(product);
        }


    });
});// need fixing

//add a follower to followers of a specific shop
router.post('/:id/followers', function(res, res){
    APIShopController.addAFollowerToFollowersOfASpecificShop('58c9a9c1f5ac0a415e4faec2','58ddb838892e621cfabc2d92', function(err, follower){
        if(err) throw err;
        else{
            res.json(follower);
        }

    });
});// need fixing

//add an announcement to announcements of a specific shop
router.post('/:id/announcements', function(res, res){
    APIShopController.addAnAnnoucementToAnnouncementsOfASpecificShop('58ddb838892e621cfabc2d92','58ddb838892e621cfabc2d92', function(err, announce){
        if(err) throw err;
        else{
            res.json(announce);
        }

    });
});// bug

//add a social link to a specific shop
router.post('/:id/social', function(res, req){

    APIShopController.addASocialLinkOfASpecificShop('58ddb838892e621cfabc2d92','58ddb838892e621cfabc2d92', function(err, social){
        if(err) throw err;
        else{
            res.json(social);
        }

    });
});//bug

//update information of a specific shop
router.put('/:id', function (req, res) {

});

//update categories of a specific shop
router.put('/:id/categories', function(req, res){

});//not ready

//update a product of a specific shop
router.put('/:id/products/:productId', function (req, res) {

});

//update an announcement of a specific shop
router.put('/:id/announcements/:announcementId', function(res, res){

});


//update social links of a specific shop
router.put('/:id/social', function (req, res) {

});

//delete a shop
router.delete('/:id', function (req, res) {

});
//delete a product from a specific shop
router.delete('/:id/products/:productId', function(req, res){

});

module.exports = router;




















