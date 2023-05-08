import React from "react";
import Timer from './Timer';
//images
import diamond from '../Images/diamond.png'
import square from '../Images/square.png'
import star from '../Images/star.png'
import triangle from '../Images/triangle.png'

export default function GameQuestions(props){
    return(
        <div className='questions-container bg-dark p-3' >
            <Timer/>
            {/* displays timer*/}
            {/*displays questions with buttons*/}
            <h1 className='player-name'>{props.question}</h1>
            <div className='questions-grid' >
                <div className='question q1'>
                <div className='shape-container' >
                <button onClick={SubmitEvent} type="submit" className="btn btn-primary col-12">
                     <img src={star} alt='' className='shape-question' />
                        </button>
                </div> 
                    <p id='player-join' >{props.answer1}</p>
                 </div> 
                <div className='question q2'>
                    <div className='shape-container'>
                    <button onClick={SubmitEvent} type="submit" className="btn btn-primary col-12">
                     <img src={triangle} alt='' className='shape-question' />
                        </button>
                    </div> 
                    <p id='player-join'>{props.answer2}</p>
                 </div>
                <div className='question q3'>
                    <div className='shape-container'>
                    <button onClick={SubmitEvent} type="submit" className="btn btn-primary col-12">
                     <img src={square} alt='' className='shape-question' />
                        </button>
                    </div> 
                    <p id='player-join'>{props.answer3}</p>
                 </div>
                <div className='question q4'>
                    <div className='shape-container'>
                    <button onClick={SubmitEvent} type="submit" className="btn btn-primary col-12">
                     <img src={diamond} alt='' className='shape-question' />
                        </button>
                    </div> 
                     <p id='player-join'>{props.answer4}</p>
                 </div>
            </div> 
        </div> 
    )
}
