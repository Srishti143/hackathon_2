const Invoice = require('../models/Invoice');
const Order = require('../models/Order');
const crypto = require('crypto');

// @desc    Generate Invoice for an Order
// @route   POST /api/invoices/create
// @access  Private/Admin
const createInvoice = async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await Order.findOne({ orderId }).populate('session');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if invoice already exists
        const invoiceExists = await Invoice.findOne({ order: order._id });
        if (invoiceExists) {
            return res.status(400).json({ message: 'Invoice already exists for this order' });
        }

        // Calculate Totals
        // For demo, assuming fixed prices if not in DB. In real app, prices come from Menu DB.
        // We'll hydrate prices here for the demo logic.
        let subTotal = 0;
        const itemsWithPrices = order.items.map(item => {
            const price = item.price || 5.00; // Default mock price if missing
            const total = price * item.qty;
            subTotal += total;
            return {
                name: item.name,
                qty: item.qty,
                price: price,
                total: total
            }
        });

        const taxRate = 0.05; // 5% GST
        const tax = parseFloat((subTotal * taxRate).toFixed(2));
        const grandTotal = subTotal + tax;

        const invoiceId = 'INV' + crypto.randomInt(10000, 99999);

        const invoice = await Invoice.create({
            invoiceId,
            order: order._id,
            session: order.session._id,
            items: itemsWithPrices,
            subTotal,
            tax,
            grandTotal,
            status: 'UNPAID'
        });

        res.status(201).json(invoice);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Invoice generation failed' });
    }
};

// @desc    Mark Invoice as Paid
// @route   PATCH /api/invoices/:id/pay
// @access  Private/Admin
const payInvoice = async (req, res) => {
    const { id } = req.params; // Invoice ID e.g. INV12345
    const { paymentMethod } = req.body;

    try {
        const invoice = await Invoice.findOne({ invoiceId: id });

        if (invoice) {
            if (invoice.status === 'PAID') {
                return res.status(400).json({ message: 'Invoice already paid' });
            }

            invoice.status = 'PAID';
            invoice.paymentMethod = paymentMethod || 'CASH';
            invoice.paidAt = new Date();

            await invoice.save();

            res.json(invoice);
        } else {
            res.status(404).json({ message: 'Invoice not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Payment failed' });
    }
};

module.exports = { createInvoice, payInvoice };
