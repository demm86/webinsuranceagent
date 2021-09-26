import React, { Component } from 'react'
import AuthenticationService from '../AuthenticationService'
import moment from 'moment'
import AgentAssignmentDataService from '../../../api/insurance/AgentAssignmentDataService'

class ListClientAssignmentComponent extends Component {
    constructor(props) {
        console.log('constructor')
        super(props)
        this.state = {
            agentAssignments: [],
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
        AgentAssignmentDataService.retrieveAllAgentAssignment()
            .then(
                response => {
                    console.log(response);
                    this.setState({ agentAssignments: response.data })
                }
            )
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        //console.log(id + " " + username);
        AgentAssignmentDataService.deleteAgentAssignment(username, id)
            .then(
                response => {
                    this.setState({ message: `Delete of todo ${id} Successful` })
                    this.refreshTodos()
                }
            )

    }

    addTodoClicked() {
        this.props.history.push(`/agentAssignment/add`)
    }

    updateTodoClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/agentAssignment/${id}`)
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
                <h1 className="left">List Agent Assignment</h1>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Agent</th>
                                <th>Active</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.agentAssignments.map(
                                    agentAssignment =>
                                        <tr key={agentAssignment.idAgentAssignments}>
                                            <td>{agentAssignment.idEmployees}</td>
                                            <td>{agentAssignment.idAgent}</td>
                                            <td>{agentAssignment.active}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(agentAssignment.idAgentAssignments)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(agentAssignment.idAgentAssignments)}>Delete</button></td>
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