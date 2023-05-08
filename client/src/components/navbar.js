import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, Button } from 'react-bootstrap';

// We import NavLink to utilize the react router.

// Here, we display our Navbar
export default function Navigationbar() {
    const handleLogout = () => {
        localStorage.removeItem('userId');
        window.location.href = '/login';
    };
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/hostgame">Host Game</Nav.Link>
                    <Nav.Link href="/viewStudySets">View Study Sets</Nav.Link>
                    <Nav.Link href="/createStudySet">Create Study Set</Nav.Link>
                </Nav>
            </Navbar.Collapse>

            <Nav className="ml-auto">
                <Nav.Link href="/users/">User Profile</Nav.Link>
                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
            </Nav>
        </Navbar>

    );
}