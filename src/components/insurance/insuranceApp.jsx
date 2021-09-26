import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'

import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'

import WelcomeComponent from './WelcomeComponent.jsx'

import UsersComponent from './Users/UsersComponent'
import ListUsersComponent from './Users/ListUsersComponent'

import ClientComponent from './Client/ClientComponent'
import ListClientComponent from './Client/ListClientComponent'

import PolicyStatusComponent from './PolicyStatus/PolicyStatusComponent'
import ListPolicyStatusComponent from './PolicyStatus/ListPolicyStatusComponent'

import InsurancePolicyComponent from './InsurancePolicy/InsurancePolicyComponent'
import ListInsurancePolicyComponent from './InsurancePolicy/ListInsurancePolicyComponent'





import { Container, Col, Row, Button, ButtonGroup } from "react-bootstrap";

class TodoApp extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <div className="TodoApp">

                            <Router>
                                <>
                                    <HeaderComponent />

                                    <Switch>
                                        <Route path="/" exact component={LoginComponent} />
                                        <Route path="/login" component={LoginComponent} />
                                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />

                                        <AuthenticatedRoute path="/users/Add" component={UsersComponent} />
                                        <AuthenticatedRoute path="/users/:id" component={UsersComponent} />
                                        <AuthenticatedRoute path="/users" component={ListUsersComponent} />


                                        <AuthenticatedRoute path="/client/add" component={ClientComponent} />
                                        <AuthenticatedRoute path="/client/:id" component={ClientComponent} />
                                        <AuthenticatedRoute path="/client" component={ListClientComponent} />


                                        <AuthenticatedRoute path="/insurancePolicy/add" component={InsurancePolicyComponent} />
                                        <AuthenticatedRoute path="/insurancePolicy/:id" component={InsurancePolicyComponent} />
                                        <AuthenticatedRoute path="/insurancePolicy" component={ListInsurancePolicyComponent} />

                                        <AuthenticatedRoute path="/policyStatus/add" component={PolicyStatusComponent} />
                                        <AuthenticatedRoute path="/policyStatus/:id" component={PolicyStatusComponent} />
                                        <AuthenticatedRoute path="/policyStatus" component={ListPolicyStatusComponent} />



                                        {/*
                            <AuthenticatedRoute path="/clientAssignment/add" component={ClientAssignmentComponent}/>
                            <AuthenticatedRoute path="/clientAssignment/:id" component={ClientAssignmentComponent}/>
                            <AuthenticatedRoute path="/clientAssignment" component={ListClientAssignmentComponent}/>

                            <AuthenticatedRoute path="/AgentAssignment/add" component={AgentAssignmentComponent}/>
                            <AuthenticatedRoute path="/AgentAssignment/:id" component={AgentAssignmentComponent}/>
                            <AuthenticatedRoute path="/AgentAssignment" component={ListAgentAssignmentComponent}/>

                            <AuthenticatedRoute path="/insurancePolicy/add" component={InsurancePolicyComponent}/>
                            <AuthenticatedRoute path="/insurancePolicy/:id" component={InsurancePolicyComponent}/>
                            <AuthenticatedRoute path="/insurancePolicy" component={ListInsurancePolicyComponent}/>

                            <AuthenticatedRoute path="/profile/add" component={TodoComponent}/>
                            <AuthenticatedRoute path="/profile/:id" component={TodoComponent}/>
                            <AuthenticatedRoute path="/profile" component={ListTodosComponent}/>

                        

                            

                            <AuthenticatedRoute path="/Customer/add" component={TodoComponent}/>
                            <AuthenticatedRoute path="/Customer/:id" component={TodoComponent}/>
                            <AuthenticatedRoute path="/Customer" component={ListTodosComponent}/>

                            <AuthenticatedRoute path="/Policy/add" component={TodoComponent}/>
                            <AuthenticatedRoute path="/Policy/:id" component={TodoComponent}/>
                            <AuthenticatedRoute path="/Policy" component={ListTodosComponent}/> */}

                                        <AuthenticatedRoute path="/logout" component={LogoutComponent} />

                                        <Route component={ErrorComponent} />
                                    </Switch>

                                    <FooterComponent />
                                </>
                            </Router>
                            {/*<LoginComponent/>
                <WelcomeComponent/>*/}
                        </div>

                    </Col>
                </Row>
            </Container>
        )
    }
}

export default TodoApp