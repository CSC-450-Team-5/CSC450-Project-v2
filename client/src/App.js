import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes, useLocation } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import CreateStudySet from "./components/StudySetForm";
import HomePage from "./components/HomePage";
import StudySetCards from "./components/studySetCards";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Logout from "./components/Logout";
import UserPage from "./components/UserPage";

const App = () => {
    const noNavRoutes = ["/signup", "/login"];

    const { pathname } = useLocation();
    var showNav = true;
    if (noNavRoutes.some((item) => pathname.includes(item)))
        showNav = false;

    return (
        <div>
            { showNav && <Navbar /> }
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/createStudySet" element={<CreateStudySet />} />
                <Route path="/viewStudySets" element={<StudySetCards />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/users/:id" element={<UserPage />} />
            </Routes>
        </div>
    );
};

export default App;