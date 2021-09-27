import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import EmployeeDataService from '../../../api/insurance/EmployeeDataService'
import UserDataService from '../../../api/insurance/UsersDataService'
import RolDataService from '../../../api/insurance/RolDataService'
import AuthenticationService from '../AuthenticationService'
import { Col, Row, Button, ButtonGroup } from "react-bootstrap";


class EmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            idRol: '',
            idUser: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            users: [],
            roles: []
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {
        if (this.state.id === 'add') {
            UserDataService.retrieveAllUsers()
            .then(response => this.setState({
                users : response.data
            }))

        RolDataService.retrieveAllRoles()
            .then(response => this.setState({
                roles : response.data
            }))
        return
        }

        let userAlias = AuthenticationService.getLoggedInUserName()

        EmployeeDataService.retrieveEmployee(this.state.id)
            .then(response => this.setState({
                idRol: response.data.idRol,
                idUser: response.data.idUser,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                phone: response.data.phone
            }))

        UserDataService.retrieveAllUsers()
            .then(response => this.setState({
                users : response.data
            }))

        RolDataService.retrieveAllRoles()
            .then(response => this.setState({
                roles : response.data
            }))
    }

    validate(values) {
        let errors = {}
        if (!values.firstName) {
            errors.firstName = 'Enter a First Name'
        } /*else if (values.firstName.length < 5) {
            errors.firstName = 'Enter atleast 5 Characters in user name'
        }*/

        if (!values.lastName) {
            errors.lastName = 'Enter a Last Name'
        }

        if(!values.email){
            errors.email = 'Enter a email'
        }

        if(!values.phone){
            errors.phone = 'Enter a number phone'
        }

        return errors

    }

    onSubmit(values) {
        let userAlias = AuthenticationService.getLoggedInUserName()

        if (this.state.id === "add") {
            let employee = {
                idRol: values.idRol,
                idUser: values.idUser,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone
            }
            EmployeeDataService.createEmployee(employee)
                .then(() => this.props.history.push('/employee'))
        } else {
            let employee = {
                idEmployee: this.state.id,
                idRol: values.idRol,
                idUser: values.idUser,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone
            }
            EmployeeDataService.updateEmployee(employee)
                .then(() => this.props.history.push('/employee'))
        }
    }

    cancelUserClicked() {
        this.props.history.push(`/employee`)
    }

    render() {

        let { idEmployee, idRol, idUser, firstName, lastName, email, phone } = this.state
        //let targetDate = this.state.targetDate

        return (
            <div>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Employee</h1>
                        <div className="container">
                            <Formik
                                initialValues={{ idEmployee, firstName, lastName, email, phone, idRol, idUser }}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (

                                        <Form>
                                            <ErrorMessage name="firstName" component="div"
                                                className="alert alert-warning" />
                                            <ErrorMessage name="lastName" component="div"
                                                className="alert alert-warning" />
                                            <ErrorMessage name="email" component="div"
                                                className="alert alert-warning" />
                                            <ErrorMessage name="phone" component="div"
                                                className="alert alert-warning" />
                                            <ErrorMessage name="idRol" component="div"
                                                className="alert alert-warning" />
                                            <ErrorMessage name="idUser" component="div"
                                                className="alert alert-warning" />

                                            <fieldset className="form-group">
                                                <label>FirstName</label>
                                                <Field className="form-control" type="text" name="firstName" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>LastName</label>
                                                <Field className="form-control" type="text" name="lastName" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Email</label>
                                                <Field className="form-control" type="text" name="email" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Phone</label>
                                                <Field className="form-control" type="text" name="phone" />
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
                                                <label>Rol</label>
                                                <Field className="form-control" component="select" name="idRol">
                                                    { this.state.roles.map(rol =>
                                                        <option key={rol.idRol} value={rol.idRol}>{rol.description}</option>
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

export default EmployeeComponent
