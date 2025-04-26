const express = require('express');
const {addPromocode,getPromocode} = require('../Controllers/promocode.js');
const router = express.Router();

router.post('/add',addPromocode);
router.get('/',getPromocode);

module.exports =  router;