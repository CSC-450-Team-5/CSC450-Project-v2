import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const QuestionsCard = ({ questions }) => {
    return (
        <div className="row">
            {questions && questions.map((question, index) => (
                <div key={index} className="col-12">
                    <div className="card">
                        <div className="card-header">{question.questionTitle}</div>
                        <div className="card-body">
                            <ul className="list-group">
                                {question.answers.map((answer, i) => (
                                    <li key={i} className="list-group-item">{answer}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

function SetDetails() {

    const { setID } = useParams();
    const [studySet, setStudySet] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/studysets/${setID}`)
            .then(response => response.json())
            .then(data => {
                setStudySet(data);
            })
            .catch(err => console.log(err));
    }, [setID]);

    const cards = <QuestionsCard questions={studySet.questions} />;
    console.log(studySet.questions);

    return (
        <div>
            <h1>Set Details for {studySet.name}</h1>
            <h1>{studySet.description}</h1>
            <div className="row">
                {cards}
            </div>
        </div>
    );
}

export default SetDetails;