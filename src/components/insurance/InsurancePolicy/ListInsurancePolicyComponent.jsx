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
                    this.setState({ insurancePolicy: response.data })
                }
            )
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInClientName()
        //console.log(id + " " + username);
        InsurancePolicyDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({ message: `Delete of todo ${id} Successful` })
                    this.refreshTodos()
                }
            )

    }

    addTodoClicked() {
        this.props.history.push(`/InsurancePolicy/add`)
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

    render(){
        console.log('render')
        
        return(
            <div>
                <h1 className="left">List Insurance Policy</h1>
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
                                    insurancePolicys =>
                                        <tr key={insurancePolicys.idInsurancePolicy}>
                                            <td>{insurancePolicys.idClient}</td>
                                            <td>{insurancePolicys.selliDAgent}</td>
                                            <td>{insurancePolicys.idType}</td>
                                            <td>{insurancePolicys.idStatus}</td>
                                            <td>{insurancePolicys.period}</td>
                                            <td>{insurancePolicys.value}</td>
                                            <td>{insurancePolicys.deductible}</td>
                                            <td>{insurancePolicys.coverageAmount}</td>
                                            <td>{insurancePolicys.coverageStartDay}</td>
                                            <td>{insurancePolicys.monthlyFee}</td>
                                            <td>{insurancePolicys.comission}</td>
                                            <td>{insurancePolicys.active}</td>
                                            <td><button className="btn btn-outline-success" onClick={() => this.updateTodoClicked(insurancePolicys.idInsurancePolicy)}>Update</button></td>
                                            <td><button className="btn btn-outline-warning" onClick={() => this.deleteTodoClicked(insurancePolicys.idInsurancePolicy)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-outline-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )

    }
}
export default ListInsurancePolicyComponent