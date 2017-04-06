/**
 * Created by kissi on 13/03/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator=require('./validator');
var LocationSchema = new Schema({
    loc:{type: Schema.Types,
        coordinates :[ Number]},
    locationName:{
        country :String,
        wilaya : String,
        city :String
    }
});
var locationModel = mongoose.model('location', LocationSchema);

module.exports = locationModel