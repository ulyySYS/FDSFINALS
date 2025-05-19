const express = require('express');
const router = express.Router();
const database = require('../config/database');

// add maintenance request
// -> /users/request
router.post('/request', async (req, res) => {
    const {  RequestDetails, UserID } = req.body;

    const [RoomID] = await database.query(

        `SELECT RoomID FROM Registrations WHERE UserID = ?`,
        [UserID]
    )

    
    try {
        const [insert] = await database.query(
            `INSERT INTO MaintenanceRequests (RoomID, UserID, RequestDetails, Status) VALUES (?, ?, ?, ?)`,
            [RoomID[0].RoomID,UserID, RequestDetails, "not_fixed"]
        )
        res.status(200).json({message: 'Request Sent and logged'});

    } catch(err) {
        console.log("error: ")
        console.log(err)
    }
})

// view all maintenance requests for a single user
// -> /users/all-user-requests/:userID
router.get('/all-user-requests/:UserID', async (req, res) => {
    const { UserID } = req.params;

    
    try {
        const [requests] = await database.query(
            `SELECT RequestDetails, Date, Status
             FROM MaintenanceRequests
             WHERE UserID = ?
             ORDER BY Date DESC`,
            [UserID]
        )
        res.status(200).json({message: 'requests fetched', requests});

    } catch(err) {
        console.log("error: ")
        console.log(err)
    }
})

// view all maintenance requests for admin
// -> /admin/view-maintenance-requests
router.get('/view-maintenance-requests',async(req,res) =>{
    let requests = []
    try {
        const [logs] = await database.query(
            `
            
            SELECT * FROM MaintenanceRequests
            ORDER BY Date DESC;
            `
        )

        for (let i = 0; i < logs.length; i++) {

            const [rows] = await database.query(
                `SELECT UserName FROM Users WHERE UserID = ?`,
                [logs[i].UserID]
            );

            const [DormNameResult] = await database.query(
                `SELECT d.Name AS DormName
                 FROM DormRooms r
                 JOIN Dorms d ON r.DormBuildingID = d.DormID
                 WHERE r.RoomID = ?`,
                [logs[i].RoomID]
                );
            
            let items = {
                RequestID: logs[i].RequestID,
                RoomID: logs[i].RoomID,
                UserID: logs[i].UserID,
                RequestDetails: logs[i].RequestDetails,
                Status: logs[i].Status,
                Date: logs[i].Date,
                Username: rows[0].UserName,
                DormBuildingName: DormNameResult[0].DormName

            };
            requests.push(items);
            console.log("reqs: asfdf",requests)
        }

        res.status(200).json({message: 'requests fetched', requests});

    } catch(err) {
        console.log("error: ")
        console.log(err)
    }
})

module.exports = router; 