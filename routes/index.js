const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const app = express();
const router = express.Router();

app.set('view engine','ejs');

router.get('/', (req, res) =>{
    let error = req.flash("error");
    res.render('index',{error: error});
});

router.get('/shop',isLoggedIn, (req, res) => {
    let products = [];
    res.render("shop",{products});
})

module.exports = router;