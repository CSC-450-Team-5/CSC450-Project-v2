const { get } = require('mongoose');
const Lobby = require('../database/lobby.model');


class LobbyManager {

    async createLobby(gameName, hostName, studySetId, gameMode, gameLength) {
        const quiz = await this.getQuiz(studySetId);

        const lobby = new Lobby({
            lobby_code: this.generateUniqueId(),
            creator_id: hostName,
            host_name: hostName,
            game_name: gameName,
            game_mode: gameMode,
            game_length: gameLength,
            players: [],
            quiz,
            completedQuizzes: []
        });

        console.log("created lobby: " + JSON.stringify(lobby));


        return lobby;
    }
    async addCompletedQuiz(lobbyId, completedQuiz) {
        const lobby = await this.getLobby(lobbyId);

        lobby.completedQuizzes.push(completedQuiz);

        await lobby.save();
    }

    generateUniqueId() {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    async getQuiz(studySetId) {
        try {
            const response = await fetch('http://localhost:5000/studysets/' + studySetId
                , {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Error fetching quiz');
            }
            const data = await response.json();
            console.log("received from getQuiz inside lobby manager: " + JSON.stringify(data));
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async addPlayerToLobby(gameId, playerId, playerName) {
        const lobby = await this.getLobbyFromGameCode(gameId);
        //console.log("adding player to lobby: " + playerId + " " + playerName);

        if (lobby.players.some((player) => player.id === playerId)) {
            throw new Error(`Player with ID ${playerId} already in lobby`);
        }

        lobby.players.push({ id: playerId, name: playerName });
        //console.log("added player to lobby: " + JSON.stringify(lobby.players));

        return lobby;
    }

    async getPlayerList(lobbyId) {
        const lobby = await this.getLobby(lobbyId);

        return lobby.players;
    }

    async getLobby(lobbyId) {
        const lobby = await Lobby.findById(lobbyId);
        if (!lobby) throw new Error('Lobby not found');
        return lobby;
    }

    async getLobbyFromGameCode(gameCode) {
        const lobby = await Lobby.findOne({ lobby_code: gameCode });
        if (!lobby) throw new Error('Lobby not found');
        return lobby;
    }

}

module.exports = LobbyManager;
