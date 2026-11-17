const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    tableNo: { // Denormalized for easier querying
        type: String
    },
    items: [{
        name: { type: String, required: true },
        qty: { type: Number, required: true, default: 1 },
        price: { type: Number }
    }],
    status: {
        type: String,
        enum: ["NEW", "PREPARING", "READY", "SERVED"],
        default: "NEW"
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
