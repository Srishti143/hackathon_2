const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
    invoiceId: {
        type: String,
        required: true,
        unique: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    items: [{
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        total: { type: Number, required: true }
    }],
    subTotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    paymentMethod: {
        type: String,
        enum: ["CASH", "UPI", "CARD"],
        default: "CASH"
    },
    status: {
        type: String,
        enum: ["UNPAID", "PAID"],
        default: "UNPAID"
    },
    paidAt: { type: Date }
}, {
    timestamps: true
});

module.exports = mongoose.model('Invoice', invoiceSchema);
