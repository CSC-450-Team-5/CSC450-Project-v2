import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import CreateStudySet from "./components/StudySetForm";
import HomePage from "./components/HomePage";
import StudySetCards from "./components/studySetCards";

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                {/* <Route path="/edit/:id" element={<Edit />} /> */}
                <Route path="/createStudySet" element={<CreateStudySet />} />
                <Route path="/viewStudySets" element={<StudySetCards />} />
            </Routes>
        </div>
    );
};

export default App;