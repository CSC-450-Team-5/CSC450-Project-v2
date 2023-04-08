import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary px-3">
                <NavLink className="navbar-brand" to="/">
                    <h1>Home</h1>
                </NavLink>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/viewStudySets">
                                View Study Sets
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/createStudySet">
                                Create Study Set
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}