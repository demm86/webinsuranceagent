import React, { Component } from 'react'
import ClientDataService from '../../../api/insurance/ClientDataService'
import AuthenticationService from '../AuthenticationService'
import moment from 'moment'

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
        this.props.history.push(`/Clients/Add`)
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
                <h1 className="left">List Todos</h1>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Client ID Client</th>
                                <th>Client ID Employee</th>
                                <th>Client FirstName</th>
                                <th>Client LastName</th>
                                <th>Client Address</th>
                                <th>Client Email</th>
                                <th>Client Phone Number </th>
                                <th>Client Birthday</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.clients.map(
                                    clients =>
                                        <tr key={clients.idClient}>
                                            <td>{clients.idEmployee}</td>
                                            <td>{clients.firstName}</td>
                                            <td>{clients.lastName}</td>
                                            <td>{clients.address}</td>
                                            <td>{clients.email}</td>
                                            <td>{clients.phone}</td>
                                            <td>{clients.birthday}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(clients.idClient)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(clients.idClient)}>Delete</button></td>
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

export default ListClientComponent