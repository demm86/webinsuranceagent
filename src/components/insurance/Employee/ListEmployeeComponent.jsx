import React, { Component } from 'react'
import EmployeeDataService from '../../../api/insurance/EmployeeDataService'
import AuthenticationService from '../AuthenticationService'

import { Form, Col, Row, Button,ButtonGroup  } from "react-bootstrap";

import * as Icon from 'react-bootstrap-icons';
class ListEmployeeComponent extends Component {
    constructor(props) {
        console.log('constructor')
        super(props)
        this.state = {
            employees: [],
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
        EmployeeDataService.retrieveAllEmployees()
            .then(
                response => {
                    console.log(response);
                    this.setState({ employees: response.data })
                }
            )
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        //console.log(id + " " + username);
        EmployeeDataService.deleteEmployee(username, id)
            .then(
                response => {
                    this.setState({ message: `Delete of todo ${id} Successful` })
                    this.refreshTodos()
                }
            )

    }

    addTodoClicked() {
        this.props.history.push(`/employee/add`)
    }

    updateTodoClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/employee/${id}`)
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
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>

                        <div className="container">

                            <h2>List Employee</h2>
                            {this.state.message && <div class="alert alert-success">{this.state.message}</div>}

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Firstname</th>
                                        <th>Lastname</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>User</th>
                                        <th>Rol</th>
                                        <th>Actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.employees.map(
                                            employee =>
                                                <tr key={employee.idEmployee}>
                                                    <td>{employee.firstName}</td>
                                                    <td>{employee.lastName}</td>
                                                    <td>{employee.email}</td>
                                                    <td>{employee.phone}</td>
                                                    <td>{employee.idUser}</td>
                                                    <td>{employee.idRol}</td>
                                                    <td>
                                                        <ButtonGroup className="float-end" aria-label="Basic example">
                                                            <Button className="btn btn-danger" variant="secondary" onClick={() => this.deleteTodoClicked(employee.idEmployee)}><Icon.Trash></Icon.Trash></Button>
                                                            <Button className="btn " variant="primary" onClick={() => this.updateTodoClicked(employee.idEmployee)}><Icon.Save></Icon.Save></Button>
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

export default ListEmployeeComponent