import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Form, Row} from 'react-bootstrap'
import "./Register.css";

const Register = () => {
    return (
        <Container fluid={"lg"}>
            <Row className={"margin-to-mid"}>
                <Col lg={3}></Col>
                <Col lg={6} className={"center-box"}>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out"/>
                        </Form.Group>
                        <Form.Group controlId="">
                            <Button className="btn-default"> Register! </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col lg={3}></Col>
            </Row>
        </Container>
    )
};

export default Register;