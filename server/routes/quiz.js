const express = require('express');
const LobbyManager = require('./LobbyManager');
const CompletedQuiz = require('../database/completedQuiz.model');


const router = express.Router();
const lobbyManager = new LobbyManager();

router.post('/create-lobby', async (req, res) => {
    const { gameName, hostName, studySetId, gameMode, gameLength } = req.body;
    const lobby = await lobbyManager.createLobby(gameName, hostName, studySetId, gameMode, gameLength);
    //console.log("created lobby: " + JSON.stringify(lobby));


    await lobby.save()
        .then(() => res.json(lobby))
        .catch(err => res.status(500).json({ error: err }));

});

router.post('/join-lobby', async (req, res) => {
    const { playerName, playerId, gameId } = req.body;
    const lobby = await lobbyManager.addPlayerToLobby(gameId, playerId, playerName);
    await lobby.save()
        .then(() => res.json(lobby))
        .catch(err => res.status(500).json({ error: err }));
});

router.post('/get-player-list', async (req, res) => {
    const lobbyId = req.body.lobbyId;
    const playerList = await lobbyManager.getPlayerList(lobbyId);
    res.json(playerList);
    // console.log(res.json(playerList));
});

router.get('/get-lobby/:lobbyId', async (req, res) => {
    const lobbyId = req.params.lobbyId;
    try {
        const lobby = await lobbyManager.getLobby(lobbyId);
        res.json(lobby);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/submit-quiz', async (req, res) => {
    const { lobbyId, playerId, answers } = req.body;
    //console.log("answers: " + JSON.stringify(answers));
    const completedQuiz = new CompletedQuiz({ lobbyId, playerId, answers });

    try {
        const savedQuiz = await completedQuiz.save();

        await lobbyManager.addCompletedQuiz(lobbyId, savedQuiz);

        res.json({ resultsId: savedQuiz._id });
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ message: err.message });
    }
});

router.get('/get-results/:resultId', async (req, res) => {
    const { resultId } = req.params;
    try {
        const quizResults = await CompletedQuiz.findById(resultId);
        if (!quizResults) {
            res.status(404).json({ message: 'Quiz results not found.' });
        } else {
            res.json(quizResults);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;
