import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function HostLobby() {
    const [players, setPlayers] = useState([]);
    const { lobbyId } = useParams();
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
        //check if we are host
        let playerId = "host";

        navigate(`game/${playerId}`);
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
}
