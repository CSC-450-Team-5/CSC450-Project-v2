const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const lobbySchema = new Schema({
    lobby_code: { type: String, required: true, unique: false, trim: true, minlength: 3 },
    creator_id: { type: String, required: true, unique: false, minlength: 1 },
    host_name: { type: String, required: true, unique: false, trim: true },
    game_name: { type: String, required: true, unique: false, trim: true },
    game_mode: { type: String, required: true, unique: false, trim: true },
    game_length: { type: Number, required: true, unique: false, trim: true },
    players: [{ type: Object, required: true }],
    quiz: { type: Object, required: true }, // stores questions as a json object
    completedQuizzes: [{ type: Schema.Types.ObjectId, ref: 'CompletedQuiz' }]
}, {
    timestamps: true,
});


const Lobby = mongoose.model('Lobby', lobbySchema);

module.exports = Lobby;