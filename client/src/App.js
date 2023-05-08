import React, { useState, useEffect } from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import CreateStudySet from "./components/StudySetForm";
import HomePage from "./components/HomePage";
import StudySetCards from "./components/studySetCards";
import HostLobbyForm from "./components/HostLobbyForm";
import LobbyDetails from "./components/HostLobby";
import SetDetails from "./components/SetDetails";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserPage from "./components/UserPage";
import Game from "./components/Game";

const App = () => {
    const noNavRoutes = ["/signup", "/login"];
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeUser, setActiveUser] = useState(null);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    console.log(`Authenticated:${isAuthenticated}`);
    console.log(`Token: ${localStorage.getItem("token")}`);
    useEffect(() => {
        const isPublicRoute = ['/login', '/signup'].some(route => pathname.startsWith(route));
        console.log(`Route is public: ${isPublicRoute}`);
        if (isPublicRoute) {
            console.log('making public request');
            // Make a request to the public route
            fetch('http://localhost:5000/public-route')
                .then(res => {
                    if (res.ok) {
                        console.log('public route authenticated');
                        setIsAuthenticated(true);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            console.log('making verify request');
            // Make a request to the protected route
            fetch('http://localhost:5000/protected-route', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then(res => {
                    if (res.ok) {
                        console.log('protected route authenticated');
                        res.json().then(data => {
                            console.log(data);
                            setActiveUser(data.user);
                            setIsAuthenticated(true);
                        });
                        setIsAuthenticated(true);
                    } else if (res.status === 401 || res.status === 403) {
                        setIsAuthenticated(false);
                        navigate('/login');

                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, []);
    var showNav = true;
    if (noNavRoutes.some((item) => pathname.includes(item)))
        showNav = false;

    return (
        <div>
            {showNav && <Navbar />}
            <Routes>
                <Route exact path="/" element={<HomePage activeUser={activeUser}/>} />
                {isAuthenticated ? (
                    <>
                        <Route path="/hostgame" element={<HostLobbyForm />} />
                        <Route path="/createStudySet" element={<CreateStudySet />} />
                        <Route path="/viewStudySets" element={<StudySetCards />} />
                        <Route path="/lobby/:lobbyId" element={<LobbyDetails />} />
                        <Route path="/SetDetails/:setID" element={<SetDetails />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/users/:id" element={<UserPage />} />
                        <Route path="/game/:lobbyId/:playerId" element={<Game />} />
                    </>
                ) :(
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                    </>
                )}
            </Routes>
        </div>
    );
};

export default App;