import React from 'react';


export default function HostLobby() {

    const gameCode = Math.floor(Math.random() * 10000);

    return (
        <div className="host-lobby-container bg-dark text-white p-3 px-5 container-fluid">
            <div className="row">
                <div className="col-12">
                    <h1>Host Lobby</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h2>Game Code: {gameCode}</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h2>Players: </h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <button type="submit" className="btn btn-primary col-12">Start Game</button>
                </div>
            </div>
        </div>
    );
}