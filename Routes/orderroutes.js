const express = require('express');
const router = express.Router();
const { placeOrder, getUserOrders, updateOrderStatus } = require('../Controllers/ordercontroller.js');
const {authentication} = require('../Controllers/usercontroller.js')
router.post('/place',authentication, placeOrder);
router.post('/myorders',authentication, getUserOrders);
router.patch('/status/:orderId',authentication, updateOrderStatus);

module.exports = router;
