import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

const QuestionForm = (props) => {

    return <>
        <div className="border rounded p-2">
            {/* Question title row */}
            <div className="row">
                <div className="col-6 mb-2">
                    <label htmlFor={'QuestionTitle' + props.qid} className="float-left">Question Title</label>
                    <input type="text" className="form-control" id={'QuestionTitle' + props.qid} placeholder="Enter Question title" />
                </div>
            </div>
            {/* Question row */}
            <div className="row">
                <div className="col mb-2">
                    <label htmlFor={'Question' + props.qid} className="float-left">Question</label>
                    <input type="text" className="form-control" id={'Question' + props.qid} placeholder="Enter Question" />
                </div >
            </div>
            {/* Question answers row labels*/}
            <div className="row">
                <div className="col-12">
                    <label htmlFor="QuestionAnswer" className="float-left">Question Answers</label>
                    <label htmlFor="QuestionAnswer" className="float-right">Correct Answer</label>
                </div>
            </div>
            {/* Question answers row inputs*/}
            <div className="row">
                <div className="col-10">
                    <input type="text" className="form-control mb-1" id={'QuestionAnswer1,' + props.qid} placeholder="Enter Question answer" />
                </div>
                <div className="col-2">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={'gridRadios' + props.qid} value="option1" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <input type="text" className="form-control mb-1" id={'QuestionAnswer2,' + props.qid} placeholder="Enter Question answer" />
                </div>
                <div className="col-2">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={'gridRadios' + props.qid} value="option2" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <input type="text" className="form-control mb-1" id={'QuestionAnswer3,' + props.qid} placeholder="Enter Question answer" />
                </div>
                <div className="col-2">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={'gridRadios' + props.qid} value="option3" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <input type="text" className="form-control mb-1" id={'QuestionAnswer4,' + props.qid} placeholder="Enter Question answer" />
                </div>
                <div className="col-2">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={'gridRadios' + props.qid} value="option4" />
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

    const onAddQuestionBtnClick = event => {
        event.preventDefault();
        setQuestionList(questionList.concat(<QuestionForm qid={getQuestionID} key={questionList.length} removeQuestion={onRemoveQuestionBtnClick} />));
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


            // Create question object and add to questions array
            const questionObj = {
                questionTitle,
                question,
                answers,
                correctAnswer
            };
            questions.push(questionObj);
        }

        // Create studySet object
        const studySet = {
            setId: getSetID(),
            setTitle,
            description,
            creator_id: 1,
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
                        <label htmlFor="setTitle" className="float-left">Title</label>
                        <input type="text" className="form-control" id="setTitle" placeholder="Enter title" />
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-5">
                        <label htmlFor="description" className="float-left">Description</label>
                        <textarea className="form-control" id="description" rows="3" placeholder="Enter description"></textarea>
                    </div>
                </div>

                <div className="form-group">
                    {questionList}
                    <button className="btn btn-success float-right mt-3" onClick={onAddQuestionBtnClick}>Add Question</button>
                </div>

                <button type="submit" className="btn btn-primary float-left">Submit</button>
            </form>
        </div>
    );
}


export default StudySetForm;
