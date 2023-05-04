const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const studySetSchema = new Schema({
    setId: { type: Number, required: true, unique: true, trim: true, minlength: 1 },
    name: { type: String, required: true, unique: false, trim: true, minlength: 3 },
    description: { type: String, required: false, unique: false, trim: true },
    creator_id: { type: Number, required: true, unique: false, minlength: 1 },
    questions: { type: Object, required: false } // stores questions as a json object
}, {
    timestamps: true,
});


const StudySet = mongoose.model('StudySet', studySetSchema);

module.exports = StudySet;