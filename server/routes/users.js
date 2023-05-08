
const router = require('express').Router();
let User = require('../database/user.model');

// Handles HTTP get requests to get users from db.
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Handles HTTP get by id request
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Handles HTTP delete request
router.route('/:id').delete((req, res) =>{
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User Deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Handles HTTP update request
router.route('/update/:id').post((req, res) =>{
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.password = req.body.password;
            user.PIs = req.body.PIs;

            user.save()
                .then(() => res.json('User Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;