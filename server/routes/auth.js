const router = require('express').Router();


let User = require('../database/user.model');

router.route('/login').post( async(req, res) => {
    try {
        if(!req.body.username || !req.body.password){
            console.log("Send needed params")
            res.json({success: false, error: "Send needed params"});
            return;
        }

        const { username, password } = req.body;

        // Check if user exists in the database
        const user = await User.findOne({ username })
            .then((user) => {
                if (!user) {
                    console.log("User does not exist");
                    res.json({success: false, error: "User does not exist"});
                }else {
                    // Check if password is correct
                    if (password !== user.password) {
                        console.log("Wrong password");
                        res.json({success: false, error: "Wrong password"});
                    } else{
                        res.json({success: true, userId: user._id});
                    }
                }
            })
    } catch (err) {
        console.log(err);
        res.json({success: false, error: err});
    }
});

// Handles HTTP post requests to add users to db.
router.route('/signup').post((req, res) => {
    // List out each of our db fields and define what values they should hold.

    if(!req.body.username || !req.body.password){
        // console.log("Send needed params")
        res.json({success: false, error: "Send needed params"});
        return;
    }
    const username = req.body.username;
    const password = req.body.password;
    const PIs = [];

    const newUser = new User({
        username,
        password,
        PIs
    });
    // console.log(newUser);

    newUser.save()
        .then((newUser) => {
            // console.log(newUser);
            res.json({success: true, userId: newUser._id});
        })
        .catch((err) => {
            res.json({success: false, error: err});
        })
});

module.exports = router;