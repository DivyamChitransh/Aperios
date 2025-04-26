const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    items: [orderItemSchema],
    promoCode: { type: String },
    totalAmount: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    deliveryCharge: { type: Number, default: 50 },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    orderedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
