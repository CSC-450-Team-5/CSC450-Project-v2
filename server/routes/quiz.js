const express = require('express');
const LobbyManager = require('./LobbyManager');
const io = require('socket.io');


const router = express.Router();
module.exports = (server) => {
    const lobbyManager = new LobbyManager(io(server));

    router.post('/create-lobby', async (req, res) => {
        const { gameName, hostName, studySetId, gameMode, gameLength } = req.body;
        const lobby = await lobbyManager.createLobby(gameName, hostName, studySetId, gameMode, gameLength);
        //console.log("created lobby: " + JSON.stringify(lobby));

        res.json(lobby);
    });

    router.post('/join-lobby', (req, res) => {
        const { playerName, playerId, lobbyId} = req.body;
        console.log("playerName joining: " + playerName);
        console.log("playerId joining:" + playerId);
        const lobby = lobbyManager.addPlayerToLobby(lobbyId, playerId, playerName);
        res.json(lobby);
    });

    router.post('/start-quiz', (req, res) => {
        const { lobbyId, questions } = req.body;
        const lobby = lobbyManager.startQuiz(lobbyId, questions);
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
        res.json(lobby);
    });

    const socketServer = io(server);
    socketServer.on('connection', (socket) => {
        const lobbyId = socket.handshake.query.lobbyId;
        socket.join(lobbyId);
    
        socket.on('disconnect', () => {
        const lobby = lobbyManager.getLobby(lobbyId);
        if (!lobby) {
            return;
        }
    
        const playerIndex = lobby.players.findIndex(
            (player) => player.id === socket.id
        );
        if (playerIndex === -1) {
            return;
        }
    
        const player = lobby.players.splice(playerIndex, 1)[0];
        socketServer.to(lobbyId).emit('player-left', player);
        });
    });


    return router;
};