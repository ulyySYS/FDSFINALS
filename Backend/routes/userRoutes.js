const express = require('express');
const router = express.Router();
const database = require('../config/database');


// logs in user, checks if user exists in database and if password matches
// -> /admin/add-user
router.post('/add-user', async (req, res) => {
    const { username, role, ContactNumber, Email, Password } = req.body;

    try {

        const [addUserResult] = await database.query(
            'INSERT INTO Users (UserName, Role, ContactNumber, Email, Password) VALUES (?, ?, ?, ?, ?)',
            [username, role, ContactNumber, Email, Password]
        );
        

        const [userRows] = await database.query(
            'SELECT * FROM Users WHERE Email = ?',
            [Email]
        );
        
        const userInfo = userRows[0]; 
        
        return res.status(200).json({
            message: 'User added successfully', 
            userInfo: userInfo
        });
    }
    catch(err) {
        console.log("Error adding user:", err);
        
        // Check for duplicate entry 
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                error: 'User already exists',
                code: err.code,
                sqlMessage: err.sqlMessage
            });
        }
        
        // Return error for other cases wher user coud not be added
        return res.status(500).json({ 
            error: 'Failed to add user',
            message: err.message
        });
    }
});


// /admin/users
router.post('/users', async (req, res) => {
    const { email , password } = req.body;
    try {
        const [exists] = await database.query(
            'SELECT count(*) from Users WHERE Email = ? and Password = ?',
            [email, password]
        )

        if (exists[0]['count(*)'] == 1){
            const [userInfo] = await database.query(
                'SELECT * from Users WHERE email = ? AND password = ?',
                [email, password]
            );

            res.status(200).json({message: 'Login Successful', userInfo});
        } else {
            res.status(200).json({message: 'Login Unsuccessful, wrong credentials'});
        }


    } catch(err) {
        console.log("error: ")
        console.log(err)
    }
})

// get all users
// -> /admin/all-users
router.get('/all-users', async (req, res) => {
    try {
        const [users] = await database.query(
            `SELECT * FROM Users`
        )
        res.status(200).json({message: 'users fetched', users});

    } catch(err) {
        console.log("error: ")
        console.log(err)
    }
});

module.exports = router; 