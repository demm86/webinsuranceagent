import React, { Component } from 'react'
import AuthenticationService from '../AuthenticationService'
import moment from 'moment'
import ClientAssignmentDataService from '../../../api/insurance/ClientAssignmentDataService'

class ListClientAssignmentComponent extends Component {
    constructor(props) {
        console.log('constructor')
        super(props)
        this.state = {
            clientAssignments: [],
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
        ClientAssignmentDataService.retrieveAllClientAssignment()
            .then(
                response => {
                    console.log(response);
                    this.setState({ clientAssignments: response.data })
                }
            )
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        //console.log(id + " " + username);
        ClientAssignmentDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({ message: `Delete of todo ${id} Successful` })
                    this.refreshTodos()
                }
            )

    }

    addTodoClicked() {
        this.props.history.push(`/clientAssignment/add`)
    }

    updateTodoClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/Users/${id}`)
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
                <h1 className="left">List Client Assignment</h1>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Employee</th>
                                <th>Active</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.clientAssignments.map(
                                    clientAssignment =>
                                        <tr key={clientAssignment.idClientAssignments}>
                                            <td>{clientAssignment.idClient}</td>
                                            <td>{clientAssignment.idAgentEmployee}</td>
                                            <td>{clientAssignment.active}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(clientAssignment.idClientAssignments)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(clientAssignment.idClientAssignments)}>Delete</button></td>
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

export default ListClientAssignmentComponent