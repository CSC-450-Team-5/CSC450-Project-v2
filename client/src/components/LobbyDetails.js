import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const HostLobby = () => {
    const [players, setPlayers] = useState([]);
    const { lobbyId } = useParams();
    const navigate = useNavigate();
    const [lobby, setLobby] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/quiz/get-lobby/${lobbyId}`)
            .then(response => response.json())
            .then(data => {
                setLobby(data);
                console.log(data);
            })
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
        }).then(data => {
            console.log('Got playerlist: ' + data);
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
                            <h2>Lobby ID: {lobby.lobby_code}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h2>Players:</h2>
                            <ul>
                                {players?.map((player) => (
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
    const { lobbyId, playerId } = useParams();
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const timeLimit = 20;
    const [timeRemaining, setTimeRemaining] = useState(timeLimit);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/quiz/get-lobby/${lobbyId}`)
            .then((response) => response.json())
            .then((data) => {
                setLobby(data);
            })
            .catch((error) => console.log(error));
    }, [lobbyId]);

    useEffect(() => {
        let intervalId;
        setTimeRemaining(timeLimit);
        intervalId = setInterval(() => {
          setTimeRemaining((timeRemaining) => timeRemaining - 1);
        }, 1000);
        return () => clearInterval(intervalId);
      }, [currentQuestionIndex, lobby, timeLimit]);
      
      useEffect(() => {
        if (timeRemaining <= 0 && !quizSubmitted) {
          handleSelectAnswer(currentQuestionIndex, -1);
        }
      }, [currentQuestionIndex, lobby, quizSubmitted, timeRemaining]);

    function handleSelectAnswer(questionIndex, answerIndex) {

        console.log("handleSelectAnswer called", { questionIndex, answerIndex });
        const answerObj = {
            userId: localStorage.getItem("userId"),
            questionIndex: questionIndex,
            answerIndex: answerIndex,
            answer: answerIndex === -1 ? null : lobby.quiz.questions[questionIndex].answers[answerIndex],
            timeRemaining: timeRemaining,
        };
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers, answerObj];

            if (currentQuestionIndex < lobby?.quiz?.questions?.length - 1) {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                setTimeRemaining(timeLimit); // reset timer when new question is loaded
            } else {  // that was last question
                setQuizSubmitted(true);
                //console.log(newAnswers);
                fetch(`http://localhost:5000/quiz/submit-quiz`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ lobbyId, playerId, answers: newAnswers }),
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).then((data) => {
                    console.log('quiz results id: ' + data.resultsId);
                    navigate(`/results/${data.resultsId}`);
                }
                ).catch((error) => {
                    console.error(error);
                });
            }
            return newAnswers;
        });
    }

    if (!lobby) {
        return (
            <div className="text-white">
                <p>Loading...</p>
            </div>
        );
    } else {
        var currentQuestion = lobby.quiz.questions[currentQuestionIndex];
        return (
            <>
                <div className="text-white container">
                    <h1>{lobby.gameName}</h1>
                    <div key={currentQuestionIndex}>
                        <h3>Question {currentQuestionIndex + 1} <div className='float-right'>Seconds remaining: {timeRemaining}</div></h3>
                        <p>{currentQuestion.question}</p>
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
    const { playerId } = useParams();

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
