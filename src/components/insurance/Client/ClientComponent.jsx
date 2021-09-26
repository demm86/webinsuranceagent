import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ClientDataService from '../../../api/insurance/ClientDataService'
import AuthenticationService from '../AuthenticationService'

class ClientComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        if (this.state.id === -1) {
            return
        }

        let username = AuthenticationService.getLoggedInUserName()

        ClientDataService.retrieveClient(username, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }))
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 Characters in Description'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }

        return errors

    }

    onSubmit(values) {
        let clientname = AuthenticationService.getLoggedInClientName()

        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

        if (this.state.id === -1) {
            ClientDataService.createTodo(clientname, todo)
                .then(() => this.props.history.push('/todos'))
        } else {
            ClientDataService.updateTodo(clientname, this.state.id, todo)
                .then(() => this.props.history.push('/todos'))
        }

        console.log(values);
    }

    render() {

        let { idEmployee, firstName, lastName, address, email, phoneNumber, birthday} = this.state
        //let targetDate = this.state.targetDate

        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{ idEmployee, firstName, lastName, address, email, phoneNumber, birthday}}
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
                                        <label>IdEmployee</label>
                                        <Field className="form-control" type="text" name="idEmployee" />
                                    </fieldset>
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
                                        <Field className="form-control" type="text" name="phoneNumber" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>birthDay</label>
                                        <Field className="form-control" type="date" name="birthday" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default ClientComponent