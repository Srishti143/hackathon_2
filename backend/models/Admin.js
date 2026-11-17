const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    empId: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "ADMIN",
        enum: ["ADMIN", "STAFF"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', adminSchema);
