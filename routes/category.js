/**
 * Created by medjdoub on 20/03/17.
 */
var express = require('express');
var router = express.Router();


router.get('/:category', function(req, res){
    res.send(req.params.category);
});

module.exports = router;