const mongoose = require('mongoose');
const { Schema } = mongoose;

const CompletedQuizSchema = new Schema({
    lobbyId: String,
    playerId: String,
    answers: [{
        userId: String,
        questionIndex: Number,
        answerIndex: Number,
        answer: String,
        timeRemaining: Number
    }]
});

const CompletedQuiz = mongoose.model('CompletedQuiz', CompletedQuizSchema);
module.exports = CompletedQuiz;
