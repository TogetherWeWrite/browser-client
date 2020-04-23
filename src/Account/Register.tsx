import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button, Col, Container, Form, Row} from 'react-bootstrap'
import "./Account.css";
import config from "../config.json";

interface RegisterUser {
    Username: string,
    Password: string
}

const Register = (props: any) => {
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [repeatPassword, setRepeatPassword] = React.useState("");
    const [error, setError] = React.useState(<div/>);

    let errormsg = "";

    const onPasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const onUsernameChange = (event: any) => {
        setUsername(event.target.value);
    };

    const onRepeatPasswordChange = (event: any) => {
        setRepeatPassword(event.target.value);
    };

    const validate = () : boolean => {
        if (repeatPassword !== password) {
            showError("Password and repeat password are not the same");
            console.log(errormsg);
            return false;
        }
        if (password.length < 8) {
            showError("Password must have 8 or more characters ");
            console.log(errormsg);
            return false;
        }
        if (username.length < 3) {
            showError("Username does not have more than 3 characters");
            console.log(errormsg);
            return false;
        }
        return true;
    };

    const hideError = () => {
        setError(<div/>);
    };

    const showError = (error: string) => {
        setError(<Alert className="alert alert-danger">
            {error}
        </Alert>);
    };

    const showRegistrationSucces = () => {
        props.history.push("/login");
    };

    const sumbitRegister = async (event: any) => {
        if (validate()) {
            let user: RegisterUser = {
                Username: username,
                Password: password
            };

            let options: RequestInit = {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                },
                mode: "cors",
                cache: "default"
            };
            let response: Response = await fetch(config.SERVICES.REGISTER, options)
            if (response.status === 200) {
                showRegistrationSucces();
                return;
            } else if (response.status === 400) {
                let body = await response.text();
                showError(body);
            }
        } else {
            return;
        }
    };




    return (
        <Container fluid={"lg"}>
            <Row className={"margin-to-mid"}>
                <Col lg={3}></Col>
                <Col lg={6} className={"white center-box"}>
                    <Form>
                        <div id="alert"></div>
                        {error}
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={onUsernameChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={onPasswordChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>repeat password</Form.Label>
                            <Form.Control type="password" placeholder="repeat Password"
                                          onChange={onRepeatPasswordChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out"/>
                        </Form.Group>
                        <Form.Group controlId="">
                            <Button className="btn-default" onClick={sumbitRegister}> Register! </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col lg={3}></Col>
            </Row>
        </Container>
    )
};

export default Register;