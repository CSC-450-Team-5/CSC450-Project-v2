const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studySetSchema = new Schema({
set_name:{type: String, required: true, unique: true, trim: true, minlength: 3},
user_id:{type: Number, required: true, unique: true, minlength: 1},
questions:{type: Object , required: false} // stores questions as a json object
}, {
    timestamps:true,
});

const StudySet = mongoose.model('StudySet', studySetSchema);

module.exports = StudySet;