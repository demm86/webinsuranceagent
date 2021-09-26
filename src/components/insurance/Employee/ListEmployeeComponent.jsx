import React, { Component } from 'react'
import EmployeeDataService from '../../../api/insurance/EmployeeDataService'
import AuthenticationService from '../AuthenticationService'
import moment from 'moment'

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
        let employeename = AuthenticationService.getLoggedInEmployeeName()
        //console.log(id + " " + username);
        EmployeeDataService.deleteTodo(employeename, id)
            .then(
                response => {
                    this.setState({ message: `Delete of todo ${id} Successful` })
                    this.refreshTodos()
                }
            )

    }

    addTodoClicked() {
        this.props.history.push(`/Employee/add`)
    }

    updateTodoClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/Employees/${id}`)
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
                <h1 className="left">List Todos</h1>
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
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employees =>
                                        <tr key={employees.idEmployee}>
                                            <td>{employees.idRol}</td>
                                            <td>{employees.idUser}</td>
                                            <td>{employees.firstName}</td>
                                            <td>{employees.lastName}</td>
                                            <td>{employees.email}</td>
                                            <td>{employees.phone}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(employees.idEmployee)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(employees.idEmployee)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListEmployeeComponent