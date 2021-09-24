import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'

import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'

import WelcomeComponent from './WelcomeComponent.jsx'

import UsersComponent from './Users/UsersComponent'
import ListUsersComponent from './Users/ListUsersComponent'


class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>

                            <AuthenticatedRoute path="/user/add" component={UsersComponent}/>
                            <AuthenticatedRoute path="/user/:id" component={UsersComponent}/>
                            <AuthenticatedRoute path="/user" component={ListUsersComponent}/>
{/* 

                            <AuthenticatedRoute path="/todos/add" component={TodoComponent}/>
                            <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                            <AuthenticatedRoute path="/todos" component={ListTodosComponent}/>

                            <AuthenticatedRoute path="/profile/add" component={TodoComponent}/>
                            <AuthenticatedRoute path="/profile/:id" component={TodoComponent}/>
                            <AuthenticatedRoute path="/profile" component={ListTodosComponent}/>

                        

                            <AuthenticatedRoute path="/Employee/add" component={TodoComponent}/>
                            <AuthenticatedRoute path="/Employee/:id" component={TodoComponent}/>
                            <AuthenticatedRoute path="/Employee" component={ListTodosComponent}/>

                            <AuthenticatedRoute path="/Customer/add" component={TodoComponent}/>
                            <AuthenticatedRoute path="/Customer/:id" component={TodoComponent}/>
                            <AuthenticatedRoute path="/Customer" component={ListTodosComponent}/>

                            <AuthenticatedRoute path="/Policy/add" component={TodoComponent}/>
                            <AuthenticatedRoute path="/Policy/:id" component={TodoComponent}/>
                            <AuthenticatedRoute path="/Policy" component={ListTodosComponent}/> */}

                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            
                            <Route component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
                {/*<LoginComponent/>
                <WelcomeComponent/>*/}
            </div>
        )
    }
}

export default TodoApp