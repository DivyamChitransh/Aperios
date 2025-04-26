const express = require('express');
const router = express.Router();
const {newItem,getitems} = require('../Controllers/itemscontroller.js');
 
router.post('/add',newItem);
router.get('/',getitems);

module.exports = router;