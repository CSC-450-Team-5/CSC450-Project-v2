import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function QuizResults() {
    const { resultId } = useParams();
    const [quizResults, setQuizResults] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/quiz/get-results/${resultId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setQuizResults(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [resultId]);

    if (!quizResults) {
        return (
            <div className="text-center">
                <p>Loading...</p>
            </div>
        );
    } else {
        return (
            <div className="container mt-5">
                <h1 className="text-center mb-4">Quiz Results</h1>
                {quizResults.map((result, index) => (
                    <div className="card mb-3" key={index}>
                        <div className="card-header">
                            <h2>{result.playerName}</h2>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Score: {result.score}</h5>
                            {result.questions.map((question, qIndex) => (
                                <div key={qIndex}>
                                    <h6>Question: {question.text}</h6>
                                    <p>Your Answer: {question.playerAnswer}</p>
                                    <p>Correct Answer: {question.correctAnswer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button className="btn btn-primary" onClick={() => navigate('/')}>Go Home</button>
            </div>
        );
    }
}
