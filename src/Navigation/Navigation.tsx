import React from 'react';
import {withRouter} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from "react-redux";

import {authenticationState} from "../reducers/authenticationReducer";

const Navigation = (props: any) => {
    let showlogin;
    let register;
    let login;
    let isAuthenticated: boolean = false;
    let authstring: string = localStorage.getItem("auth") ?? "";
    let authobject :authenticationState;
    if (authstring === "") {
        isAuthenticated = false;
    } else {
        authobject = JSON.parse(authstring);
        isAuthenticated = authobject.isAuthenticated;
    }

    const homepage = () => {
        props.history.push("/");
    };
    const loginpage = () => {
        props.history.push("/login");
    };
    const registerpage = () => {
        props.history.push("/register");
    };
    const logout = () => {
        localStorage.removeItem("auth");
        props.history.push("/login");
    };

    if (isAuthenticated) {
        showlogin = <Nav.Link>Hello {authobject.username}</Nav.Link>;
        register = <Nav.Link onClick={logout}>Logout</Nav.Link>
        login = null;
    } else {
        login = <Nav.Link onClick={loginpage}>Login</Nav.Link>
        register = <Nav.Link onClick={registerpage}>Register</Nav.Link>

    }
    let logo = <Nav><img src="logo.png" alt=""/></Nav>;
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Nav className="mr-auto">
                    {logo}
                    <Nav.Link onClick={homepage}>Home</Nav.Link>
                    {register}
                    {login}
                    {showlogin}
                </Nav>
            </Navbar>
        </div>
    )
};


const mapStateToProps = (state: any) => {
    return {
        authentication: state.authentication
    };
};
export default withRouter(connect(mapStateToProps)(Navigation));