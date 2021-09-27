import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import { Navbar,Container ,Nav,NavDropdown   } from "react-bootstrap";

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        //console.log(isUserLoggedIn);

        return (
            <header>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">Insurance Kodigo</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                            {isUserLoggedIn && <li><Nav.Link className="nav-link" href="/Users">Users</Nav.Link></li>}
                            {isUserLoggedIn && <li><Nav.Link className="nav-link" href="/Profile">Profile</Nav.Link></li>}
                            {isUserLoggedIn && <li><Nav.Link className="nav-link" href="/Client">Client</Nav.Link></li>}
                            {isUserLoggedIn && <li><Nav.Link className="nav-link" href="/Employee">Employee</Nav.Link></li>}
                            {isUserLoggedIn && <li><Nav.Link className="nav-link" href="/InsurancePolicy">Policy</Nav.Link></li>}

                            {!isUserLoggedIn && <li className="pull-right float-end"><Nav.Link  className="nav-link" href="/login">Login</Nav.Link ></li>}
                            {isUserLoggedIn && <li className="pull-right float-end"><Nav.Link  className="nav-link" href="/logout" onClick={AuthenticationService.logout}>Logout</Nav.Link ></li>}   
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
              
            </header>
        )
    }
}

export default HeaderComponent