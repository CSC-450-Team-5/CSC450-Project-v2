import React, { useState, useEffect } from 'react';

const StudySetCard = (props) => {
    const studySet = props.studySet;
    return (
        <div className="card col-12 col-md-4 p-0">
            <div className="card-header bg-dark">
                {studySet.name}
            </div>
            <div className="card-body bg-secondary">
                <p className="card-text">{studySet.description}</p>
                <a href="javascript:void(0)" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    );
}

function StudySetCards() {
    //get the list of study sets
    const [studySets, setStudySets] = useState([]);
    // useEffect(() => {
    //     fetch('/api/studysets')
    //         .then(response => response.json())
    //         .then(data => setStudySets(data));
    // }, []);

    //create cards based on study sets list
    // const cards = studySets.map((studySet) =>
    //     <StudySetCard key={studySet.id} studySet={studySet} />
    // );

    //add 5 cards for testing
    const cards = [];
    for (let i = 0; i < 5; i++) {
        cards.push(<StudySetCard key={i} studySet={{ name: "Study Set " + i, description: "Description " + i }} />);
    }



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
