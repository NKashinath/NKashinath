const express = require('express');
const router = express.Router();
const productsCtrl = require('../controllers/products.ctrl');

router.get('/', productsCtrl.viewAllProducts);
router.post('/createProduct', productsCtrl.createProduct);


module.exports = router;