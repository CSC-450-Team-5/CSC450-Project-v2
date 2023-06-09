import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudySetCard = (props) => {
    const studySet = props.studySet;
    const navigate = useNavigate();
    const onStudySetClick = (event, studySetId) => {
        event.preventDefault();
        navigate(`/SetDetails/${studySetId}`);
    };
    return (
        <div className="card col-12 col-md-4 p-1 m-1 bg-dark border bg-secondary">
            
            <div className="card-header bg-dark">
                {studySet.name}
            </div>
            <div className="card-body bg-secondary">
                <p className="card-text">{studySet.description}</p>
                <button className="btn btn-primary" onClick={(event) => onStudySetClick(event, studySet._id)}>Open Study Set</button>

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
                <div className="col-12" >
                    <h1>Study Sets</h1>
                </div>
            </div>
            <div className='container-fluid'>
                <div className="row" >
                    {cards} 
                </div>
            </div>
        </div>
    );
}

export default StudySetCards;
