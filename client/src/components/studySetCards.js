import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudySetCard = (props) => {
    const studySet = props.studySet;
    return (
        <div className="card col-12 col-md-4 p-0">
            <div className="card-header bg-dark">
                {studySet.name}
            </div>
            <div className="card-body bg-secondary">
                <p className="card-text">{studySet.description}</p>
                <button variant="primary">  <Link to={'/SetDetails/' + studySet._id}>Open Study Set</Link> </button>

            </div>
        </div>
    );
}

function StudySetCards() {
    //get the list of study sets
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

    const cards = [];
    for (let i = 0; i < studySets.length; i++) {
        cards.push(<StudySetCard key={i} studySet={studySets[i]} />);
    }

    // //add 5 cards for testing
    // if (cards.length === 0) {
    //     for (let i = 0; i < 5; i++) {
    //         cards.push(<StudySetCard key={i} studySet={{ name: "Study Set " + i, description: "Description " + i }} />);
    //     }
    // }

    return (
        <div className="study-set-container bg-dark text-white p-3 px-5 container-fluid">
            <div className="row">
                <div className="col-12">
                    <h1>Study Sets</h1>
                </div>
            </div>
            <div className="row">
                {cards}
            </div>
        </div>
    );
}

export default StudySetCards;
