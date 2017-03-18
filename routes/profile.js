/**
 * Created by medjdoub on 18/03/17.
 */
var express = require('express');


var router = express.Router();

router.get('/',function(req, res){
    res.render('profile');




});

module.exports = router;