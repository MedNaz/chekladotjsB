/**
 * Created by medjdoub on 18/03/17.
 */
var express = require('express');


var router = express.Router();
var profileController = require('../Features/Profile/profile');

router.get('/:username',function(req, res){
    console.log(req.params.username);
    profileController.getAccountIdFromUsername(req.params.username, function(err, account){
        if(err){
            throw err;

        }else if(!account){
            profileController.getAccountIdFromUsernameFacebook(req.params.username,function(err, account){
                if(err){
                    throw err;
                }else{
                    if(!account){
                        res.send("profile not found");
                    }else{
                        profileController.getProfileFromAccountID(account._id,function(err,profile){
                            if(err){
                                throw err;
                            }else{
                                console.log(profile);
                                res.send("profile found")
                            }
                            ;
                        });
                    }
                }
            })

        }else{

            profileController.getProfileFromAccountID(account._id,function(err,profile){
                res.send("profile found");
            });

        }

    });





});

module.exports = router;