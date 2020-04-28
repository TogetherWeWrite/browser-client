import React from 'react'
import "./Account.css";
import {withRouter} from 'react-router';
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import config from "../config.json";
import {login} from "../Actions/AuthenticationActions";
import {connect} from "react-redux";
import {ResponseUser} from "../Types/ResponseUser";
import {authenticationState} from "../reducers/authenticationReducer";

interface RegisterUser {
    Id: number,
    Password: string,
    Token: string,
    Username: string
}

const Login = (props: any) => {
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [error, setError] = React.useState(<div/>);

    const onPasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const onUsernameChange = (event: any) => {
        setUsername(event.target.value);
    };

    const validate = (): boolean => {
        return true; //TODO.
    };

    const successfulLogin = async (body: any) => {
        let user: ResponseUser = body;
        let newAuthenticationState: authenticationState = {
            isAuthenticated: true,
            id: user.id,
            token: user.token,
            username: user.username
        };
        console.log(newAuthenticationState);
        // props.login(newAuthenticationState);
        localStorage.setItem("auth", JSON.stringify(newAuthenticationState));
        props.history.push("/world");
    };

    const showError = (msg: string) => {
        setError(<Alert className="alert alert-danger">
            {msg}
        </Alert>);
        return;//TODO
    };

    const submitLogin = async (event: any) => {
        if (validate()) {
            let user: RegisterUser = {
                Username: username,
                Password: password,
                Id: 0,
                Token: ""
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

            try {
                console.log(options.body);
                let response: Response = await fetch(config.SERVICES.LOGIN, options);
                // let body = await response.json();
                let body = await response.text();
                console.log(body);
                if (response.status === 200) {//OK
                    successfulLogin(JSON.parse(body));
                    return;
                } else if (response.status === 400) {//badrequest
                    showError(JSON.stringify(body));
                    return
                }
            } catch (Exception) {
                console.log(Exception);
            }


        } else {
            return;
        }
    };

    return (<Container fluid={"lg"}>
        <Row className={"margin-to-mid"}>
            <Col lg={3}></Col>
            <Col lg={6} className={"white center-box"}>
                <Form>
                    {error}
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={onUsernameChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={onPasswordChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out"/>
                    </Form.Group>
                    <Form.Group controlId="">
                        <Button className="btn-default" onClick={submitLogin}> Login! </Button>
                    </Form.Group>
                </Form>
            </Col>
            <Col lg={3}></Col>
        </Row>
    </Container>)
};

const mapStateToProps = (state: any) => {
    return {
        authentication: state.authentication
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (authstate: authenticationState) => {
            dispatch(login(authstate));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));