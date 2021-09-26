import React, { Component } from 'react'
import PolicyStatusDataService from '../../../api/insurance/PolicyStatusServices'
import AuthenticationService from '../AuthenticationService'
import moment from 'moment'

class ListPolicyStatusComponent extends Component {
    constructor(props) {
        console.log('constructor')
        super(props)
        this.state = {
            policyStatus: [],
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
        PolicyStatusDataService.retrieveAllPolicyStatus()
            .then(
                response => {
                    console.log(response);
                    this.setState({ policyStatus: response.data })
                }
            )
    }

    deleteTodoClicked(id) {
        let policyStatus = AuthenticationService.getLoggedInPolicyStatusName()
        //console.log(id + " " + username);
        PolicyStatusDataService.deleteTodo(policyStatus, id)
            .then(
                response => {
                    this.setState({ message: `Delete of todo ${id} Successful` })
                    this.refreshTodos()
                }
            )

    }

    addTodoClicked() {
        this.props.history.push(`/policyStatus/add`)
    }

    updateTodoClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/PolicyStatus/${id}`)
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
                                <th>ID Status</th>
                                <th>Description</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.policyStatus.map(
                                    policyStatus =>
                                        <tr key={policyStatus.idStatus}>
                                            <td>{policyStatus.description}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(policyStatus.idStatus)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(policyStatus.idStatus)}>Delete</button></td>
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

export default ListPolicyStatusComponent