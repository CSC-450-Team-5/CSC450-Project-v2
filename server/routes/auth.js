const router = require('express').Router();
const JsonWebToken = require('jsonwebtoken');
const SECRET_JWT_CODE = process.env.JWT_SECRET;


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
                        const token = JsonWebToken.sign({ id: user._id, username: user.username}, SECRET_JWT_CODE, { expiresIn: '2h' });
                        res.json({success: true, token: token});
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
            const token = JsonWebToken.sign({ id: newUser._id, username: newUser.username}, SECRET_JWT_CODE);
            res.json({success: true, token: token});
        })
        .catch((err) => {
            // console.log(err);
            res.json({success: false, error: err});
        })
});

// router.route('/protected').get((req, res) => {
//     const user = req.user;
//     User.findById(user.id)
//         .then(user => res.json(user))
//         .catch(err => res.status(400).json('Error: ' + err));
//   });

module.exports = router;