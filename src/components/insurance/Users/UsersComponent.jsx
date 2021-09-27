import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UsersDataService from '../../../api/insurance/UsersDataService'
import ProfileDataService from '../../../api/insurance/ProfileDataService'
import AuthenticationService from '../AuthenticationService'
import { Col, Row, Button, ButtonGroup } from "react-bootstrap";
import BootstrapSelect from 'react-bootstrap-select-dropdown';



class UsersComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profiles: [],
            users: {
                idUser: this.props.match.params.id,
                idProfile: '',
                userAlias: '',
                password: ''
            },
            selectedIdprofile: ''
        };


        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {


        let userAlias = AuthenticationService.getLoggedInUserName()

        if (this.state.users.idUser === 'Add') {
            console.log("Add componentDidMount ")
            return
        }




        UsersDataService.retrieveUser(this.state.users.idUser)
        .then(response => {

            console.log(response);
            this.setState({ users: response.data })

            this.state.selectedIdprofile = this.state.users.idProfile;
            console.log("this.state.selectedIdprofile")
            console.log(this.state.users);
            console.log(this.state.selectedIdprofile)


            ProfileDataService.retrieveAllProfiles()
            .then(
                response => {
                    console.log(response);
                    //this.setState({ profiles: response.data })

                    let profileFromApi = response.data.map(profiles => {
                        return { value: profiles.idProfile, display: profiles.description }
                    });
                    this.setState({
                        profiles: [{ value: '', display: '(Select your favourite team)' }].concat(profileFromApi)
                    });

                }
            )

        })











        console.log(this.setState.profiles);

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

        if (this.state.users.idUser === "Add") {

            users = {
                idProfile: this.state.selectedIdprofile,
                userAlias: values.userAlias,
                password: values.password
            }
            console.log("Add =>");
            console.log(users);
            UsersDataService.createUser(users)
                .then(() => this.props.history.push('/users'))
        } else {

            users = {
                idUser: this.state.users.idUser,
                idProfile: this.state.selectedIdprofile,
                userAlias: values.userAlias,
                password: values.password
            }
            console.log("updateUser@@@")
            console.log(users)

            UsersDataService.updateUser(users)
                .then(() => this.props.history.push('/users'))
        }

        //
    }

    cancelUserClicked() {
        this.props.history.push(`/Users`)
    }



    handleChangeBt = (selectedOptions) => {
        console.log(selectedOptions);
    }
    
   


    render() {

        let { idUser, userAlias, password } = this.state.users
        let idProfile = this.state.users.idProfile
        console.log("render");
        console.log(this.state.users);

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
                                            {/* <fieldset className="form-group">
                                                <label>Profile</label>
                                                <Field className="form-control" type="text" name="idProfile" />
                                            </fieldset> */}

                                            {/* <select value={this.state.users.idProfile} name="idProfile"
                                                onChange={(e) => this.setState({ selectedIdprofile : e.target.value })}> */}

                                            <fieldset className="form-group">
                                                <label>Profile</label>
                                                <select className="form-control" value={this.state.selectedIdprofile} name="idProfile"
                                                   onChange={(e) => this.setState({selectedIdprofile: e.target.value})}>
                                                    {this.state.profiles.map((profiles) => <option key={profiles.value} value={profiles.value}>{profiles.display}</option>)}
                                                </select>

                                            
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