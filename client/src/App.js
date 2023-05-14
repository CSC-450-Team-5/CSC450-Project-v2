import React, { useState, useEffect } from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import CreateStudySet from "./components/StudySetForm";
import HomePage from "./components/HomePage";
import StudySetCards from "./components/studySetCards";
import HostLobbyForm from "./components/HostLobbyForm";
import SetDetails from "./components/SetDetails";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserPage from "./components/UserPage";
import LobbyDetails from "./components/LobbyDetails";


const App = () => {
    const noNavRoutes = ["/signup", "/login"];

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const isPublicRoute = ['/login', '/signup'].some(route => pathname.startsWith(route));
        if (isPublicRoute) {
            setIsAuthenticated(true);
        } else {
            if (localStorage.getItem("userId") != null) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                navigate('/login');
            }

        }
    }, []);
    console.log(`Current User ID: ${localStorage.getItem("userId")}`);
    var showNav = true;
    if (noNavRoutes.some((item) => pathname.includes(item)))
        showNav = false;

    return (
        <div>
            {showNav && <Navbar />}
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                {isAuthenticated ? (
                    <>
                        <Route path="/hostgame" element={<HostLobbyForm />} />
                        <Route path="/createStudySet" element={<CreateStudySet />} />
                        <Route path="/viewStudySets" element={<StudySetCards />} />
                        <Route path="/lobby/:lobbyId/:playerId" element={<LobbyDetails />} />
                        <Route path="/SetDetails/:setID" element={<SetDetails />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/user" element={<UserPage />} />
                    </>
                ) : (
                    <>
                        {/* <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} /> */}
                    </>
                )}
            </Routes>
        </div>
    );
};

export default App;