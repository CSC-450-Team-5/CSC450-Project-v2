import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navigationbar() {
    return (
        // <div>
        //     <nav className="navbar navbar-expand-lg navbar-dark bg-secondary px-3">
        //         <NavLink className="navbar-brand" to="/">
        //             <h1>Home</h1>
        //         </NavLink>
        //         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //             <span class="navbar-toggler-icon"></span>
        //         </button>

        //         <div className="collapse navbar-collapse" id="navbarNav">
        //             <ul className="navbar-nav ml-auto">
        //                 <li className="nav-item">
        //                     <NavLink className="nav-link" to="/viewStudySets">
        //                         View Study Sets
        //                     </NavLink>
        //                 </li>
        //                 <li className="nav-item">
        //                     <NavLink className="nav-link" to="/createStudySet">
        //                         Create Study Set
        //                     </NavLink>
        //                 </li>
        //             </ul>
        //         </div>
        //     </nav>
        // </div>
        <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/viewStudySets">View Study Sets</Nav.Link>
                    <Nav.Link href="/createStudySet">Create Study Set</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    );
}