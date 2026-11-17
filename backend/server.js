const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './backend/.env' });

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for now (adjust for prod)
        methods: ["GET", "POST", "PATCH"]
    }
});

// Attach IO to request for explicit usage in Controllers
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Socket.IO Connection Handler
io.on('connection', (socket) => {
    console.log(`🔌 New Client Connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`❌ Client Disconnected: ${socket.id}`);
    });
});

// Routes (Placeholder for now)
app.get('/', (req, res) => {
    res.send('Retro Cafe API is running...');
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const tableRoutes = require('./routes/tableRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/tables', tableRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`☕ Retro Cafe Backend is running on port ${PORT}`);
});
