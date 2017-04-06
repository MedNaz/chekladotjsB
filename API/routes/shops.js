/**
 * Created by medjdoub on 19/03/17.
 */
var express = require('express');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var router  = express.Router();
var APIShopController = require('../controllers/shops');
var userModel = require('../../models/userModel');


//get all shops
router.get('/', function(req, res){

    APIShopController.getAllShops(function(err, shops){
        if(err) throw err;
        else if(!shops){
            res.json({err : true});
        }else{
            res.json(shops)
        }
    });
});// tested

//get a specific shop
router.get('/:id', function(req, res){
    var id = req.params.id;
    APIShopController.getBasicInformationOfASpecificShop(id, function(err, shop){

        if(err) throw err;
        else{

                res.json(shop);


        }
    });
});//tested

//get categories of a specific shop
router.get('/:id/categories', function(req, res){

    APIShopController.getCategoriesOfASpecificShop('58cbb838892e621cfabc2d92', function(shopCategories){


            res.json(shopCategories);

    });
})// need fixing

//get products of a specific shop
router.get('/:id/products', function(req, res){
    APIShopController.getProductsOfASpecificShop('58cbb838892e621cfabc2d92', function(shopProducts){


        res.json(shopProducts);

    });

});//tested

//get a product of a specific shop
router.get('/:id/products/:productId', function(req, res){
    APIShopController.getAProductOfASpecificShop('58cbb838892e621cfabc2d92', function(err, product){


        res.json(product);

    });
});//tested

//get followers of a specific shop
router.get('/:id/followers', function(req, res){
    APIShopController.getFollowersOfASpecificShop('58cbb838892e621cfabc2d92', function(followers){


        res.json(followers);

    });
});//need fixing

//get announcements of a specific shop
router.get('/:id/announcements', function(req, res){
    APIShopController.getAnnouncementsOfASpecificShop('58cbb838892e621cfabc2d92', function(announcements){
        // if(announcements === null){
        //     res.json("{}");
        // }
        console.log(announcements);

        res.json(announcements);

    });
});// need fixing

//get announcement of a specific shop
router.get('/:id/announcements/:announcementId', function(req, res){
    APIShopController.getAnnouncementOfASpecificShop('58cbb838892e621cfabc2d92', function(announcement){


        res.json(announcement);

    });
});// not tested

// add a shop to shops
router.post('/', function(req, res){
    var userID = req.session._userID;
    userModel.doesUserHaveShop(userID, function(err, result){
        if(!result){
            var shop ={
                shopName:req.body.shopName,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                shopAddress: req.body.shopAddress,
                shopCategory: req.body.shopCategory,
                shopCity: req.body.shopCity,
                shopTel: req.body.shopTel,

            }



            APIShopController.addShop(userID,shop, function(err, shop){

                res.redirect('/');

            });
        }else{
            res.end();
        }
    })



});//query is not done yet

//add a category to categories of a specific shop
router.post('/:id/categories', function(req, res){


    APIShopController.addCategoryToCategoriesOfASpecificShop('58cac30fc281993f7a4bfec8','58ddb838892e621cfabc2d92', function(err, category){


        res.json(category);

    });
});// need fixing

//add a product to products of a specific shop
router.post('/:id/products', function(req, res){
    var product = {
        productName : req.body.productName,
        productPrice: req.body.productPrice,
        productSellerId: req.body.productSellerId,
        categoryId: req.body.productCategoryId,
        productBenchmark: req.body.productBenchmark,
        productDescription: req.body.productDescription

    }


    APIShopController.addAProductToProductsOfASpecificShop("58cbb838892e621cfabc2d92", product ,function(err, product){
        if(err) {
            throw err;
        }
        else{
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json(product)
        }


    });
});// need fixing

//add a follower to followers of a specific shop
router.post('/:id/followers', function(req, res){
    APIShopController.addAFollowerToFollowersOfASpecificShop('58c9a9c1f5ac0a415e4faec2','58ddb838892e621cfabc2d92', function(err, follower){
        if(err) throw err;
        else{
            res.json(follower);
        }

    });
});// need fixing

//add an announcement to announcements of a specific shop
router.post('/:id/announcements', function(req, res){
    var fields={
        announceText:req.body.announceText
    }
    APIShopController.addAnAnnoucementToAnnouncementsOfASpecificShop("58cbb838892e621cfabc2d92",fields, function(err, announce){
        if(err) throw err;
        else{
            res.json(announce);
        }

    });
});// bug

//add a social link to a specific shop
router.post('/:id/social', function(req, res){
var fields={
    socialNetworkName:req.body.socialNetworkName,
    socialNetworkLink:req.body.socialNetworkLink

}
    APIShopController.addASocialLinkOfASpecificShop("58cbb838892e621cfabc2d92",fields, function(err, social){
        if(err) throw err;
        else{
            res.json(social);
        }

    });
});//bug

//add a social link to a specific shop
router.post('/:id/shopImage', function(req, res){


    // create an incoming form object
    var form = new formidable.IncomingForm();

    var userID = req.session._userID;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname +'/../..', '/uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    var fileName = ''
    form.on('file', function(field, file) {
        fileName = userID + file.name;
        imageLink = 'http://localhost:3000/uploads/'+ fileName;
        fs.rename(file.path, path.join(form.uploadDir, fileName ));
        APIShopController.updateImage(userID, imageLink, function(err, res){
            if(err) throw err;
            console.log(res);
        });
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {

        res.send({
            'success': true,
            'shopImage': 'http://localhost:3000/uploads/'+ fileName
        });
    });

    // parse the incoming request containing the form data
    form.parse(req);



});//

//update information of a specific shop
router.put('/:id', function (req, res) {
    var fields={
        shopName:req.body.shopName
    }
    APIShopController.updateInformationOfASpecifiShop("58cbb838892e621cfabc2d92",fields,function (err,shop) {
        if(err) throw err;
        else{
            res.json(shop);
        }
    })



});

//update categories of a specific shop
router.put('/:id/categories', function(req, res){

});//not ready

//update a product of a specific shop
router.put('/:id/products/:productId', function (req, res) {

});

//update an announcement of a specific shop
router.put('/:id/announcements/:announcementId', function(req, res){

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




















