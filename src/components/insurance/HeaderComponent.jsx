import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'


class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        //console.log(isUserLoggedIn);

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="" className="navbar-brand">Insurance</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/User">User</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/Client">Client</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/ClientAssignment">Client Assignment</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/AgentAssignment">Agent Assignment</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/Profile">Profile</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/InsurancePolicy">Insurance Policy</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/Employee">Employee</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/Customer">Customer</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/PolicyStatus">Policy Status</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent