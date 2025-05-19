const express = require('express');
const router = express.Router();
const database = require('../config/database');



// add maintenance logs
// only for admins
// -> /admin/add-maintenance-log
router.post('/add-maintenance-log', async (req, res) => {
    const {  requestId, FixDetails } = req.body;

    
    try {
        const [insert] = await database.query(
            `INSERT INTO MaintenanceLogs (RequestID, FixDetails) VALUES (?, ?)`,
            [requestId, FixDetails]
        )
        res.status(200).json({message: 'Repair log sent'});

    } catch(err) {

        res.status(500).json({ error: 'Something went wrong with the server', err });

    }
})


// view all maintenance logs
// for admin
// -> /admin/view-maintenance-logs
router.get('/view-maintenance-logs', async (req, res) => {

    try {
        const [logs] = await database.query(
            `SELECT * FROM MaintenanceLogs`
        )
        res.status(200).json({message: 'logs fetched', logs});

    } catch(err) {
        console.log("error: ")
        console.log(err)
    }
})




module.exports = router; 