import React, { useEffect } from "react";
import { useParams } from "react-router-dom";


export default function Game() {
    //take in lobby id and player id from url
    const { lobbyId, playerId } = useParams();
    //fetch lobby details from server
    var lobby;
    useEffect(() => {
        lobby = fetch(`/get-lobby/${lobbyId}`);
    }, [lobbyId]);


    if (playerId == "host") {
        return (
            <div>
                <h1>Host View</h1>
                <h2>Lobby ID: {lobby.id}</h2>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Player View</h1>
            </div>
        )
    }
}