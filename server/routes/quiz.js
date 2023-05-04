const express = require('express');
const LobbyManager = require('./LobbyManager');

const router = express.Router();
const lobbyManager = new LobbyManager();

router.post('/create-lobby', (req, res) => {
    const { gameName, hostName, studySetId, gameMode, gameLength } = req.body;
    console.log("received request to create lobby with set id: " + studySetId);
    const lobby = lobbyManager.createLobby(gameName, hostName, studySetId, gameMode, gameLength);

    res.json(lobby);
});

router.post('/join-lobby', (req, res) => {
    const { lobbyId, playerId, playerName } = req.body;
    const lobby = lobbyManager.addPlayerToLobby(lobbyId, playerId, playerName);
    res.json(lobby);
});

router.post('/start-quiz', (req, res) => {
    const { lobbyId, questions } = req.body;
    const lobby = lobbyManager.startQuiz(lobbyId, questions);
    res.json(lobby);
});

router.get('/get-player-list', (req, res) => {
    const { lobbyId } = req.query;
    const playerList = lobbyManager.getPlayerList(lobbyId);
    res.json(playerList);
});


module.exports = router;
