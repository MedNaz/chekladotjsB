/**
 * Created by medjdoub on 19/03/17.
 */
var express = require('express');
var router  = express.Router();


//get all users with profile
router.get('/', function(req, res){

});

//get a specific user
router.get('/:username', function(req, res){

});

//get products viewed by a specific user
router.get('/:username/productsViewed',function(req, res){

});

//get shops followed by a specific user
router.get('/:username/shopsFollowed', function(req, res){

});

//get groups of a specific user
router.get('/:username/groups', function(req, res){

});

//get shops visited by a specific user
router.get('/:username/shopsVisited', function(req, res){

});

//get profile of user
router.get('/:username/profile', function(req, res){

});

//add a field to profile of a specific user
router.post('/:username/profile', function(req, res){

});

//update a field to profile of a specific user
router.put('/:username/profile', function(req, res){

});


//add a product to products viewed by a specific user
router.post('/:username/productsViewed', function(res, res){

});

//add a shop to shops followed by a specific user
router.post('/:username/shopsFollowed', function(req, res){

});

//add a group to groups a specific user
router.post('/:username/groups', function(req, res){

});

//add a shop to shops viewed by a specific user
router.post('/:username/shopsViewed', function(req, res){

});

//delete user
router.delete('/:username', function (req, res) {

});

//get account of a specific user
router.get('/:username/account', function(req, res){

});

//update account of a specific user
router.put('/:username/account', function (req, res) {

});

module.exports = router;



































