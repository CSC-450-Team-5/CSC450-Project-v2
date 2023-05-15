import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function JoinGame() {
    const [gameCode, setGameCode] = useState("");
    const [playerName, setPlayerName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/quiz/join-lobby`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ playerName, playerId: localStorage.getItem("userId"), gameId: gameCode }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const gameData = await response.json();
            console.log(JSON.stringify(gameData));
            navigate(`/lobby/${gameData._id}/${localStorage.getItem("userId")}`);
        } catch (error) {
            console.error(error);
            // TODO: Handle error in UI
        }
    };

    return (
        <div className="bg-dark text-white p-3">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12 col-sm-8 col-md-6 mb-3 mx-auto border rounded p-2">
                        <h1 className="mb-2 text-center">Join Game</h1>
                        <label htmlFor="gameCode" className="float-left">
                            Game Code
                        </label>
                        <input
                            type="text"
                            className="form-control mb-1"
                            id="gameCode"
                            placeholder="Enter game code"
                            value={gameCode}
                            onChange={(event) => setGameCode(event.target.value)}
                        />
                        <label htmlFor="playerName" className="float-left">
                            Player Name
                        </label>
                        <input
                            type="text"
                            className="form-control mb-3"
                            id="playerName"
                            placeholder="Enter player name"
                            value={playerName}
                            onChange={(event) => setPlayerName(event.target.value)}
                        />
                        <button type="submit" className="btn btn-primary col-12" onClick={handleSubmit}>
                            Join Game
                        </button>
                    </div>
                </div>
            </form>
            <div className="col-12 col-sm-8 col-md-6 mb-3 mx-auto">
                By clicking Play, you agree to our{" "}
                <a href="#">Terms of Service</a> and <a href="#">Privacy Policy.</a>
            </div>
        </div>
    );
}
