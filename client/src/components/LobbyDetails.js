import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const HostLobby = () => {
    const [players, setPlayers] = useState([]);
    const { lobbyId } = useParams();
    const navigate = useNavigate();
    const [lobby, setLobby] = useState(null);

    useEffect(() => {
        fetch(`/get-lobby/${lobbyId}`)
            .then(response => response)
            .then(data => setLobby(data))
            .catch(error => console.log(error));
        // Use setInterval to call the fetchPlayerList function every second
        const interval = setInterval(() => {
            fetchPlayerList();
        }, 1000);

        // Clean up the interval when component unmounts
        return () => clearInterval(interval);
    }, [lobbyId]);

    async function fetchPlayerList() {
        await fetch(`http://localhost:5000/quiz/get-player-list`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lobbyId }),
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        }).then((data) => {
            console.log(data);
            setPlayers(data);
        }).catch((error) => {
            console.error(error);
        });
    }

    if (!lobby) {
        return (
            <div className="text-white">
                <p>Loading...</p>
            </div>
        );
    } else {
        return (
            <>
                <div className="host-lobby-container bg-dark text-white p-3 px-5 container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h1>Host Lobby</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h2>Lobby ID: {lobbyId}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h2>Players:</h2>
                            <ul>
                                {players.map((player) => (
                                    <li key={player.id}>{player.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

const PlayerLobby = () => {
    const [lobby, setLobby] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const { lobbyId } = useParams();
    const timeLimit = 5;
    const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  
    useEffect(() => {
      fetch(`http://localhost:5000/quiz/get-lobby/${lobbyId}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setLobby(data);
          setTimeRemaining(timeLimit); // reset timer when new question is loaded
        })
        .catch(error => console.log(error));
    }, [lobbyId]);
  
    useEffect(() => {
        // Start the timer when the component mounts or when the current question changes
        let intervalId;
        if (currentQuestionIndex < lobby?.quiz?.questions?.length) {
            setTimeRemaining(timeLimit);
            intervalId = setInterval(() => {
                setTimeRemaining(timeRemaining => timeRemaining - 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [currentQuestionIndex, lobby]);
  
    useEffect(() => {
        // Move to the next question when the timer reaches 0
        if (timeRemaining === 0 && currentQuestionIndex < lobby?.quiz?.questions?.length - 1) {
            handleSelectAnswer();
        } else if (timeRemaining === 0 && currentQuestionIndex === lobby?.quiz?.questions?.length - 1) {
            submitQuiz();
        }
    }, [timeRemaining, currentQuestionIndex, lobby]);
  
    function handleSelectAnswer(questionIndex, answerIndex) {
      // check if question has already been answered
      // if not, add answer to answers array
      // if yes, replace answer in answers array
      // handle not answered (null) question from time running out
      if (currentQuestionIndex < lobby?.quiz?.questions?.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeRemaining(timeLimit); // reset timer when new question is loaded
      } else {
        submitQuiz();
      }
    }
  
    function submitQuiz() {
      console.log('submit quiz');
    }
  
    if (!lobby) {
      return (
        <div className="text-white">
          <p>Loading...</p>
        </div>
      );
    } else {
        const currentQuestion = lobby.quiz.questions[currentQuestionIndex];
        return (
            <>
                <div className="text-white container">
                    <h1>{lobby.gameName}</h1>
                    <div key={currentQuestionIndex}>
                        <h3>Question {currentQuestionIndex + 1} <div className='float-right'>{timeRemaining}</div></h3>
                        <p>{currentQuestion.questionTitle}</p>
                        <div className="row">
                            <button className="btn btn-primary col-6" onClick={() => handleSelectAnswer(currentQuestionIndex, 0)}>{currentQuestion.answers[0]}</button>
                            <button className="btn btn-warning col-6" onClick={() => handleSelectAnswer(currentQuestionIndex, 1)}>{currentQuestion.answers[1]}</button>
                        </div>
                        <div className="row">
                            <button className="btn btn-success col-6" onClick={() => handleSelectAnswer(currentQuestionIndex, 2)}>{currentQuestion.answers[2]}</button>
                            <button className="btn btn-danger col-6" onClick={() => handleSelectAnswer(currentQuestionIndex, 3)}>{currentQuestion.answers[3]}</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};


export default function LobbyDetails() {
    const { lobbyId, playerId } = useParams();

    if (playerId === "host") {
        return (
            <HostLobby />
        );
    } else {
        return (
            <PlayerLobby />
        );
    }

}
