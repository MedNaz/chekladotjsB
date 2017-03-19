/**
 * Created by medjdoub on 19/03/17.
 */
var express = require('express');
var router  = express.Router();

//get all shops
router.get('/', function(req, res){

});

//get a specific shop
router.get('/:id', function(req, res){

});

//get categories of a specific shop
router.get('/:id/categories', function(req, res){

})

//get products of a specific shop
router.get('/:id/products', function(req, res){

});

//get a product of a specific shop
router.get('/:id/products/:productId', function(req, res){

});

//get followers of a specific shop
router.get('/:id/followers', function(req, res){

});

//get announcements of a specific shop
router.get('/:id/announcements', function(req, res){

});

//get announcement of a specific shop
router.get('/:id/announcements/:announcementId', function(req, res){

});

// add a shop to shops
router.post('/shops', function(req, res){

});

//add a category to categories of a specific shop
router.post('/:id/categories', function(req, res){

});

//add a product to products of a specific shop
router.post('/:id/products', function(req, res){

});

//add a follower to followers of a specific shop
router.post('/:id/followers', function(res, res){

});

//add an announcement to announcements of a specific shop
router.post('/:id/announcements', function(res, res){

});

//add a social links of a specific shop
router.post('/:id/social', function(res, req){

});

//update information of a specific shop
router.put('/:id', function (req, res) {

});

//update categories of a specific shop
router.put('/:id/categories', function(req, res){

});

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




















