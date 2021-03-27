const productModel = require('../model/products.model');

class productSvc {
allProducts(){
    return productModel.find();
}
createProduct(data){
    const product = new productModel(data);
    return product.save();
}
findProductByName(pName){
    return productModel.findOne({pName});
}
}
module.exports = new productSvc();