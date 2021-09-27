import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UsersDataService from '../../../api/insurance/UsersDataService'
import AuthenticationService from '../AuthenticationService'
import { Col, Row, Button, ButtonGroup } from "react-bootstrap";


class UsersComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idUser: this.props.match.params.id,
            idProfile: '',
            userAlias: '',
            password: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {


        let userAlias = AuthenticationService.getLoggedInUserName()

        if (this.state.idUser === 'Add') {
            console.log("Add componentDidMount ")
            return
        }

        UsersDataService.retrieveUser(this.state.idUser)
            .then(response => this.setState({
                idProfile: response.data.idProfile,
                userAlias: response.data.userAlias,
                password: response.data.password
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
            errors.password = 'Enter atleast 5 Characters in password'
        }

        return errors

    }

    onSubmit(values) {
        let userAlias = AuthenticationService.getLoggedInUserName()

        let users = {};

        if (this.state.idUser === "Add") {

            users = {
                idProfile: values.idProfile,
                userAlias: values.userAlias,
                password: values.password
            }
            
            console.log("Add =>");
            console.log(users);
            UsersDataService.createUser(users)
                .then(() => this.props.history.push('/users'))
        } else {

            users = {
                idUser: this.state.idUser,
                idProfile: values.idProfile,
                userAlias: values.userAlias,
                password: values.password
            }

            UsersDataService.updateUser(users)
                .then(() => this.props.history.push('/users'))
        }

        console.log(values);
    }

    cancelUserClicked() {
        this.props.history.push(`/Users`)
    }



    render() {

        let { idUser, idProfile, userAlias, password } = this.state
        //let targetDate = this.state.targetDate

        return (
            <div>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Users</h1>
                        <div className="">
                            <Formik
                                initialValues={{ idUser, idProfile, userAlias }}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (

                                        <Form>
                                            <ErrorMessage name="userAlias" component="div"
                                                className="alert alert-warning" />
                                            <ErrorMessage name="password" component="div"
                                                className="alert alert-warning" />

                                            <fieldset className="form-group">
                                                <label>User Name</label>
                                                <Field className="form-control" type="text" name="userAlias" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Profile</label>
                                                <Field className="form-control" type="text" name="idProfile" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Password</label>
                                                <Field className="form-control" type="password" name="password" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Password</label>
                                                <Field className="form-control" type="password" name="password-compare" />
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

export default UsersComponent