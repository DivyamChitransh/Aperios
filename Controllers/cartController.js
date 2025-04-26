const Cart = require('../models/cartmodels.js');
const Item = require('../models/itemmodels.js');
const PromoCode = require('../models/promocodemodel.js');

const addandupdate = async (req, res) => {
    const {userID,items, promoCode } = req.body;
    try {
        const existingCart = await Cart.findOne({ userID });
        if (existingCart) {
            existingCart.items = items;
            existingCart.promoCode = promoCode || existingCart.promoCode;
            await existingCart.save();
            return res.status(200).json({ message: 'Cart updated successfully', cart: existingCart });
        }

        const newCart = new Cart({ userID, items, promoCode });
        await newCart.save();
        res.status(201).json({ message: 'Cart created successfully', cart: newCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCart = async (req, res) => {
    const { userID } = req.query;
    try {
        const cart = await Cart.findOne({ userID }).populate('items.itemId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        let subtotal = 0;
        cart.items.forEach(item => {
            subtotal += item.itemId.price * item.quantity;
        });
        let discount = 0;
        if (cart.promoCode) {
            const promo = await PromoCode.findOne({ code: cart.promoCode });
            if (promo) {
                if (promo.expiresAt > Date.now() && promo.usageLimit > 0) {
                    if (promo.type === 'flat') {
                        discount = promo.value;
                    } else if (promo.type === 'percent') {
                        discount = (subtotal * promo.value) / 100;
                    }
                }
            }
        }
        const deliveryCharge = 50; 
        const total = subtotal + deliveryCharge - discount;
        res.status(200).json({subtotal,discount,deliveryCharge,total});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const applyPromoCode = async (req, res) => {
    const { userID, promoCode } = req.body;
    try {
        const cart = await Cart.findOne({ userID });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        let promo = null;
        if (promoCode.match(/^[0-9a-fA-F]{24}$/)) {
            promo = await PromoCode.findById(promoCode);
        }  
        if (!promo) {
            promo = await PromoCode.findOne({ code: promoCode });
        }
        if (!promo) {
            return res.status(404).json({ message: 'Promo code not found' });
        }
        if (promo.expiresAt < Date.now()) {
            return res.status(400).json({ message: 'Promo code has expired' });
        }
        if (promo.usageLimit <= 0) {
            return res.status(400).json({ message: 'Promo code usage limit exceeded' });
        }
    
        cart.promoCode = promo.code;
        await cart.save();
        res.status(200).json({ message: 'Promo code applied successfully', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addandupdate, getCart, applyPromoCode };
