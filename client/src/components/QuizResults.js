import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function QuizResults() {
    // const [lobby, setLobby] = useState(null);
    // const [answers, setAnswers] = useState([]);
    // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // const { lobbyId } = useParams();
    // const [quizSubmitted, setQuizSubmitted] = useState(false);
    // const timeLimit = 10;
    // const [timeRemaining, setTimeRemaining] = useState(timeLimit);
    // const navigate = useNavigate();
  
    // useEffect(() => {
    //   fetch(`http://localhost:5000/quiz/get-lobby/${lobbyId}`)
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log(data);
    //       setLobby(data);
    //       setTimeRemaining(timeLimit); // reset timer when new question is loaded
    //     })
    //     .catch(error => console.log(error));
    // }, [lobbyId]);
  
    // if (!lobby) {
    //   return (
    //     <div className="text-white">
    //       <p>Loading...</p>
    //     </div>
    //   );
    // } else {
    //     const currentQuestion = lobby.quiz.questions[currentQuestionIndex];
    //     return (
    //         <>
    //             <div className="text-white container">
    //                 <h1>{lobby.gameName}</h1>
    //                 {lobby.quiz.questions.map((question, index) => (
    //                     <div key={index}>
    //                         <h3>Question {index + 1}</h3>
    //                         <p>{question.questionTitle}</p>
    //                         <div className="row">
    //                             <button className="btn btn-primary col-6"></button>
    //                             <button className="btn btn-warning col-6"></button>
    //                         </div>
    //                         <div className="row">
    //                             <button className="btn btn-success col-6"></button>
    //                             <button className="btn btn-danger col-6"></button>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         </>
    //     );
    // }
};