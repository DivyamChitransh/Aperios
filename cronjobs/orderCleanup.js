const cron = require('node-cron');
const Order = require('../models/orderModel');

cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled job: Cleaning up old cancelled orders...');
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    try {
        const result = await Order.deleteMany({
            status: 'Cancelled',
            orderedAt: { $lt: sevenDaysAgo }
        });
        console.log(`Deleted ${result.deletedCount} old cancelled orders.`);
    } catch (error) {
        console.error('Error cleaning old orders:', error.message);
    }
});
