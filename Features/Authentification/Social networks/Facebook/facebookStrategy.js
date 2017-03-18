/**
 * Created by medjdoub on 16/03/17.
 */
var express = require('express');

var app = express();

var mongoose = require('mongoose');
var facebookModel = require('./facebookModel');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


var FACEBOOK_APP_ID = "1438992112797703";
var FACEBOOK_APP_SECRET = "3e38aebd2afe11d0d92af7188a8306e1";


var userModel = require('../../../../models/userModel');



function facebookStrategy(){
    return new FacebookStrategy({
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:8080/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function(accessToken, refreshToken, profile, cb) {
            var user = {
                facebookId      : profile.id,
                accountUsername : profile.displayName,
                accountEmail    : profile.emails[0].value

            };
            console.log(profile);
            facebookModel.findOne({facebookId : user.facebookId},function(err, result){
                if(err){
                    throw err;
                }else if(!result){

                    facebookModel.create(user, function (err, user) {
                        userModel.createUserAccount(user._id,profile);
                        return cb(err, user.facebookId);
                    });

                }else{

                    return cb(err,user.facebookId);
                }
            })

        }
    )
}

module.exports = facebookStrategy;