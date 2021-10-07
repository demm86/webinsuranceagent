import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Container, Col, Row, Button, ButtonGroup } from "react-bootstrap";
//import HelloWorldService from '../../api/insurance/HelloWorldService.js'
//mport HelloWorldService from '../../api/insurance/HelloWorldService'

class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.state = {
            welcomeMessage: ''
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    render() {
        return (
            <>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}.
                    You can manage your Clients <Link to="/Client">here</Link>.
                </div>
                <div className="container">
        
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
                </Col>
                </Row>


            </>
        )
    }

    retrieveWelcomeMessage() {
        // HelloWorldService.executeHelloWorldService()
        // .then( response => this.handleSuccessfulResponse(response) )

        // HelloWorldService.executeHelloWorldBeanService()
        // .then( response => this.handleSuccessfulResponse(response) )

       // HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        //    .then(response => this.handleSuccessfulResponse(response))
        //    .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response) {
        console.log(response)
        this.setState({ welcomeMessage: response.data.message })
    }

    handleError(error) {

        console.log(error.response)

        let errorMessage = '';

        if (error.message)
            errorMessage += error.message

        if (error.response && error.response.data) {
            errorMessage += error.response.data.message
        }

        this.setState({ welcomeMessage: errorMessage })
    }

}


export default WelcomeComponent