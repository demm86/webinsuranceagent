import React, { Component } from 'react'
import ProfileDataService from '../../../api/insurance/ProfileDataService'
import AuthenticationService from '../AuthenticationService'

import { Form, Col, Row, Button, ButtonGroup } from "react-bootstrap";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


import * as Icon from 'react-bootstrap-icons';
class ListProfilesComponent extends Component {
    constructor(props) {
        console.log('constructor')
        super(props)
        this.state = {
            profile: [],
            message: null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.refreshTodos();
        console.log(this.state)
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName()

        ProfileDataService.retrieveAllProfiles()
            .then(
                response => {
                    console.log(response);
                    this.setState({ profile: response.data })
                }
            )
    }

    deleteTodoClicked(id,description) {
        let username = AuthenticationService.getLoggedInUserName()

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => ProfileDataService.deleteProfile(id)
                        .then(
                            response => {
                                this.setState({ message: `Delete of profile ${id} - ${description} Successful` })
                                this.refreshTodos()
                            }
                        )
                },
                {
                    label: 'No',
                    onClick: () => console.log("Action Canceled")
                }
            ]
        });


    }

    addTodoClicked() {
        this.props.history.push(`/Profile/Add/`)
    }

    updateTodoClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/Profile/${id}`)
    }

    render() {
        console.log('render')
        return (
            <div>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>

                        <div className="container">

                            <h2>List Profiles</h2>
                            {this.state.message && <div class="alert alert-success">{this.state.message}</div>}

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Update</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.profile.map(
                                            profile =>
                                                <tr key={profile.idProfile}>
                                                    <td>{profile.description}</td>
                                                    <td>
                                                        <ButtonGroup className="float-end" aria-label="Basic example">
                                                            <Button className="btn btn-danger" variant="secondary" onClick={() => this.deleteTodoClicked(profile.idProfile,profile.description)}><Icon.Trash></Icon.Trash></Button>
                                                            <Button className="btn " variant="primary" onClick={() => this.updateTodoClicked(profile.idProfile)}><Icon.Save></Icon.Save></Button>
                                                        </ButtonGroup>


                                                    </td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <div className="">
                                <Row>
                                    <Col>
                                        <button className="btn btn-success float-end" onClick={this.addTodoClicked}><Icon.PlusCircle></Icon.PlusCircle></button>
                                    </Col>

                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default ListProfilesComponent