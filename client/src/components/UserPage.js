import React from 'react';

const UserPage = () => {
    var currentUser = "";
    fetch(`http://localhost:5000/users/${localStorage.getItem("userId")}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            currentUser = (data);
            console.log(currentUser.username);
        })
        .catch(err => console.log(err));
    return (
        <div className="bg-dark text-white p-3">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>{currentUser.username}</h1>
                    </div>
                </div>
               
            </div>
        </div>
    );
   
};

export default UserPage;