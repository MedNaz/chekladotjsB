/**
 * Created by medjdoub on 19/03/17.
 */
var express = require('express');
var router  = express.Router();

var APIUsersController = require('../controllers/users');
var account = require('../../models/userAccountModele');
var accountFacebook = require('../../Features/Authentification/Social networks/Facebook/facebookModel');
var bcrypt = require('bcrypt');

//does a user exist
router.post('/userExist', function(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    var email = req.body.email;
    var password = req.body.password;
    if(!(email && password)){
        res.json({
            err: true
        })
    }
    account.findOne({accountEmail: email}, function(err, result){
        if(err) throw err;
        if(!result){

            res.json({
                userExist: false
            })

        }else{
            bcrypt.compare(password, result.accountPassword, function(err, result){
                res.json({
                    userExist: result
                });
            })

        }
    })
})
//verify if email already exists => not done
router.post('/emailExist', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var email = req.body.email;
    if(!email){
        res.json({
            EmailNotProvided: true
        })
    }else{

        APIUsersController.emailExist(email, function(result){
            if(!result){
                res.json({
                    emailExist: false
                });
            }else{
                res.json({
                    emailExist: true
                })
            }
        })
    }

})
//get all users with profile
router.get('/', function(req, res){
    APIUsersController.getAllUsers(function(users){
        
        res.json(users);
    })
});

//get a specific user
router.get('/:id', function(req, res){
    APIUsersController.getSpecificUser("58c9a9c1f5ac0a415e4faec2", function(user){

        res.json(user);
    })
});

//get products viewed by a specific user
router.get('/:id/productsViewed',function(req, res){
    APIUsersController.getProductsViewedOfASpecificUser("58c9a9c1f5ac0a415e4faec2", function(user){

        res.json(user);
    })
});

//get shops followed by a specific user
router.get('/:id/shopsFollowed', function(req, res){
    APIUsersController.getShopsFollowedOfASpecificUser("58c9a9c1f5ac0a415e4faec2", function(user){

        res.json(user);
    })
});

//get groups of a specific user
router.get('/:id/groups', function(req, res){
    APIUsersController.getGroupOfASpecificUser("58c9a9c1f5ac0a415e4faec2", function(user){

        res.json(user);
    })
});

//get shops visited by a specific user
router.get('/:id/shopsVisited', function(req, res){
    APIUsersController.getShopsVisitedOfASpecificUser("58c9a9c1f5ac0a415e4faec2", function(user){

        res.json(user);
    })
});

//get profile of user
router.get('/:id/profile', function(req, res){
    APIUsersController.getProfileOfASpecificUser("58c9a9c1f5ac0a415e4faec2", function(err ,user){

        res.json(user);
    })
});

//add a field to profile of a specific user
router.post('/:id/profile', function(req, res){
    var field = {
        profileFirstName : req.body.profileFirstName,
        profileLastName: req.body.profileLastName
    }

    APIUsersController.addAFieldToProfileOfASpecificUser("58c9a9c1f5ac0a415e4faec2",field, function(err ,doc){

        res.json(doc);
    })
});

//update a field to profile of a specific user
router.put('/:id/profile', function(req, res){
    var field = {
        profileFirstName : req.body.profileFirstName,
        profileLastName: req.body.profileLastName
    };

    APIUsersController.updateAFieldToProfileOfAspecificUser("58c9a9c1f5ac0a415e4faec2", field, function(err ,doc){

        res.send(doc);
    });


});


//add a product to products viewed by a specific user
router.post('/:id/productsViewed', function(res, res){

    APIUsersController.addAProductToProductsViewedOfASpecificUser("58c9a9c1f5ac0a415e4faec2","58cac6c9c6559b40856d8852", function(err ,doc){

        res.send(doc);
    });
});

//add a shop to shops followed by a specific user
router.post('/:id/shopsFollowed', function(req, res){
    APIUsersController.addAShopToShopsFollowedByASpecificUser("58c9a9c1f5ac0a415e4faec2","58cbb838892e621cfabc2d92" ,function(err ,doc){

        res.send(doc);
    });
});

//add a group to groups of a specific user
router.post('/:id/groups', function(req, res){
    APIUsersController.addAGroupToGroupsOfASpecificUser("58c9a9c1f5ac0a415e4faec2", function(err ,doc){

        console.log(doc);
    });
});

//add a shop to shops viewed by a specific user
router.post('/:id/shopsViewed', function(req, res){
    APIUsersController.addAShopToShopsViewedOfASpecificUser("58c9a9c1f5ac0a415e4faec2","58cbb838892e621cfabc2d92" ,function(err ,doc){

        res.send(doc);
    });
});

//block my self
router.put('/:id/block', function (req, res) {
    APIUsersController.blockMySelf("58c9a9c1f5ac0a415e4faec2", function(err ,doc){

        res.send(doc);
    });
});

//get account of a specific user
router.get('/:id/account', function(req, res){
    APIUsersController.getAccountOfASpecificUser("58c9a9c1f5ac0a415e4faec2", function(err ,account){

        res.send(account);
    });
});

//update account of a specific user
router.put('/:id/account', function (req, res) {
    var field = {
        accountUsername : req.body.profileFirstName,
        accountEmail: req.body.profileLastName
    };
    console.log(field);
    APIUsersController.updateAccountOfASpecificUser("58c9a9c1f5ac0a415e4faec2",field,  function(err ,account){

        res.send(account);
    });
});


module.exports = router;



































