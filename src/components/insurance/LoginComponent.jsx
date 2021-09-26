import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import { Form, Container, Col, Row, Button, ButtonGroup } from "react-bootstrap";
class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'dmontes',
            password: 'password',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        // this.handleUsernameChange = this.handleUsernameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        //console.log(this.state);
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    // handleUsernameChange(event) {
    //     console.log(event.target.name);
    //     this.setState(
    //         {
    //             [event.target.name]
    //               :event.target.value
    //         }
    //     )
    // }

    // handlePasswordChange(event) {
    //     console.log(event.target.value);
    //     this.setState({password:event.target.value})
    // }

    loginClicked() {


        console.log("token");
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                console.log("token >> " + response.data.jwttoken);
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.jwttoken)
                this.props.history.push(`/welcome/${this.state.username}`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })

    }

    render() {
        return (




            <div>



{/* 
                <h1>Login</h1>
                <div className="container-fluid " style={{ textAlign: "center" }}>
          
                    <p>User Name:</p>

                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    <hr />
                    <p>
                        Password: </p>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <hr />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div> */}

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Login</h1>
                        {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                        {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                        <Form > 

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>User</Form.Label>
                                <Form.Control name="username" type="text" value={this.state.username} onChange={this.handleChange} placeholder="Enter email" />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password"  type="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                            </Form.Group>
                            <Button className="pull-right" variant="primary"  onClick={this.loginClicked}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default LoginComponent