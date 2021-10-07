import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ClientDataService from '../../../api/insurance/ClientDataService'
import AuthenticationService from '../AuthenticationService'
import UserDataService from '../../../api/insurance/UsersDataService'
import EmployeeDataService from '../../../api/insurance/EmployeeDataService'
import { Col, Row, Button, ButtonGroup } from "react-bootstrap";



class ClientComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            phone: '',
            birthday: '',
            idUser: '',
            idEmployee: '',
            users: [],
            employees: []
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        if (this.state.id === 'add') {
            UserDataService.retrieveAllUsers()
            .then(response => this.setState({
                users: response.data
            }))

        EmployeeDataService.retrieveAllEmployees()
            .then(response => this.setState({
                employees: response.data
            }))
            return
        }

        let username = AuthenticationService.getLoggedInUserName()

        ClientDataService.retrieveClient(this.state.id)
            .then(response => this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                address: response.data.address,
                email: response.data.email,
                phone: response.data.phone,
                birthday: response.data.birthday,
                idUser: response.data.idUSer,
                idEmployee: response.data.idEmployee
            }))

        UserDataService.retrieveAllUsers()
            .then(response => this.setState({
                users: response.data
            }))

        EmployeeDataService.retrieveAllEmployees()
            .then(response => this.setState({
                employees: response.data
            }))    
    }

    validate(values) {
        let errors = {}
        if (!values.firstName) {
            errors.firstName = 'Enter a First Name'
        }

        if (!values.lastName) {
            errors.lastName = 'Enter a Last Name'
        }

        if (!values.address) {
            errors.address = 'Enter a address'
        }

        if (!values.email) {
            errors.email = 'Enter a email'
        }

        if (!values.phone) {
            errors.phone = 'Enter a phone'
        }

        if (!values.birthday) {
            errors.birthday = 'Enter a birthday'
        }

        return errors

    }

    onSubmit(values) {
<<<<<<< HEAD
        let userAlias = AuthenticationService.getLoggedInUserName()

        let client = {
            id: this.state.id,  
=======
        let username = AuthenticationService.getLoggedInUserName()

        let client = {
            id: this.state.id,
>>>>>>> 7035fa6dc4e2ece3a69fe8729b98861d1aa91b26
            firstName: values.firstName,
            lastName: values.lastName,
            address: values.address,
            email: values.email,
<<<<<<< HEAD
            phoneNumber: values.phoneNumber,
            birthday: values.birthday,
            

        }

        if (this.state.id === 'add') {
            ClientDataService.createTodo(userAlias, todo)
                .then(() => this.props.history.push('/client'))
        } else {
            ClientDataService.updateTodo(userAlias, this.state.id, todo)
=======
            phone: values.phone,
            birthday: values.birthday
        }

        if (this.state.id === "add") {
            let client = {
                firstName: values.firstName,
                lastName: values.lastName,
                address: values.address,
                email: values.email,
                phone: values.phone,
                birthday: values.birthday,
                idUer: values.idUser,
                idEmployee: values.idEmployee
            }
            ClientDataService.createClient(client)
                .then(() => this.props.history.push('/client'))
        } else {
            let client = {
                idClient: this.state.id,
                firstName: values.firstName,
                lastName: values.lastName,
                address: values.address,
                email: values.email,
                phone: values.phone,
                birthday: values.birthday,
                idUer: values.idUser,
                idEmployee: values.idEmployee
            }
            ClientDataService.updateClient(client)
>>>>>>> 7035fa6dc4e2ece3a69fe8729b98861d1aa91b26
                .then(() => this.props.history.push('/client'))
        }

        console.log(values);
    }

    cancelUserClicked() {
        this.props.history.push(`/client`)
    }

    render() {

        let { firstName, lastName, address, email, phone, birthday, idUser, idEmployee} = this.state
        //let targetDate = this.state.targetDate

        return (
            <div>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Client</h1>
                        <div className="container">
                            <Formik
                                initialValues={{ firstName, lastName, address, email, phone, birthday, idUser, idEmployee}}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (
                                        <Form>
                                            <ErrorMessage name="idClient" component="div"
                                                className="alert alert-warning" />
                                            <ErrorMessage name="idEmployee" component="div"
                                                className="alert alert-warning" />
                                            <ErrorMessage name="firstName" component="div"
                                                className="alert alert-warning" />
                                            <ErrorMessage name="lastName" component="div"
                                                className="alert alert-warning" />
                                            <ErrorMessage name="address" component="div"
                                                className="alert alert-warning" />
                                                <ErrorMessage name="email" component="div"
                                                className="alert alert-warning" />
                                                <ErrorMessage name="phoneNumber" component="div"
                                                className="alert alert-warning" />
                                                <ErrorMessage name="birthday" component="div"
                                                className="alert alert-warning" />
                                
                                            
                                            <fieldset className="form-group">
                                                <label>firstName</label>
                                                <Field className="form-control" type="text" name="firstName" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>lastName</label>
                                                <Field className="form-control" type="text" name="lastName" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>address</label>
                                                <Field className="form-control" type="text" name="address" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>email</label>
                                                <Field className="form-control" type="text" name="email" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>phoneNumber</label>
                                                <Field className="form-control" type="text" name="phone" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>birthDay</label>
                                                <Field className="form-control" type="date" name="birthday" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>User</label>
                                                <Field className="form-control" component="select" name="idUser">
                                                    { this.state.users.map(user =>
                                                        <option key={user.idUser} value={user.idUser}>{user.userAlias}</option>
                                                    )}
                                                </Field>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Employee</label>
                                                <Field className="form-control" component="select" name="idEmployee">
                                                    { this.state.employees.map(employee =>
                                                        <option key={employee.idEmployee} value={employee.idEmployee}>{employee.firstName}</option>
                                                    )}
                                                </Field>
                                            </fieldset>
                                            <br />
                                            
                                            <ButtonGroup className="float-end" aria-label="Basic example">
                                            <Button className="btn btn-danger" variant="secondary" onClick={() => this.cancelUserClicked()} >Cancel</Button>
                                            <Button className="btn btn-success" variant="secondary" type="submit">Save</Button>
                                            </ButtonGroup>
                                        </Form>
                                    )
                                }   
                            </Formik>
                        </div>
                    </Col>
                </Row>
                

                
            </div>
        )
    }
}

export default ClientComponent