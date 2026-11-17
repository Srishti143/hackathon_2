const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Session = require('../models/Session');

const protectAdmin = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.admin = await Admin.findById(decoded.id).select('-passwordHash');

            if (!req.admin) {
                throw new Error('Not authorized');
            }
            if (req.admin.role !== 'ADMIN') {
                res.status(403);
                throw new Error('Not authorized as an admin');
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const protectSession = async (req, res, next) => {
    const sessionId = req.headers['session-id'];

    if (!sessionId) {
        return res.status(401).json({ message: 'Not authorized, no session' });
    }

    try {
        const session = await Session.findOne({ sessionId });
        if (!session) {
            return res.status(401).json({ message: 'Session invalid or expired' });
        }
        req.sessionUser = session;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Session validation failed' });
    }
}

module.exports = { protectAdmin, protectSession };
