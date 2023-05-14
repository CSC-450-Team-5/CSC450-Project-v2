const express = require('express');
const LobbyManager = require('./LobbyManager');

const router = express.Router();
const lobbyManager = new LobbyManager();

router.post('/create-lobby', async (req, res) => {
    const { gameName, hostName, studySetId, gameMode, gameLength } = req.body;
    const lobby = await lobbyManager.createLobby(gameName, hostName, studySetId, gameMode, gameLength);
    //console.log("created lobby: " + JSON.stringify(lobby));

    res.json(lobby);
});

router.post('/join-lobby', (req, res) => {
    const { playerName, playerId, lobbyId } = req.body;
    // console.log("playerName joining: " + playerName);
    // console.log("playerId joining:" + playerId);
    const lobby = lobbyManager.addPlayerToLobby(lobbyId, playerId, playerName);
    res.json(lobby);
});

router.post('/get-player-list', (req, res) => {
    const { lobbyId } = req.body;
    const playerList = lobbyManager.getPlayerList(lobbyId);
    res.json(playerList);
});

router.get('/get-lobby/:lobbyId', (req, res) => {
    const { lobbyId } = req.params;
    const lobby = lobbyManager.getLobby(lobbyId);
    console.log("lobby: " + JSON.stringify(lobby));
    res.json(lobby);
});



module.exports = router;
