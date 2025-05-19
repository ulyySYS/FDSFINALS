const express = require('express');
const router = express.Router();
const database = require('../config/database');
 

// add registration
// -> /admin/add-registration
router.post('/add-registration', async (req, res) => {
    const { UserID, RoomID, StartDate, EndDate } = req.body;
  if (!UserID || !RoomID || !StartDate || !EndDate) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const [result] = await database.query(
      `INSERT INTO Registrations (UserID, RoomID, StartDate, EndDate)
       VALUES (?, ?, ?, ?)`,
      [UserID, RoomID, StartDate, EndDate]
    );

    res.status(201).json({ message: 'Registration added.'});
  } catch (err) {
    console.error('Error inserting registration:', err);
    res.status(500).json({ message: 'Database error.', error: err });
  }
});


// view all registrations 
// -> /admin/all-registrations
router.get('/all-registrations', async (req, res) => {
    let allRegistrations = []
    try {
        const [registrations] = await database.query(
            `SELECT * FROM Registrations`
        )
        for(let i = 0; i < registrations.length; i++) {


            const [username] = await database.query(
            `SELECT UserName FROM Users WHERE UserID = ?`,
            [registrations[i].UserID]
            );

            const [contactNumber] = await database.query(
            `SELECT ContactNumber FROM Users WHERE UserID = ?`,
            [registrations[i].UserID]
            );

            const [email] = await database.query(
            `SELECT Email FROM Users WHERE UserID = ?`,
            [registrations[i].UserID]
            );

            let items = {
                RegistrationID: registrations[i].RegisID,
                UserID: registrations[i].UserID,
                RoomID: registrations[i].RoomID,
                StartDate: registrations[i].StartDate,
                EndDate: registrations[i].EndDate,
                AdminID: registrations[i].AdminID,
                UserName: username[0].UserName,
                ContactNumber: contactNumber[0].ContactNumber,
                // Assuming you have a function to get the email    
                Email: email[0].Email,
            }
            allRegistrations.push(items);
        }
        res.status(200).json({message: 'registrations fetched', allRegistrations});

    } catch(err) {
        console.log("error: ")
        console.log(err)
    }
 })

module.exports = router; 