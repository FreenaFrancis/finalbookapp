
const express=require('express');
const { checkOut, getOrder, getallOrders, cancelOrder } = require('../Controllr/OrderController');
const { verifyUser } = require('../Controllr/userController');

const router=express.Router()
router.post('/checkout',checkOut)

router.get('/order/:userId', getOrder )

router.get('/getallorders',getallOrders)
router.post('/cancelOrder/:orderId',cancelOrder)
module.exports = router; 