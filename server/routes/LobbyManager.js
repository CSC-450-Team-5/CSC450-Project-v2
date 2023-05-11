const { get } = require('mongoose');


class LobbyManager {
    constructor() {
        this.lobbies = [];
    }

    async createLobby(gameName, hostName, studySetId, gameMode, gameLength) {
        let quiz = await this.getQuiz(studySetId);
        console.log("received from createLobby inside lobby manager: " + JSON.stringify(quiz));
        const lobby = {
            id: this.generateUniqueId(),
            gameName,
            hostName,
            gameMode,
            gameLength,
            players: [],
            quiz,
        };

        this.lobbies.push(lobby);

        return lobby;
    }

    generateUniqueId() {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
      }

    getQuiz(studySetId) {
        return fetch('http://localhost:5000/studysets/' + studySetId)
            .then(response => response.json())
            .then(data => {
                //console.log("received from getQuiz inside lobby manager: " + JSON.stringify(data));
                return data;
            })
            .catch(err => console.log(err));
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

    getLobby(lobbyId) {
        const lobby = this.lobbies.find((lobby) => lobby.id === lobbyId);
        if (!lobby) {
            throw new Error(`Lobby with ID ${lobbyId} not found`);
        }

        return lobby;
    }
}

module.exports = LobbyManager;
