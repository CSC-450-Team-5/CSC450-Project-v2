const router = require('express').Router();
let StudySet = require('../database/studyset.model');

// Handles HTTP get requests to get studysets from db.
router.route('/').get((req, res) => {
    StudySet.find()
        .then(studySet => res.json(studySet))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Handles HTTP post requests to add studysets to db.
router.route('/add').post((req, res) => {
    // List out each of our db fields and define what values they should hold.
    const set_name = req.body.set_name;
    const user_id = Number(req.body.user_id);
    const questions = Object(req.body.questions);

    const newStudySet = new StudySet({
        set_name,
        user_id,
        questions
    });

    newStudySet.save()
        .then(() => res.json('Study Set Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Handles HTTP get by id request
router.route('/:id').get((req, res) => {
    StudySet.findById(req.params.id)
        .then(studySet => res.json(studySet))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Handles HTTP delete request
router.route('/:id').delete((req, res) =>{
    StudySet.findByIdAndDelete(req.params.id)
        .then(() => res.json('Study Set Deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Handles HTTP update request
router.route('/update/:id').post((req, res) =>{
    StudySet.findById(req.params.id)
        .then(studySet => {
            studySet.set_name = req.body.set_name;
            studySet.user_id = req.body.user_id;
            studySet.questions = req.body.questions

            studySet.save()
                .then(() => res.json('Study Set Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;