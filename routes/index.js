const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const app = express();
const router = express.Router();
const productModel = require('../models/product.model');
const userModel = require('../models/user.model');

app.set('view engine','ejs');

router.get('/', (req, res) =>{
    let error = req.flash("error");
    res.render('index',{error, loggedin: false});
});

router.get('/shop',isLoggedIn,async (req, res) => {
    let products = await productModel.find();
    let success = req.flash('success');
    res.render("shop",{products, success});
});

router.get('/addtocart/:productid',isLoggedIn,async (req,res) => {
    let user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","added to cart");
    res.redirect('/shop');
});

router.get('/cart',isLoggedIn,async (req,res) => {
    let user = await userModel.findOne({email: req.user.email}).populate('cart');

    res.render('cart',{user});
});

module.exports = router;