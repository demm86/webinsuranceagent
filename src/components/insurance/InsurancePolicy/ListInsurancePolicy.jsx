import React, { Component } from 'react'
import InsurancePolicyDataService from '../../../api/insurance/InsurancePolicyDataService'
import AuthenticationService from '../AuthenticationService'
import moment from 'moment'

class ListInsurancePolicyComponent extends Component {

    constructor(props){
        console.log('constructor')
        super(props)
        this.state = {
            insurancePolicy: [],
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
        InsurancePolicyDataService.retrieveAllInsurancePolicy()
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
        InsurancePolicyDataService.deleteTodo(clientname, id)
            .then(
                response => {
                    this.setState({ message: `Delete of todo ${id} Successful` })
                    this.refreshTodos()
                }
            )

    }

    addTodoClicked() {
        this.props.history.push(`/InsurnacePolicy/Add`)
    }

    updateTodoClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/InsurnacePolicy/${id}`)
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

    render(){
        console.log('render')
        
        return(
            <div>
                <h1 className="left">List Todos</h1>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>idInsurancePolicy</th>
                                <th>idClient</th>
                                <th>sellIDAgent</th>
                                <th>idType</th>
                                <th>idStatus</th>
                                <th>period</th>
                                <th>value</th>
                                <th>coverage Amount</th>
                                <th>coverage Start Date</th>
                                <th>coverage Period</th>
                                <th>monthly Fee</th>
                                <th>comission</th>
                                <th>active</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.insurancePolicy.map(
                                    insurancePolicy =>
                                        <tr key={insurancePolicy.idInsurancePolicy}>
                                            <td>{insurancePolicy.idClient}</td>
                                            <td>{insurancePolicy.selliDAgent}</td>
                                            <td>{insurancePolicy.idType}</td>
                                            <td>{insurancePolicy.idStatus}</td>
                                            <td>{insurancePolicy.period}</td>
                                            <td>{insurancePolicy.value}</td>
                                            <td>{insurancePolicy.deductible}</td>
                                            <td>{insurancePolicy.coverageAmount}</td>
                                            <td>{insurancePolicy.monthlyFee}</td>
                                            <td>{insurancePolicy.comission}</td>
                                            <td>{insurancePolicy.active}</td>
                                            <td><button className="btn outline-success" onClick={() => this.updateTodoClicked(insurancePolicy.idInsurancePolicy)}>Update</button></td>
                                            <td><button className="btn outline-warning" onClick={() => this.deleteTodoClicked(insurancePolicy.idInsurancePolicy)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn outline-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )

    }
}
export default ListInsurancePolicyComponent