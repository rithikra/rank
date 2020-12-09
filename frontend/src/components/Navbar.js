import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class NavBar extends React.Component {
    state = {};
    render() {
      return (
        <Navbar bg="dark" variant="dark"expand="lg" >
            <Navbar.Brand href="/">rank.fyi</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/ranking">Ranking</Nav.Link>
                    <Nav.Link href="/internshipMatching">Internship Matching</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
      );
    }
}

export default NavBar