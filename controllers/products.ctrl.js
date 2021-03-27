const productSvc = require('../services/products.svc');

class productCtrl{
async viewAllProducts(req, res){
    try {
        const products = await productSvc.allProducts()
        res.status(200);
        res.json({data: products, status: true, err: null});
    } catch (error) {
        res.status(409);
        res.json({data: null, status: false, error});
    }
}
async createProduct(req, res){
    try {
        const checkProduct = await productSvc.findProductByName(req.body.name);
        console.log(req.body);
        console.log(req.body.name);
        console.log(checkProduct);
        if(checkProduct && checkProduct.length > 0){
            res.status(409);
            res.json({error: 'Product_Already_Exist', status: false})
        } else {
            // const product = await productSvc.createProduct(req.body);
            res.status(200);
            // res.json({data: product, status: true, err: null })
        } 
    } catch (error) {
        console.log(error);
        res.status(409);
        res.json({data: null, status: false, error})
    }
}
}
module.exports = new productCtrl();