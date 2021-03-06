const express = require('express')

const Wish = require('../models/wish')
const Cart = require('../models/cart')
const Product = require('../models/product')
const router = express.Router();

router.get('/', async(req, res) => {
    if (!req.session.wish) {
        return res.render('pages/Wishlist', { products: 0});
    }
    var wish = new Wish(req.session.wish);
    console.log(wish.generateArray());
    res.render('pages/Wishlist', { products: wish.generateArray() });
})



router.get('/remove-w/:id', (req, res, next) => {
    const productId = req.params.id;
    const wish = new Wish(req.session.wish ? req.session.wish : {});

    wish.removeItem(productId);
    req.session.wish = wish;
    res.redirect('/wishlist');
});

router.get('/add-to-cart-from-wish/:id', (req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    const wish = new Wish(req.session.wish ? req.session.wish : {});
    Product.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/allproduct');
        }
        cart.add(product, product.id);
        wish.removeItem(productId);
        req.session.cart = cart;
        req.session.wish = wish;
        console.log(req.session.cart);
        res.redirect('/wishlist');
    });
});

module.exports = router;