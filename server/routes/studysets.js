const express = require('express');
const StudySet = require('../database/studyset.model');

const router = express.Router();

// Handles HTTP get requests to get studysets from db.
router.route('/getStudySets').get((req, res) => {
    StudySet.find()
        .then(studySets => res.json(studySets))
        .catch(err => res.status(500).json({ error: err }));
});

// Handles HTTP post requests to add studysets to db.
router.post('/addstudyset', async (req, res) => {
    // List out each of our db fields and define what values they should hold.
    const { setTitle, description, creator_id, questions } = req.body;

    const newStudySet = new StudySet({
        name: setTitle,
        description,
        creator_id,
        questions
    });

    newStudySet.save()
        .then(() => res.json('Study Set Added to db!'))
        .catch(err => res.status(500).json({ error: err }));
});

// Handles HTTP get by id request
router.route('/:id').get((req, res) => {
    StudySet.findById(req.params.id)
        .then(studySet => res.json(studySet))
        .catch(err => res.status(500).json({ error: err }));
});

// Handles HTTP delete request
router.route('/:id').delete((req, res) => {
    StudySet.findByIdAndDelete(req.params.id)
        .then(() => res.json('Study Set Deleted.'))
        .catch(err => res.status(500).json({ error: err }));
});

// Handles HTTP update request
router.route('/update/:id').post((req, res) => {
    StudySet.findById(req.params.id)
        .then(studySet => {
            studySet.name = req.body.set_name;
            studySet.description = req.body.description;
            studySet.creator_id = req.body.user_id;
            studySet.questions = req.body.questions;

            studySet.save()
                .then(() => res.json('Study Set Updated!'))
                .catch(err => res.status(500).json({ error: err }));
        })
        .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
