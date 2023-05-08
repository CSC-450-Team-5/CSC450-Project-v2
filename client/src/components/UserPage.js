import React, { useState, useEffect } from 'react';

const UserPage = () => {
  const [currentUser, setCurrentUser] = useState(null);

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

  return (
    <div className="bg-dark text-white p-3">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            {currentUser ? <h1>{currentUser.username}</h1> : <p>Loading...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;