const express = require('express');
const router = express.Router();

const {addandupdate,getCart,applyPromoCode} = require('../Controllers/cartController.js');

router.post('/add',addandupdate);
router.get('/',getCart);
router.post('/applypromo',applyPromoCode)
module.exports = router;