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

CategorySchema.statics.getAllCategoriesWithTheirProducts=function (callback) {//1param array of all cats

    if(typeof arguments[0]==='function') {
        var allcats = []
        categoryModel.find({}, {categoryName: 1, categoryAllProducts: 1}, function (err, cats) {

            cats.forEach(function (e) {
                var catobj = {}
                catobj.categoryName = e.categoryName
                catobj.products = e.categoryAllProducts
                allcats.push(catobj)
                //console.log(catobj)
            })
            var temp = []
            temp[0] = allcats;
            temp.forEach(callback)
        }).populate({path: 'categoryAllProducts', select: 'productName productPrice  productDescription productShopName'})
    }
    else{


        console.log('lahawla wala kouwata ila bilah')
        return null
    }
}

var categoryModel = mongoose.model('category', CategorySchema);








module.exports = categoryModel;
