const router = require('express').Router();
let User = require('../database/user.model');

router.route('/login').post( async(req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists in the database
        const user = await User.findOne({ username });

        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        // console.log(username);
        // console.log(password);
        // console.log(user);
        // console.log(user.password);

        // Check if password is correct
        if (password !== user.password) {
            return res.status(401).json({ message: `Invalid credentials` });
        }

        // Set session variable with user's information
        // req.session.user = user;

        // Return user if login successful
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Handles HTTP post requests to add users to db.
router.route('/signup').post((req, res) => {
    // List out each of our db fields and define what values they should hold.
    const username = req.body.username;
    const password = req.body.password;
    const PIs = [];

    const newUser = new User({
        username,
        password,
        PIs
    });

    newUser.save()
        .then(() => res.json('User Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;