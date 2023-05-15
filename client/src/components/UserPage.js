import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudySetCard = (props) => {
  const studySet = props.studySet;
  const navigate = useNavigate();
  const onStudySetClick = (event, studySetId) => {
    event.preventDefault();
    navigate(`/SetDetails/${studySetId}`);
  };
  return (
    <div className="card col-12 col-md-4 p-1 m-1 bg-dark border bg-secondary">

      <div className="card-header bg-dark">
        {studySet.name}
      </div>
      <div className="card-body bg-secondary">
        <p className="card-text">{studySet.description}</p>
        <button className="btn btn-primary" onClick={(event) => onStudySetClick(event, studySet._id)}>Open Study Set</button>

      </div>
    </div>
  );
}

function StudySetCards() {

  //get the list of study sets
  const [studySets, setStudySets] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/studysets/getStudySets')
      .then(response => response.json())
      .then(data => {
        setStudySets(data);
      })
      .catch(err => console.log(err));
  }, []);

  const cards = [];
  for (let i = 0; i < studySets.length; i++) {
    const studySet = studySets[i];
    if (studySet.creator_id === localStorage.getItem("userId")) {
      cards.push(<StudySetCard key={i} studySet={studySets[i]} />);
    }
  }


  return (
    <div className="study-set-container bg-dark text-white p-3 px-5 container-fluid">
      <div className="row">
        <div className="col-12" >
          <h1>Your Study Sets</h1>
        </div>
      </div>
      <div className='container-fluid'>
        <div className="row" >
          {cards}
        </div>
      </div>
    </div>
  );
}

const UserPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [performanceIndicator, setPerformanceIndicator] = useState('');
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

  const handleSubmit = async event => {
    if (currentUser.PIs) {
      currentUser.PIs = currentUser.PIs.concat(performanceIndicator);
    } else {
      currentUser.PIs = [`${performanceIndicator}`];
    }
    console.log(currentUser.PIs);
    event.preventDefault();
    const requestBody = {
      username: currentUser.username,
      password: currentUser.password,
      PIs: currentUser.PIs,
    };
  
    const response = await fetch(`http://localhost:5000/users/update/${localStorage.getItem('userId')}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });
    const data = await response.json();
  
    setCurrentUser({
      ...currentUser,
      PIs: requestBody.PIs,
    });
  
    setPerformanceIndicator('');
  
    navigate(`/user`);
  };

  return (
    <div className="bg-dark text-white p-3">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            {currentUser ? <h1>{currentUser.username}</h1> : <p>Loading...</p>}
          </div>
          <div className='row'>
            <div className="col-12 col-sm-8 col-md-6 mb-3 mx-auto border rounded p-2">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="performanceIndicator">Learning Objectives</label>
                    <input
                        type="text"
                        className="form-control"
                        id="performanceIndicator"
                        required
                        placeholder="Enter new learning objective name"
                        value={performanceIndicator}
                        onChange={event => setPerformanceIndicator(event.target.value)}
                    />
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-primary col-12"
                            onClick={handleSubmit}
                        >
                            Add Learning Objective
                        </button>
                    </div>
                </div>
              </form>
            </div>
          </div>
          <div>{StudySetCards()}</div>
        </div>
      </div>
    </div>
  );
};


export default UserPage;