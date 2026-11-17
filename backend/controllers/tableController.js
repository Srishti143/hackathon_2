const Table = require('../models/Table');

// @desc    Get all tables
// @route   GET /api/tables
// @access  Public
const getTables = async (req, res) => {
    try {
        const tables = await Table.find({}).sort({ tableNo: 1 });
        res.json(tables);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tables' });
    }
};

// @desc    Update table status
// @route   PATCH /api/tables/:id
// @access  Private/Admin (Public for now as no strictly enforced middleware on these endpoints yet, but intended for Admin)
const updateTableStatus = async (req, res) => {
    const { id } = req.params; // Using MongoDB ID or tableNo? Let's use MongoDB ID for consistency
    const { status } = req.body;

    try {
        const table = await Table.findById(id);

        if (table) {
            table.status = status;
            await table.save();

            // Emit Socket Event
            if (req.io) {
                req.io.emit('table-updated', table);
                console.log(`📡 Emitted table-updated: Table ${table.tableNo} -> ${status}`);
            }

            res.json(table);
        } else {
            res.status(404).json({ message: 'Table not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Update failed' });
    }
};

// @desc    Update total number of tables
// @route   POST /api/tables/resize
// @access  Admin
const updateTableCount = async (req, res) => {
    const { count } = req.body;
    const newCount = parseInt(count);

    if (isNaN(newCount) || newCount < 1 || newCount > 50) {
        return res.status(400).json({ message: 'Invalid table count (1-50)' });
    }

    try {
        const currentTables = await Table.find().sort({ tableNo: 1 });
        const currentCount = currentTables.length;

        if (newCount > currentCount) {
            // Add new tables
            const tablesToAdd = [];
            for (let i = currentCount + 1; i <= newCount; i++) {
                tablesToAdd.push({
                    tableNo: i,
                    status: 'Available',
                    capacity: i % 2 === 0 ? 4 : 2
                });
            }
            await Table.insertMany(tablesToAdd);
        } else if (newCount < currentCount) {
            // Remove extra tables
            await Table.deleteMany({ tableNo: { $gt: newCount } });
        }

        // Emit Refresh Event
        if (req.io) {
            req.io.emit('table-refresh', { count: newCount });
        }

        res.json({ success: true, count: newCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to resize tables' });
    }
};

module.exports = { getTables, updateTableStatus, updateTableCount };
