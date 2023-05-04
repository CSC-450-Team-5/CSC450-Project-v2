const { get } = require('mongoose');
const { v4: uuidv4 } = require('uuid');


class LobbyManager {
    constructor() {
        this.lobbies = [];
    }

    createLobby(gameName, hostName, studySetId, gameMode, gameLength) {
        const lobby = {
            id: uuidv4(),
            gameName: gameName,
            hostName: hostName,
            gameMode: gameMode,
            gameLength: gameLength,
            players: [],
            quiz: this.getQuiz(studySetId),
        };

        this.lobbies.push(lobby);
        return lobby;
    }

    getQuiz(studySetId) {
        fetch('http://localhost:5000/studysets/' + studySetId)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return data;
            })
            .catch(err => console.log(err)
            )
    }


    addPlayerToLobby(lobbyId, playerId, playerName) {
        const lobby = this.lobbies.find((lobby) => lobby.id === lobbyId);
        if (!lobby) {
            throw new Error(`Lobby with ID ${lobbyId} not found`);
        }

        if (lobby.players.some((player) => player.id === playerId)) {
            throw new Error(`Player with ID ${playerId} already in lobby`);
        }

        lobby.players.push({ id: playerId, name: playerName });
        return lobby;
    }

    getPlayerList(lobbyId) {
        const lobby = this.lobbies.find((lobby) => lobby.id === lobbyId);
        if (!lobby) {
            throw new Error(`Lobby with ID ${lobbyId} not found`);
        }

        return lobby.players;
    }


    startQuiz(lobbyId, questions) {
        const lobby = this.lobbies.find((lobby) => lobby.id === lobbyId);
        if (!lobby) {
            throw new Error(`Lobby with ID ${lobbyId} not found`);
        }

        if (lobby.players.length < 2) {
            throw new Error(`At least 2 players required to start quiz`);
        }

        lobby.quiz = {
            questions,
            currentQuestion: 0,
            playerResponses: {},
        };

        return lobby;
    }
}

module.exports = LobbyManager;
