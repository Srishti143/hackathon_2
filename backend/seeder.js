const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
const Table = require('./models/Table');
const Session = require('./models/Session');
const Order = require('./models/Order');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './backend/.env' });

// Connect to DB
connectDB();

const importData = async () => {
    try {
        // Clear existing data
        await Admin.deleteMany();
        await Session.deleteMany();
        await Order.deleteMany();

        console.log('Data Destroyed...');

        // 1. Create Admin
        const salt = await bcrypt.genSalt(10);
        // Using 'password123' as per walkthrough
        const passwordHash = await bcrypt.hash('password123', salt);

        const adminUser = await Admin.create({
            empId: 'EMP-001',
            passwordHash,
            role: 'ADMIN'
        });

        console.log(`Admin Created: ${adminUser.empId} (Password: password123)`);

        // 2. Create a Session
        const session = await Session.create({
            sessionId: 'SESSION_DEMO_001',
            name: 'Ayan',
            contact: '9876543210',
            tableNo: '5',
            loginType: 'LOGGED_IN'
        });

        console.log(`Session Created: ${session.name} @ Table ${session.tableNo}`);

        // 3. Seed Tables
        await Table.deleteMany({});
        const tables = Array.from({ length: 12 }, (_, i) => ({
            tableNo: i + 1,
            status: 'Available',
            capacity: (i + 1) % 2 === 0 ? 4 : 2
        }));
        await Table.insertMany(tables);
        console.log("Tables Seeded: 12");


        // 3. Create an Order linked to Session
        await Order.create({
            orderId: 'ORD_1001',
            session: session._id,
            tableNo: session.tableNo,
            items: [
                { name: 'Cappuccino', qty: 1, price: 4.50 },
                { name: 'Croissant', qty: 2, price: 3.00 }
            ],
            status: 'NEW'
        });

        console.log('Sample Order Created');

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
