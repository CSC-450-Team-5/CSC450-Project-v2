import React, { useState } from "react";




const QuestionForm = () => {
    return <>
        <div className="border rounded p-2">
            {/* Question title row */}
            <div className="row">
                <div className="col-6 mb-2">
                    <label htmlFor="QuestionTitle" className="float-left">Question Title</label>
                    <input type="text" className="form-control" id="QuestionTitle" placeholder="Enter Question title" />
                </div>
            </div>
            {/* Question row */}
            <div className="row">
                <div className="col mb-2">
                    <label htmlFor="Question" className="float-left">Question</label>
                    <input type="text" className="form-control" id="Question" placeholder="Enter Question" />
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
                    <input type="text" className="form-control mb-1" id="QuestionAnswer1" placeholder="Enter Question answer" />
                </div>
                <div className="col-2">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" value="option1" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <input type="text" className="form-control mb-1" id="QuestionAnswer2" placeholder="Enter Question answer" />
                </div>
                <div className="col-2">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" value="option2" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <input type="text" className="form-control mb-1" id="QuestionAnswer3" placeholder="Enter Question answer" />
                </div>
                <div className="col-2">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" value="option3" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <input type="text" className="form-control mb-1" id="QuestionAnswer4" placeholder="Enter Question answer" />
                </div>
                <div className="col-2">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" value="option4" />
                    </div>
                </div>
            </div>
        </div>
    </>;
};



function StudySetForm() {
    const [inputList, setInputList] = useState([]);

    const onAddQuestionBtnClick = event => {
        event.preventDefault();
        setInputList(inputList.concat(<QuestionForm key={inputList.length} />));
    };

    return (
        <div className="StudySetForm bg-dark text-white p-3">
            <h1 className="mb-5">Add Study Set</h1>
            <form>
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
                    {inputList}
                    <button className="btn btn-success float-right mt-3" onClick={onAddQuestionBtnClick}>Add Question</button>
                </div>

                <button type="submit" className="btn btn-primary float-left">Submit</button>
            </form>
        </div>
    );
}

export default StudySetForm;
