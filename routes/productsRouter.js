const express = require('express');
const upload = require('../config/multer.config');
const router = express.Router();
const multer = require('multer')
const productModel = require('../models/product.model')

router.post('/create',upload.single("image"),async (req, res) => {    
    try {
        let { productname, price, discount, bgcolor, textcolor, panelcolor} = req.body;

        let existingProduct = await productModel.findOne({
            $or: [{ productname }, { image: req.file.buffer }]
        });
        
        if (existingProduct) {
            req.flash("error", "Product with this name or image already exists.");
            return res.redirect('/owners/admin');
        };
        
        let product =  await productModel.create({
            image: req.file.buffer,
            productname,
            price,
            discount,
            bgcolor,
            textcolor,
            panelcolor
        });
    
        req.flash("success", "product created successfully");
        res.redirect('/owners/admin');
    } catch (error) {
        console.log('product making error from productsRouter.js file :',error);
    }
});

module.exports = router;