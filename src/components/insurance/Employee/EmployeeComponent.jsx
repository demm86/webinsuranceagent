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

        if (this.state.id === 'Add') {
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
        if (!values.userAlias) {
            errors.userAlias = 'Enter a User Name'
        } else if (values.userAlias.length < 5) {
            errors.userAlias = 'Enter atleast 5 Characters in user name'
        }

        if (!values.password) {
            errors.password = 'Enter a profile'
        } else if (values.password.length < 5) {
            errors.password = 'Enter atleast 5 Characters in profile'
        }

        return errors

    }

    onSubmit(values) {
        let userAlias = AuthenticationService.getLoggedInUserName()

        let users = {
            id: this.state.id,
            idRol: values.idRol,
            idUser: values.idUser,
            firstName: values.irstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone
        }

        if (this.state.id === "Add") {
            EmployeeDataService.createUser(userAlias, users)
                .then(() => this.props.history.push('/users'))
        } else {
            EmployeeDataService.updateUser(userAlias, this.state.id, users)
                .then(() => this.props.history.push('/users'))
        }

        console.log(values);
    }

    cancelUserClicked() {
        this.props.history.push(`/employee`)
    }



    render() {

        let { id, idRol, idUser, firstName, lastName, email, phone } = this.state
        //let targetDate = this.state.targetDate

        return (
            <div>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Employee</h1>
                        <div className="">
                            <Formik
                                initialValues={{ id, idRol, idUser, firstName, lastName, email, phone }}
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
                                                <select className="form-control" name="idUser">
                                                    { this.state.users.map(user =>
                                                        <option key={user.idUser} value={user.idUser}>{user.userAlias}</option>
                                                    )}
                                                </select>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Rol</label>
                                                <select className="form-control" name="idRol">
                                                    { this.state.roles.map(rol =>
                                                        <option key={rol.idRol} value={rol.idRol}>{rol.description}</option>
                                                    )}
                                                </select>
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
