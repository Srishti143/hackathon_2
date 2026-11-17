const Admin = require('../models/Admin');
const Session = require('../models/Session');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// @desc    Auth admin & get token
// @route   POST /api/auth/admin/login
// @access  Public
const authAdmin = async (req, res) => {
    const { empId, password } = req.body;

    const admin = await Admin.findOne({ empId });

    if (admin && (await bcrypt.compare(password, admin.passwordHash))) {
        res.json({
            _id: admin._id,
            empId: admin.empId,
            role: admin.role,
            token: generateToken(admin._id, admin.role)
        });
    } else {
        res.status(401).json({ message: 'Invalid admin credentials' });
    }
};

// @desc    Register a new admin (Seed helper, usually disabled in prod)
// @route   POST /api/auth/admin/register
const registerAdmin = async (req, res) => {
    const { empId, password } = req.body;
    const adminExists = await Admin.findOne({ empId });

    if (adminExists) {
        return res.status(400).json({ message: 'Admin already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
        empId,
        passwordHash
    });

    if (admin) {
        res.status(201).json({
            _id: admin._id,
            empId: admin.empId,
            token: generateToken(admin._id, admin.role)
        });
    } else {
        res.status(400).json({ message: 'Invalid admin data' });
    }
}


// @desc    Customer login
// @route   POST /api/auth/customer/login
// @access  Public
const loginCustomer = async (req, res) => {
    const { name, contact, tableNo } = req.body;
    const sessionId = crypto.randomUUID();

    const session = await Session.create({
        sessionId,
        name,
        contact,
        tableNo,
        loginType: 'LOGGED_IN'
    });

    if (session) {
        // Emit Socket Event for Admin
        if (req.io) {
            req.io.emit('customer-login', {
                sessionId: session.sessionId,
                name: session.name,
                tableNo: session.tableNo,
                time: new Date().toLocaleTimeString()
            });
        }

        res.status(201).json({
            success: true,
            sessionId: session.sessionId
        });
    } else {
        res.status(400).json({ message: 'Invalid session data' });
    }
};

// @desc    Customer skip
// @route   POST /api/auth/customer/skip
// @access  Public
const skipCustomer = async (req, res) => {
    const sessionId = crypto.randomUUID();

    const session = await Session.create({
        sessionId,
        loginType: 'SKIPPED'
    });

    if (session) {
        res.status(201).json({
            success: true,
            sessionId: session.sessionId
        });
    } else {
        res.status(400).json({ message: 'Failed to create guest session' });
    }
};

module.exports = { authAdmin, registerAdmin, loginCustomer, skipCustomer };
