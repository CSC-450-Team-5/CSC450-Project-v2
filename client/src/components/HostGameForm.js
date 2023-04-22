import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HostGameForm() {

    //get the study set names from the database
    const [studySets, setStudySets] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/studysets/getStudySets')
            .then(response => response.json())
            .then(data => {
                setStudySets(data);
                // console.log(data);
            })
            .catch(err => console.log(err));
    }, []);

    const studySetOptions = [];
    for (let i = 0; i < studySets.length; i++) {
        studySetOptions.push(<option key={i}>{studySets[i].name}</option>);
    }

    return (
        <div className="bg-dark text-white">
            <div className="row">
                <div className="col-12 mb-1">
                    <h1 class="text-center">Host Game</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-8 col-md-6 mb-3 mx-auto border rounded p-2">
                    <form>
                        <div className="form-group">
                            <label htmlFor="gameName">Game Name</label>
                            <input type="text" className="form-control" id="gameName" required placeholder="Enter game name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hostName">Host Name</label>
                            <input type="text" className="form-control" id="hostName" placeholder="Enter host name (optional)" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="studySetName">Study Set</label>
                            <select className="form-control" id="studySetName">
                                {studySetOptions}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gameMode">Game Mode</label>
                            <select className="form-control" id="gameMode">
                                <option>Classic</option>
                                <option>Timed</option>
                                <option>Blitz</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gameLength">Game Length</label>
                            <select className="form-control mb-3" id="gameLength">
                                <option>5</option>
                                <option>10</option>
                                <option>15</option>
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                            </select>
                        </div>
                    </form>
                    <Link to="/hostlobby">
                        <button type="submit" className="btn btn-primary col-12">Create Lobby</button>
                    </Link>
                </div>
            </div>
        </div>
    );


}