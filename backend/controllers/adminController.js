const Order = require('../models/Order');
const Session = require('../models/Session');

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    try {
        // Populate session details to get customer name
        const orders = await Order.find({})
            .populate('session', 'name contact loginType')
            .sort({ createdAt: -1 });

        const formattedOrders = orders.map(order => ({
            orderId: order.orderId,
            customer: order.session ? order.session.name : 'Unknown',
            contact: order.session ? order.session.contact : '-',
            tableNo: order.tableNo || '-',
            items: order.items,
            status: order.status,
            time: order.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));

        res.json(formattedOrders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};

// @desc    Update order status
// @route   PATCH /api/admin/orders/:id
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params; // Expecting Order ID e.g. ORD1234.

    try {
        const order = await Order.findOne({ orderId: id });

        if (order) {
            order.status = status;
            await order.save();

            // ⚡ Emit Real-Time Event
            if (req.io) {
                req.io.emit('order-updated', {
                    orderId: order.orderId,
                    status: order.status
                });
                console.log(`📡 Emitted order-updated: ${order.orderId} -> ${order.status}`);
            }

            res.json({ message: 'Order updated', status: order.status });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Update failed' });
    }
};

// @desc    Get all customers (sessions)
// @route   GET /api/admin/customers
// @access  Private/Admin
const getCustomers = async (req, res) => {
    try {
        const sessions = await Session.find({}).sort({ createdAt: -1 });
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch customers' });
    }
};

// @desc    Get table status
// @route   GET /api/admin/tables
// @access  Private/Admin
const getTables = async (req, res) => {
    try {
        const activeSessions = await Session.find({ tableNo: { $exists: true, $ne: null }, isActive: true });

        const occupiedTables = activeSessions.map(s => s.tableNo);

        res.json({ occupied: occupiedTables });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch table status' });
    }
}

module.exports = { getOrders, updateOrderStatus, getCustomers, getTables };
