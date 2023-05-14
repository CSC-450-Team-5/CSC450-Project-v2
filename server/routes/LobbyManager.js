const { get } = require('mongoose');


class LobbyManager {
    constructor(io) {
        this.io = io;
        this.lobbies = [];
    }

    async createLobby(gameName, hostName, studySetId, gameMode, gameLength) {
        const quiz = await this.getQuiz(studySetId);
        console.log("received from createLobby inside lobby manager: " + JSON.stringify(quiz));
        const lobby = {
          id: this.generateUniqueId(),
          gameName,
          hostName,
          gameMode,
          gameLength,
          players: [],
          quiz: quiz,
          currentQuestionIndex: -1,
          currentQuestionTimeoutId: null,
          playerResponses: {},
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



    addPlayerToLobby(lobbyId, playerId, playerName) {
        const lobby = this.getLobby(lobbyId);

        if (lobby.players.some((player) => player.id === playerId)) {
            throw new Error(`Player with ID ${playerId} already in lobby`);
        }

        const player = { id: playerId, name: playerName };
        lobby.players.push(player);
        this.io.to(lobbyId).emit('player-joined', player);
        return lobby;
    }

    getPlayerList(lobbyId) {
        const lobby = this.getLobby(lobbyId);

        return lobby.players;
    }


    startQuiz(lobbyId) {
        const lobby = this.getLobby(lobbyId);
    
        if (lobby.players.length < 1) {
          throw new Error(`At least 1 player required to start quiz`);
        }
    
        lobby.currentQuestionIndex = -1;
    
        this.io.to(lobbyId).emit('game-started');
        console.log(`'game-started' event emitted for lobby ${lobbyId}`);

        setTimeout(() => {
          this.startNextQuestion(lobbyId);
        }, 5000); // delay the first question by 5 seconds
    
        return lobby;
    }
    
    startNextQuestion(lobbyId) {
        const lobby = this.getLobby(lobbyId);
        const { questions } = lobby.quiz;
        // console.log(lobby.quiz);
        if(questions == null){
            throw new Error(`At least 1 question is required to start a quiz`);
        }
        if (lobby.currentQuestionIndex >= questions.length - 1) {
          // no more questions, game over
          this.endQuiz(lobbyId);
          return;
        }
    
        lobby.currentQuestionIndex++;
    
        const currentQuestion = questions[lobby.currentQuestionIndex];
        lobby.quiz.currentQuestion = currentQuestion;
        lobby.quiz.playerResponses = {};
        const timeLimit = 5;
        this.io.to(lobbyId).emit('question-started', currentQuestion);
    
        lobby.currentQuestionTimeoutId = setTimeout(() => {
          this.showQuestionResults(lobbyId);
        }, timeLimit * 1000); // convert time limit to milliseconds
    }
    
    showQuestionResults(lobbyId) {
        const lobby = this.getLobby(lobbyId);
        const { questions } = lobby.quiz;
        const currentQuestion = questions[lobby.currentQuestionIndex];
    
        this.io.to(lobbyId).emit('question-results', lobby.quiz);
    
        clearTimeout(lobby.currentQuestionTimeoutId);
    
        setTimeout(() => {
          this.startNextQuestion(lobbyId);
        }, 5000); // delay the next question by 5 seconds
    }
    
    endQuiz(lobbyId) {
        const lobby = this.getLobby(lobbyId);
    
        this.io.to(lobbyId).emit('game-over', lobby.quiz);
        // cleanup
        lobby.currentQuestionIndex = -1;
        lobby.currentQuestionTimeoutId = null;
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
