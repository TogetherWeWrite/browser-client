import React from 'react';
import {withRouter} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from "react-redux";
import {checkAuthentication} from "../Components/CheckAuthentication"

import {authenticationState} from "../reducers/authenticationReducer";

const Navigation = (props: any) => {
    /*
    Navigation part of register and when logged in it will show logout
     */
    let register;

    /*
    Navigation part of login
     */
    let login;

    /*
    Navigation function that will push to "/world".
     */
    const worldNav = () => {
        props.history.push("/world");
    };

    /*
        Navigation function that will push to "/".
     */
    const homepage = () => {
        props.history.push("/");
    };

    /*
    Navigation function that will push to "/login".
     */
    const loginpage = () => {
        props.history.push("/login");
    };

    /*
    Navigation function that will push to "/register".
     */
    const registerpage = () => {
        props.history.push("/register");
    };
    /*
    Navigation function that will push to "/login".
    and clean localstorage so you will be logged out.
     */
    const logout = () => {
        localStorage.removeItem("auth");
        props.history.push("/login");
    };

    /*
    Constant world Navigation part. will go to the /world tab
     */
    const world = <Nav.Link onClick={worldNav}>Worlds</Nav.Link>;

    /*
     *  authObject that has the info of the player <TYPE: authentiticationState>
     */
    let authobject: authenticationState = checkAuthentication();


    /**
     * updatenav will check the authentication status and update the navigation accordingly.
     */
    const UpdateNavigation = () => {
        authobject = checkAuthentication();
        if (authobject.isAuthenticated) {
            register = <Nav.Link onClick={logout}>Logout</Nav.Link>
            login = <Navbar.Text>
                Signed in as: {authobject.username}
            </Navbar.Text>;

        } else {
            login = <Nav.Link onClick={loginpage}>Login</Nav.Link>
            register = <Nav.Link onClick={registerpage}>Register</Nav.Link>
        }
    };

    UpdateNavigation();
    return (
        <Navbar bg="light">
            <Nav.Link onClick={homepage}>Home</Nav.Link>
            {world}
            <Navbar.Collapse className="justify-content-end">
                {register}
                {login}
            </Navbar.Collapse>
        </Navbar>
    )
};


const mapStateToProps = (state: any) => {
    return {
        authentication: state.authentication
    };
};

export default withRouter(connect(mapStateToProps)(Navigation));