import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ProfileDataService from '../../../api/insurance/ProfileDataService'
import AuthenticationService from '../AuthenticationService'
import { Col, Row, Button, ButtonGroup } from "react-bootstrap";


class ProfilesComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idProfile: this.props.match.params.id,
            description: '',

        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {


        let userAlias = AuthenticationService.getLoggedInUserName()

        if (this.state.idProfile === 'Add') {
            console.log("Add componentDidMount ")
            return
        }

        ProfileDataService.retrieveProfile(this.state.idProfile)
            .then(response => this.setState({
                description: response.data.description
            }))
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a User Name'
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 Characters in description'
        }



        return errors

    }

    onSubmit(values) {
        let userAlias = AuthenticationService.getLoggedInUserName()

        let profile = {
            idProfile: this.state.idProfile,
            description: values.description,
        }

        if (this.state.idProfile === "Add") {
            console.log("Add =>");
            console.log(profile);

            profile = {

                description: values.description,
            }

            ProfileDataService.createProfile(profile)
                .then(() => this.props.history.push('/profile'))
        } else {

            profile = {
                idProfile: this.state.idProfile,
                description: values.description,
            }
            ProfileDataService.updateProfile(profile)
                .then(() => this.props.history.push('/profile'))
        }

        console.log(values);
    }

    cancelUserClicked() {
        this.props.history.push(`/profile`)
    }



    render() {

        let { idProfile, description } = this.state
        //let targetDate = this.state.targetDate

        return (
            <div>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Users</h1>
                        <div className="">
                            <Formik
                                initialValues={{ idProfile, description }}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (

                                        <Form>
                                            <ErrorMessage name="description" component="div"
                                                className="alert alert-warning" />

                                            <fieldset className="form-group">
                                                <label>description</label>
                                                <Field className="form-control" type="text" name="description" />
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

export default ProfilesComponent