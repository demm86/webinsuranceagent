import React, { Component } from 'react'
import ClientDataService from '../../../api/insurance/ClientDataService'
import AuthenticationService from '../AuthenticationService'
import moment from 'moment'
import { Form, Col, Row, Button,ButtonGroup  } from "react-bootstrap";

import * as Icon from 'react-bootstrap-icons';
class ListClientComponent extends Component {
    constructor(props) {
        console.log('constructor')
        super(props)
        this.state = {
            clients: [],
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
        ClientDataService.retrieveAllClients()
            .then(
                response => {
                    console.log(response);
                    this.setState({ clients: response.data })
                }
            )
    }

    deleteTodoClicked(id) {
        let clientname = AuthenticationService.getLoggedInClientName()
        //console.log(id + " " + username);
        ClientDataService.deleteTodo(clientname, id)
            .then(
                response => {
                    this.setState({ message: `Delete of todo ${id} Successful` })
                    this.refreshTodos()
                }
            )

    }

    addTodoClicked() {
        this.props.history.push(`/client/add`)
    }

    updateTodoClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/Clients/${id}`)
        // /todos/${id}
        // let username = AuthenticationService.getLoggedInUserName()
        // //console.log(id + " " + username);
        // TodoDataService.deleteTodo(username, id)
        //  .then (
        //      response => {
        //         this.setState({message : `Delete of todo ${id} Successful`})
        //         this.refreshTodos()
        //      }
        //  )

    }

    render() {
        console.log('render')
        return (
            <div>
                <h1 className="left">List Client</h1>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                
                                <th>ID Employee</th>
                                <th> LastName</th>
                                <th> FirstName</th>
                                <th> Address</th>
                                <th> Email</th>
                                <th> Phone Number </th>
                                <th> Birthday</th>
                                <th>Actions</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.clients.map(
                                    client =>
                                        <tr key={client.idClient}>
                                            <td>{client.idEmployee}</td>
                                            <td>{client.firstName}</td>
                                            <td>{client.lastName}</td>
                                            <td>{client.address}</td>
                                            <td>{client.email}</td>
                                            <td>{client.phone}</td>
                                            <td>{client.birthday}</td>
                                            <td>
                                            <ButtonGroup className="float-end" aria-label="Basic example">
                                                            <Button className="btn btn-danger" variant="secondary" onClick={() => this.deleteTodoClicked(client.idClient)}><Icon.Trash></Icon.Trash></Button>
                                                            <Button className="btn " variant="primary" onClick={() => this.updateTodoClicked(client.idClient)}><Icon.Save></Icon.Save></Button>
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
            </div>
        )
    }
}

export default ListClientComponent