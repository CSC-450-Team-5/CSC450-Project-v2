const router = require('express').Router();
let User = require('../database/user.model');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists in the database
        const user = await User.findOne({ username });

        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }

        // Check if password is correct
        if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Set session variable with user's information
        req.session.user = user;

        // Return user if login successful
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;