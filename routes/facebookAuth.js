/**
 * Created by medjdoub on 16/03/17.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;



/* GET home page. */
router.get('/',
    passport.authenticate('facebook',{ scope: ['user_friends','email', 'manage_pages'] }));

router.get('/callback',
    passport.authenticate('facebook', { failureRedirect: '/fail' }),
    function(req, res) {
        // Successful authentication, redirect home.
        ;
        res.send("You're just connected with facebook");
    });

module.exports = router;
