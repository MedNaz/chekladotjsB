/**
 * Created by kissi on 13/03/17.
 */
var mongoose =require('mongoose');
var Schema =mongoose.Schema;

var userModel= require('./userModel')
var DiscussionGroupSchema=new Schema({
    usersId:[ {type: Schema.Types.ObjectId, ref: userModel }],
    createdOn : {type :Date, default:Date.now()}

});

var discussionGroupModel=mongoose.model('DiscussionGroup',DiscussionGroupSchema);

module.exports=discussionGroupModel;