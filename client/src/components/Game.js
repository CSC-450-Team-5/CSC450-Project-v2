import React, { useEffect } from "react";
import { useParams } from "react-router-dom";


export default function Game() {
    //take in lobby id and player id from url
    const { lobbyId, playerId } = useParams();
    //fetch lobby details from server
    var lobby;
    useEffect(() => {
        console.log("lobby id: " + lobbyId + " player id: " + playerId);
        lobby = fetch(`/get-lobby/${lobbyId}`);
    }, []);


    if (playerId === "host") {
        console.log("host view");
        return (
            <>
                <div className="text-white">
                    <h1>Host View</h1>
                    <h2>Lobby ID: {lobbyId}</h2>
                </div>
            </>

        )
    }
    else {
        return (
            <>
                <div className="text-white">
                    <h1>Player View</h1>
                </div>
            </>
        )
    }
}