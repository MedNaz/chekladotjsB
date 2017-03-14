var mongoose =require('mongoose');
var Schema =mongoose.Schema;

var sellerModel= require('./sellerModel')

var AnnoucementSchema = new Schema({
    announceSellerId :{type: Schema.Types.ObjectId, ref : 'sellerModel'},
    announceText : {type :String},
    announceViewsNumber : Number,
    createdOn : {type :Date, default:Date.now()}

});
var annoucementModel=mongoose.model('Announcement',AnnoucementSchema);

module.exports= annoucementModel;