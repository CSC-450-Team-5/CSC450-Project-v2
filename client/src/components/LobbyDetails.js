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
    const { lobbyId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/quiz/get-lobby/${lobbyId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setLobby(data);
            })
            .catch(error => console.log(error));
    }, [lobbyId]);

    function handleNextQuestion() {
    }

    function handleSelectAnswer(questionIndex, answerIndex) {
        //check if question has already been answered
        //if not, add answer to answers array
        //if yes, replace answer in answers array
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
                <div className="text-white container">
                    <h1>{lobby.gameName}</h1>
                    {lobby.quiz.questions.map((question, index) => (
                        <div key={index}>
                            <h3>Question {index + 1}</h3>
                            <p>{question.questionTitle}</p>
                            <div className="row">
                                <button className="btn btn-primary col-6" onClick={handleSelectAnswer(index, 0)}>{question.answers[0]}</button>
                                <button className="btn btn-warning col-6" onClick={handleSelectAnswer(index, 1)}>{question.answers[1]}</button>
                            </div>
                            <div className="row">
                                <button className="btn btn-success col-6" onClick={handleSelectAnswer(index, 2)}>{question.answers[2]}</button>
                                <button className="btn btn-danger col-6" onClick={handleSelectAnswer(index, 3)}>{question.answers[3]}</button>
                            </div>
                            <button className="btn btn-secondary mt-2 col-12" onClick={handleNextQuestion}>Next Question</button>
                        </div>
                    ))}
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
