const mongoose = require('mongoose');

const tableSchema = mongoose.Schema({
    tableNo: {
        type: Number,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['Available', 'Occupied'],
        default: 'Available'
    },
    capacity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Table', tableSchema);
