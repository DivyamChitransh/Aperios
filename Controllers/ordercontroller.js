const Cart = require('../models/cartmodels.js');
const Order = require('../models/ordermodels.js');
const PromoCode = require('../models/promocodemodel');

const placeOrder = async (req, res) => {
    const { userID } = req.body;
    try {
        const cart = await Cart.findOne({ userID }).populate('items.itemId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        if (cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }
        let subtotal = 0;
        cart.items.forEach(item => {
            subtotal += item.itemId.price * item.quantity;
        });
        let discount = 0;
        if (cart.promoCode) {
            const promo = await PromoCode.findOne({ code: cart.promoCode });
            if (promo && promo.expiresAt > Date.now() && promo.usageLimit > 0) {
                if (promo.type === 'flat') {
                    discount = promo.value;
                } else if (promo.type === 'percent') {
                    discount = (subtotal * promo.value) / 100;
                }
                promo.usageLimit -= 1;
                await promo.save();
            }
        }

        const deliveryCharge = 50;
        const totalAmount = subtotal + deliveryCharge - discount;

        const newOrder = new Order({userID,items: cart.items.map(i => ({
                itemId: i.itemId._id,
                quantity: i.quantity
            })),promoCode: cart.promoCode,totalAmount,discountAmount: discount,deliveryCharge
        });

        await newOrder.save();
        cart.items = [];
        cart.promoCode = "";
        await cart.save();

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getUserOrders = async (req, res) => {
    const { userID } = req.body;
    try {
        const orders = await Order.find({ userID }).populate('items.itemId');
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = status;
        await order.save();
        res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { placeOrder, getUserOrders, updateOrderStatus };
