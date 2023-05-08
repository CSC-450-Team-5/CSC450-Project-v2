import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function HostLobby() {
    const [players, setPlayers] = useState([]);
    const { lobbyId } = useParams();
    const navigate = useNavigate();
    const [lobby, setLobby] = useState(null);

    useEffect(() => {
        // startPolling();
        fetch(`/get-lobby/${lobbyId}`)
            .then(response => response.json())
            .then(data => setLobby(data))
            .catch(error => console.log(error));
    }, [lobbyId]);

    async function fetchPlayerList() {
        await fetch(`/api/lobbies/${lobbyId}/players`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lobbyId }),
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        }).then((data) => {
            setPlayers(data);
        }).catch((error) => {
            console.error(error);
        });
    }

    async function startPolling() {
        this.pollingInterval = setInterval(() => {
            this.fetchPlayerList();
        }, 1000);
    }

    async function stopPolling() {
        clearInterval(this.pollingInterval);
    }

    function handleStartGame() {
        navigate(`game/${lobbyId}/host`);
    }

    return (
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
                    <h2>Players: {players.join(', ')}</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <button
                        type="submit"
                        className="btn btn-primary col-12"
                        onlick={handleStartGame}
                    >
                        Start Game
                    </button>
                </div>
            </div>
        </div>
    );
}
