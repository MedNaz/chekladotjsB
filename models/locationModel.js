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


var l1=new locationModel({  //tres loin par rapport l3 si l2 le centre
    loc:{type:'Point',
    coordinates:[35.699916,-0.580372]}
});

//l1.save();

var l3=new locationModel({
    loc:{type:'Point',
        coordinates:[35.700641,-0.595481]}

});

//l3.save();
var l2=new locationModel({
    loc:{type:'Point',
        coordinates:[35.680641,-0.594644]}

});
//l2.save();
console.log('passed');
module.exports = locationModel