import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000');

const HostLobby = () => {
    const [players, setPlayers] = useState([]);
    const { lobbyId, playerId } = useParams();
    const navigate = useNavigate();
    const [lobby, setLobby] = useState(null);

    useEffect(() => {
        //startPolling();
        fetch(`/get-lobby/${lobbyId}`)
            .then(response => response)
            .then(data => setLobby(data))
            .catch(error => console.log(error));
        fetchPlayerList();
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

    function handleStartGame() {
        // socket.emit('startGame');

        //check if we are host
        let playerId = "host";

        navigate(`/game/${lobbyId}/${playerId}`);
    }

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
                <div className="row">
                    <div className="col-12">
                        <button
                            type="submit"
                            className="btn btn-primary col-12"
                            onClick={handleStartGame}
                        >
                            Start Game
                        </button>
                        <button className='btn btn-primary col-12 mt-3' onClick={fetchPlayerList}>Refresh</button>
                    </div>
                </div>
            </div>
        </>
    );
};

const PlayerLobby = () => {
    const [lobby, setLobby] = useState(null);
    const { lobbyId, playerId } = useParams();
    const [quizStarted, setQuizStarted] = useState(false);

    useEffect(() => {
        //startPolling();
        fetch(`/get-lobby/${lobbyId}`)
            .then(response => response)
            .then(data => setLobby(data))
            .catch(error => console.log(error));

        // Listen for gameStarted event from the server
        // socket.on('gameStarted', () => {
        //     setQuizStarted(true);
        // });

        // // Clean up the event listener when component unmounts
        // return () => {
        //     socket.off('gameStarted');
        // };
    }, [lobbyId]);

    return (
        <>
            {!quizStarted && (
                <div className="player-lobby-container bg-dark text-white p-3 px-5 container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h1>Player Lobby</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h2>Lobby ID: {lobbyId}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h2>Waiting In Lobby...</h2>
                        </div>
                    </div>
                </div>
            )}
            {quizStarted && (
                <div>
                    <h1>Quiz Started!</h1>
                </div>
            )}
        </>
    );
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
