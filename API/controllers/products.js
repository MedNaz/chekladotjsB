/**
 * Created by medjdoub on 31/03/17.
 */

var productsByCategory = require('../../models/categoryModel');

function getProductsByCategory(callback){
    productsByCategory.getAllCategoriesWithTheirProducts(callback);
}


module.exports = {
    getProductsByCategory: getProductsByCategory
}