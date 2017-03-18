/**
 * Created by kissi on 13/03/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productModel=require("./productModel")
var CategorySchema = new Schema({
    categoryName: {type: String,unique:true},
    categoryAllProducts:[{type:Schema.Types.ObjectId, ref: 'product'}],
    categoryTags: [String],

    createdOn: {type: Date, default: Date.now()}

});


CategorySchema.statics.updateCategoryOfProduct=function(prodId) {
    productModel.findOne({_id: prodId}, function (err, phone) {
        categoryModel.findOne({_id:phone.categoryId._id},function (err,cat) {
            cat.categoryAllProducts.push(prodId)
            console.log(cat.categoryAllProducts)
           // cat.save()
        });

    }).populate('categoryId')
};




var categoryModel = mongoose.model('category', CategorySchema);



var cat1=new categoryModel({
    categoryName:"phone"
});
//cat1.save()
var cat2=new categoryModel({
    categoryName:"laptop"
});
//cat2.save()





module.exports = categoryModel;
