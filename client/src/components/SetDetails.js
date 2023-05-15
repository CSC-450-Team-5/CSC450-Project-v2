import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const QuestionsCard = ({ questions, handleAnswerClick }) => {
    return (
        <div className="row">
            {questions &&
                questions.map((question, index) => (
                    <div key={index} className="col-12">
                        <div className="card m-2">
                            <div className="card-header">{question.questionTitle}</div>
                            <div className="card-body">
                                <p>{question.question}</p>
                                <ul className="list-group">
                                    {question.answers.map((answer, i) => (
                                        <li key={i} className="list-group-item">
                                            <span className={answer === question.correctAnswer ? 'correct-answer' : ''} onClick={() => handleAnswerClick(answer)}>
                                                {answer}
                                            </span>
                                            {answer === question.correctAnswer && <div style={{ display: 'inline-block', float: 'right', color: 'green' }}>correct</div>}
                                        </li>
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
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/studysets/${setID}`)
            .then(response => response.json())
            .then(data => {
                setStudySet(data);
            })
            .catch(err => console.log(err));
    }, [setID]);

    const handleAnswerClick = (selectedAnswer, correctAnswer) => {
        setSelectedAnswer(selectedAnswer);
        if (selectedAnswer === correctAnswer) {
            console.log("Correct!");
        } else {
            console.log("Incorrect!");
        }
    };

    const cards = <QuestionsCard questions={studySet.questions} handleAnswerClick={handleAnswerClick} />;

    return (
        <div>
            <h1 className="text-white">Set Details for: {studySet.name}</h1>
            <h1>{studySet.description}</h1>
            <div className="row">
                {cards}
            </div>
        </div>
    );
}

export default SetDetails;
