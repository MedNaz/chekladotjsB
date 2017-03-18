var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Created by kissi on 13/03/17.
 */
var userModel = require('./userModel');
var categoryModel= require('./categoryModel');
var publicationModel=require('./publicationModel')

var GroupeSchema = new Schema({
    groupAdmin: {type: Schema.Types.ObjectId, ref:'user'},
    groupCategoryId: {type: Schema.Types.ObjectId, ref : 'category'},
    groupVisitorsNumber: Number,
    groupMembers: [{type:Schema.Types.ObjectId, ref: 'user'}],
    groupPublications: [{type : Schema.Types.ObjectId,ref : 'publication'}],
    createdOn: {type: Date, default: Date.now()}
});
var groupeModel = mongoose.model('groupe', GroupeSchema);
module.exports = groupeModel;