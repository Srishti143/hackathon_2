const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    contact: {
        type: String
    },
    tableNo: {
        type: String
    },
    loginType: {
        type: String,
        enum: ["LOGGED_IN", "SKIPPED"],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastActivity: {
        type: Date,
        default: Date.now,
        expires: '24h' // Auto-delete documents after 24h of inactivity if relying on TTL index
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Session', sessionSchema);
