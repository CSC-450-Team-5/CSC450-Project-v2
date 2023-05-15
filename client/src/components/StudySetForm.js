import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

const QuestionForm = (props) => {
    function handleQuestionChange(event) {
        //do nothing
    }

    return <>
        <div className="border rounded p-2">
            {/* Question title row */}
            <div className="row">
                <div className="col-6 mb-2">
                    <label htmlFor={'QuestionTitle' + props.qid} className="float-start">Question Title</label>
                    <input type="text" onChange={handleQuestionChange} className="form-control" id={'QuestionTitle' + props.qid} placeholder="Enter Question title" value={"Question " + (props.qid + 1)} />
                </div>
            </div>
            {/* Question row */}
            <div className="row">
                <div className="col mb-2">
                    <label htmlFor={'Question' + props.qid} className="float-start">Question</label>
                    <input type="text" onChange={handleQuestionChange} className="form-control" id={'Question' + props.qid} placeholder="Enter Question" />
                </div >
            </div>
            {/* Question performance indicator row labels */}
            <div className="row">
                <div className="col mb-2">
                    <label htmlFor={'PIList' + props.qid} className="float-start">Learning Objective</label>
                    <select defaultValue={[]} className="form-control" name={'PIList' + props.qid} id={'PIList' + props.qid} multiple={true}>
                        {props.currentUser && props.currentUser.PIs.map((PI) => (
                            <option value={PI} key={PI}>
                            {PI}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* Question answers row labels*/}
            <div className="row">
                <div className="col-12">
                    <label htmlFor="QuestionAnswer" className="float-start">Question Answers</label>
                    <label htmlFor="QuestionAnswer" className="float-end">Correct Answer</label>
                </div>
            </div>
            {/* Question answers row inputs*/}
            <div className="row">
                <div className="col-10">
                    <input type="text" onChange={handleQuestionChange} className="form-control mb-1" id={'QuestionAnswer1,' + props.qid} placeholder="Enter Question answer" />
                </div>
                <div className="col-2">
                    <div className="form-check">
                        <input className="form-check-input float-end m-3" onChange={handleQuestionChange} type="radio" name={'gridRadios' + props.qid} value="option1" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <input type="text" onChange={handleQuestionChange} className="form-control mb-1" id={'QuestionAnswer2,' + props.qid} placeholder="Enter Question answer" />
                </div>
                <div className="col-2">
                    <div className="form-check">
                        <input onChange={handleQuestionChange} className="form-check-input float-end m-3" type="radio" name={'gridRadios' + props.qid} value="option2" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <input type="text" onChange={handleQuestionChange} className="form-control mb-1" id={'QuestionAnswer3,' + props.qid} placeholder="Enter Question answer" />
                </div>
                <div className="col-2">
                    <div className="form-check">
                        <input onChange={handleQuestionChange} className="form-check-input float-end m-3" type="radio" name={'gridRadios' + props.qid} value="option3" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <input onChange={handleQuestionChange} type="text" className="form-control mb-1" id={'QuestionAnswer4,' + props.qid} placeholder="Enter Question answer" />
                </div>
                <div className="col-2">
                    <div className="form-check">
                        <input onChange={handleQuestionChange} className="form-check-input float-end m-3" type="radio" name={'gridRadios' + props.qid} value="option4" />
                    </div>
                </div>
            </div>
            <button className="btn btn-danger float-right" id={props.qid} onClick={props.removeQuestion}>Remove Question</button>
        </div>
    </>;
};



function StudySetForm() {
    const [questionList, setQuestionList] = useState([]);
    const [getQuestionID, setQuestionID] = useState(0);
    const [skipQuestionIds, setSkipQuestionIds] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/users/${localStorage.getItem("userId")}`)
            .then(response => response.json())
            .then(data => {
                console.log("response data:", data);
                setCurrentUser(data);
            })
            .catch(err => {
                console.log("fetch error:", err);
            });
    }, []);

    const onAddQuestionBtnClick = event => {
        event.preventDefault();
        setQuestionList(questionList.concat(<QuestionForm qid={getQuestionID} key={questionList.length} removeQuestion={onRemoveQuestionBtnClick} currentUser={currentUser} />));
        setQuestionID(getQuestionID + 1);
    };

    const getCorrectAnswerStringFromQNum = (qid) => {
        const radioButtons = document.getElementsByName('gridRadios' + qid);
        let correctAnswerNumber = 1;
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                correctAnswerNumber = i + 1;
            }
        }
        return 'QuestionAnswer' + correctAnswerNumber + ',' + qid;
    };

    const onRemoveQuestionBtnClick = event => {
        event.preventDefault();
        const id = parseInt(event.target.id);
        //console.log('attempting to delete question id: ' + id);
        setQuestionList(questionList => questionList.filter(question => question.props.qid !== id));
        setSkipQuestionIds(skipQuestionIds.concat(id));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Get title and description from form inputs
        const setTitle = document.getElementById('setTitle').value;
        const description = document.getElementById('description').value;

        // Create an array to hold questions
        const questions = [];

        // Loop through each question in questionList and extract data
        for (let i = 0; i < getQuestionID; i++) {
            // Skip question if it has been removed
            if (skipQuestionIds.includes(i)) {
                continue;
            }

            const questionTitle = document.getElementById('QuestionTitle' + i).value;
            const question = document.getElementById('Question' + i).value;
            const answers = [];
            for (let j = 1; j <= 4; j++) {
                const answer = document.getElementById('QuestionAnswer' + j + ',' + i).value;
                answers.push(answer);
            }

            // Get correct answer id string and get value from input
            const correctAnswerId = getCorrectAnswerStringFromQNum(i);
            const correctAnswer = document.getElementById(correctAnswerId).value;

            const PIList = [...document.getElementById("PIList" + i).selectedOptions].map(o => o.value)

            // Create question object and add to questions array
            const questionObj = {
                questionTitle,
                question,
                answers,
                correctAnswer,
                PIList
            };
            questions.push(questionObj);
        }

        // Create studySet object
        const studySet = {
            setId: getSetID(),
            setTitle,
            description,
            creator_id: `${localStorage.getItem("userId")}`,
            questions
        };

        // Log studySet object
        console.log(JSON.stringify(studySet));

        // Post studySet object to server
        fetch('http://localhost:5000/studysets/addstudyset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studySet)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(JSON.stringify(err)));
        navigate('/viewStudySets');

    };

    const getSetID = () => {
        const setId = Math.floor(Math.random() * 1000000000);
        return setId;
    };

    return (
        <div className="StudySetForm bg-dark text-white p-3">
            <h1 className="mb-5">Add Study Set</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-6 mb-3">
                        <label htmlFor="setTitle" className="float-start">Title</label>
                        <input type="text" className="form-control" id="setTitle" placeholder="Enter title" />
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-5">
                        <label htmlFor="description" className="float-start">Description</label>
                        <textarea className="form-control" id="description" rows="3" placeholder="Enter description"></textarea>
                    </div>
                </div>

                <div className="form-group">
                    {questionList}
                    <div className="mt-3 d-flex">
                        <button type="submit" className="btn btn-primary m-1">Submit</button>
                        <button className="btn btn-success m-1" onClick={onAddQuestionBtnClick}>Add Question</button>
                    </div>
                </div>
            </form>
        </div>
    );
}


export default StudySetForm;
