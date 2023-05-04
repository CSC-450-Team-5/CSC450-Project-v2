import React, { useState, useEffect } from 'react';

export default function HostLobbyForm() {
    const [gameName, setGameName] = useState('');
    const [hostName, setHostName] = useState('');
    const [studySetId, setStudySetId] = useState('');
    const [studySetName, setStudySetName] = useState('');
    const [gameMode, setGameMode] = useState('Classic');
    const [gameLength, setGameLength] = useState('5');
    const [studySets, setStudySets] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/studysets/getStudySets')
            .then(response => response.json())
            .then(data => setStudySets(data))
            .catch(err => console.log(err));
    }, []);

    const studySetOptions = studySets.map((currentStudySet, index) => (
        <option key={index} value={currentStudySet.setId}>
            {currentStudySet.name}
        </option>
    ));

    const selectStudySet = id => {
        console.log('selected study set id: ' + id);
        setStudySetId(id);
        setStudySetName(studySets.find(set => set.setId === id).name);
    }


    const handleSubmit = event => {
        event.preventDefault();
        console.log('submitting form with studyset: ' + studySetId);

        //how the object being received on the server:
        //gameName, hostName, studySetId, gameMode, gameLength
        const requestBody = {
            gameName,
            hostName,
            studySetId,
            gameMode,
            gameLength: Number(gameLength),
        };
        console.log(JSON.stringify(requestBody));

        fetch('http://localhost:5000/quiz/create-lobby', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    };

    return (
        <div className="bg-dark text-white">
            <div className="row">
                <div className="col-12 mb-1">
                    <h1 className="text-center">Host Game</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-8 col-md-6 mb-3 mx-auto border rounded p-2">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="gameName">Game Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="gameName"
                                required
                                placeholder="Enter game name"
                                value={gameName}
                                onChange={event => setGameName(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hostName">Host Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="hostName"
                                placeholder="Enter host name (optional)"
                                value={hostName}
                                onChange={event => setHostName(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="studySetName">Study Set</label>
                            <select
                                className="form-control"
                                id="studySetName"
                                value={studySetName}
                                onChange={event => selectStudySet(event.target.value)}
                            >
                                {studySetOptions}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gameMode">Game Mode</label>
                            <select
                                className="form-control"
                                id="gameMode"
                                value={gameMode}
                                onChange={event => setGameMode(event.target.value)}
                            >
                                <option>Classic</option>
                                <option>Timed</option>
                                <option>Blitz</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gameLength">Game Length</label>
                            <select
                                className="form-control mb-3"
                                id="gameLength"
                                value={gameLength}
                                onChange={(e) => setGameLength(e.target.value)}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="35">35</option>
                                <option value="40">40</option>
                                <option value="45">45</option>
                                <option value="50">50</option>
                                <option value="55">55</option>
                                <option value="60">60</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-primary col-12"
                                onClick={handleSubmit}
                            >
                                Create Lobby
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
