import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function QuizResults() {
    const { resultId } = useParams();
    const [quizResults, setQuizResults] = useState(null);
    const [lobby, setLobby] = useState(null);
    const [players, setPlayers] = useState(null);
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
                fetch(`http://localhost:5000/quiz/get-lobby/${data.lobbyId}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    })
                    .then(data => {
                        setLobby(data);
                        setPlayers(data.players);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error(error);
            });
        
    }, [resultId]);

    if (!quizResults || !lobby) {
        return (
            <div className="text-center">
                <p>Loading...</p>
            </div>
        );
    } else {
        
        console.log("quizResults", quizResults);
        console.log("lobby", lobby);
        console.log("quiz", lobby.quiz);
        console.log("players", players)
        console.log(quizResults.answers.find(answer => answer.questionIndex === 0).answer);
        return (
            <div className="container mt-5">
                <h1 className="text-center mb-4">Quiz Results</h1>
                <div className="card mb-3">
                    <div className="card-header">
                        <h2>{quizResults.playerName}</h2>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{lobby.quiz.name}<p className='text-right'>Score: {quizResults.score}</p></h5>
                        {lobby.quiz.questions.map((question, qIndex) => (
                            <div key={qIndex}>
                                <h6>Question: {question.question}</h6>
                                <p>Your Answer: {quizResults.answers.find(answer => answer.questionIndex === qIndex)?.answer ?? "Unanswered"}</p>
                                <p>Correct Answer: {question.correctAnswer}</p>
                                <p>Learning Objective(s): {question.PIList}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/')}>Go Home</button>
            </div>
        );
    }
}
