const express=require('express')
const { AddtoCart, GetCart, removeCart } = require('../Controllr/CartController')
const router=express.Router()

// router.post('/addToCart',AddtoCart)

// router.get('/getCart/:userId',GetCart)

// router.post('/removeFromCart',removeCart)
// module.exports=router



router.post('/addToCart', AddtoCart);
router.get('/getCart/:userId', GetCart);
router.post('/removeFromCart', removeCart);

module.exports = router;
