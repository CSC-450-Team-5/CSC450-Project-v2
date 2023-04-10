import React from 'react';
import JoinGame from './JoinGame';

const HomePage = () => {
    return (
        <div className="bg-dark text-white p-3">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>Quixel</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <JoinGame />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;