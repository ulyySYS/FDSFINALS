const express = require('express');
const router = express.Router();
const database = require('../config/database');
const getUserID = require('../services/getUserID');



// add payment
// -> /admin/create-payment
router.post('/create-payment', async (req, res) => {
    const { RegisID, amount, Date } = req.body;

    try {
        const [insert] = await database.query(
            `INSERT INTO Payments (RegisID, Date, Amount) VALUES (?, ?, ?)`,
            [RegisID, Date, amount]
        );


        res.status(200).json({ message: 'Payment Created', paymentID: insert.insertId });


    } catch (err) {
        console.log("Error creating payment:");
        console.log(err);
        res.status(500).json({ error: 'Failed to create payment' });
    }
});

// view all payments 
// -> /admin/all-payments
router.get('/all-payments', async (req, res) => {
    let allPayments = []
    try {
        const [payments] = await database.query(
            `SELECT * FROM Payments`
        )

       


        for(let i = 0; i < payments.length; i++) {
            const userID = await getUserID(payments[i].RegisID);

            const [contactNumber] = await database.query(
                `SELECT ContactNumber FROM Users WHERE UserID = ?`,
                [userID]
            );

            const [email] = await database.query(
                `SELECT Email FROM Users WHERE UserID = ?`,
                [userID]
            );

            const [username] = await database.query(
                `SELECT UserName FROM Users WHERE UserID = ?`,
                [userID]
            );


            let items = {
                PaymentID: payments[i].PaymentID,
                RegistrationID: payments[i].RegisID,
                AdminID: payments[i].AdminID,
                PaymentDate: payments[i].PaymentDate,
                Amount: payments[i].Amount,
                UserName: username[0].UserName,
                ContactNumber: contactNumber[0].ContactNumber,
                Email: email[0].Email
            }
            allPayments.push(items);
        }

        res.status(200).json({message: 'payments fetched', allPayments});

    } catch(err) {
        console.log("error: ")
        console.log(err)
    }
 })

module.exports = router; 