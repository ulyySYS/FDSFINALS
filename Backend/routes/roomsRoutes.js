const express = require('express');
const router = express.Router();
const database = require('../config/database');


// get all rooms
// -> /admin/all-rooms
router.get('/all-rooms', async (req, res) => {
    const { DormBuildingID } = req.params; 
    try {
        const [rooms] = await database.query(
            `SELECT 
                r.RoomID,
                r.DormBuildingID,
                r.Occupied,
                d.Name
            FROM DormRooms r
            JOIN Dorms d ON r.DormBuildingID = d.DormID`,
            [DormBuildingID]
        )
        res.status(200).json({message: 'rooms fetched', rooms});

    } catch(err) {
        console.log("error: ")
        console.log(err)
        res.status(500).json({message: 'Error fetching rooms'});
    }
});




module.exports = router; 