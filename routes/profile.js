/**
 * Created by medjdoub on 18/03/17.
 */
var express = require('express');


var router = express.Router();
var profileController = require('../Features/Profile/profile');

router.get('/:username',function(req, res){

    profileController.constructObject(req.params.username, req, res);

});

module.exports = router;