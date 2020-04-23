import React from 'react'
import "./Account.css";
import { withRouter } from 'react-router';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import config from "../config.json";
import {login} from "../Actions/AuthenticationActions";
import {connect} from "react-redux";
import {ResponseUser} from "../Types/ResponseUser";
import {authenticationState} from "../reducers/authenticationReducer";

interface RegisterUser {
    Username: string,
    Password: string
}

const Login = (props: any) => {
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");

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
        let user : ResponseUser = body;
        let newAuthenticationState :authenticationState ={
            isAuthenticated : true,
            id : user.id,
            token : user.token,
            username : user.username
        };
        // props.login(newAuthenticationState);
        localStorage.setItem("auth",JSON.stringify(newAuthenticationState));
        props.history.push("/");
    };

    const showError = (msg : any) =>{
        return;//TODO
    };

    const submitLogin = async (event: any) => {
        if (validate()) {
            let user: RegisterUser = {
                Username: username,
                Password: password
            };

            let options: RequestInit = {
                method: "Post",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                },
                mode: "cors",
                cache: "default"
            };

            let response: Response = await fetch(config.SERVICES.LOGIN, options);
            let body = await response.json();
            if (response.status === 200) {//OK
                successfulLogin(body);
                return;
            }
            else if (response.status === 405){
                showError(body);
                return
            }

        }
        else {
            return;
        }
    };

    return (<Container fluid={"lg"}>
        <Row className={"margin-to-mid"}>
            <Col lg={3}></Col>
            <Col lg={6} className={"center-box"}>
                <Form>
                    <Form.Group>
                        <Form.Label>username</Form.Label>
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

const mapStateToProps = (state : any) => {
    return {
        authentication: state.authentication
    };
};

const mapDispatchToProps = (dispatch : any) => {
    return {
        login: (authstate : authenticationState) => {
            dispatch(login(authstate));
        }
    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));