import React, { Component } from 'react'
import { Container, Col, Row, Button, ButtonGroup } from "react-bootstrap";
class FooterComponent extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col md={{ span: 12 }}>
                        <footer className="footer">
                            <span className="text-muted">All Rights Reserved 2021</span>
                        </footer>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default FooterComponent