const Order = require('../models/Order');
const Session = require('../models/Session');
const crypto = require('crypto');

// @desc    Create new order
// @route   POST /api/orders/create
// @access  Public (Protected by Session ID)
const createOrder = async (req, res) => {
    // req.sessionUser is populated by protectSession middleware
    const { items } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'No items in order' });
    }

    try {
        const orderId = 'ORD' + crypto.randomInt(1000, 9999);

        const order = await Order.create({
            orderId,
            session: req.sessionUser._id, // Link to Session DB ID
            tableNo: req.sessionUser.tableNo, // Denormalize table number
            items,
            status: 'NEW'
        });

        // ⚡ Emit Real-Time Event
        if (req.io) {
            req.io.emit('new-order', {
                orderId: order.orderId,
                customer: req.sessionUser.name || 'Skipped',
                tableNo: order.tableNo,
                items: order.items,
                status: order.status,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
            console.log(`📡 Emitted new-order: ${order.orderId}`);
        }

        res.status(201).json({
            success: true,
            orderId: order.orderId,
            status: order.status
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Order creation failed' });
    }
};

// @desc    Get my orders (active session)
// @route   GET /api/orders/my-orders
// @access  Public (Protected by Session ID)
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ session: req.sessionUser._id }).sort({ createdAt: -1 });

        const formattedOrders = orders.map(order => ({
            orderId: order.orderId,
            items: order.items,
            status: order.status,
            time: order.createdAt // formatting done in frontend
        }));

        res.json(formattedOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch your orders' });
    }
};

module.exports = { createOrder, getMyOrders };
