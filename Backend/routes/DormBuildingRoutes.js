const express = require('express');
const router = express.Router();
const database = require('../config/database');


// get all buildings
// -> /admin/all-buildings
router.get('/all-buildings', async (req, res) => {
    try {
        const [buildings] = await database.query(
            `SELECT * FROM Dorms`
        )
        res.status(200).json({message: 'rooms fetched', buildings});

    } catch(err) {
        console.log("error: ")
        console.log(err)
    }
});


module.exports = router; 