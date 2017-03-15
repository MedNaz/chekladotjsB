var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Created by kissi on 13/03/17.
 */

var GroupeSchema = new Schema({
    groupAdmin: {type: Schema.Types.ObjectId},
    groupCategoryId: {type: Schema.Types.ObjectId},
    groupVisitorsNumber: Number,
    groupMembers: [Schema.Types.ObjectId],
    groupPublications: [Schema.Types.ObjectId],
    createdOn: {type: Date, default: Date.now()}
});
var groupeModel = mongoose.model('Groupe', GroupeSchema);
module.exports = groupeModel