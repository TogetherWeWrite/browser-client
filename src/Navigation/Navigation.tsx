import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from "react-redux";
import {checkAuthentication} from "../Components/CheckAuthentication"

import {authenticationState} from "../reducers/authenticationReducer";

const Navigation = (props: any) => {

    useEffect( () => {
        UpdateNavigation()
    }, [])
    /*
    Navigation part of register and when logged in it will show logout
     */
    const [register, setRegister] = React.useState(<div></div>);

    /*
    Navigation part of login
     */
    const [login, setLogin] = React.useState(<div></div>);

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

    /**
     * Navigation function that will push to "/login". and clean localstorage so you will be logged out.
     */
    const logout = () => {
        localStorage.removeItem("auth");
        props.history.push("/login");
    };

    /*
    Constant world Navigation part. will go to the /world tab
     */
    const world = <Nav.Link onClick={worldNav}>Browse Worlds</Nav.Link>;

    /*
     *  authObject that has the info of the player <TYPE: authentiticationState>
     */
    let authobject: authenticationState = checkAuthentication();


    /**
     * updatenav will check the authentication status and update the navigation accordingly.
     * @function
     */
    const UpdateNavigation = async () => {
        console.log("update nav")
        authobject = checkAuthentication();
        if (authobject.isAuthenticated) {
            setRegister(<Nav.Link onClick={logout}>Logout</Nav.Link>);
            setLogin( <Navbar.Text>
                Signed in as: {authobject.username}
            </Navbar.Text>);

        } else {
            setLogin(<Nav.Link onClick={loginpage}>Login</Nav.Link>);
            setRegister(<Nav.Link onClick={registerpage}>Register</Nav.Link>);
        }
    };


    return (
        <Navbar bg="light">
            <Nav.Link onClick={homepage}>My Worlds</Nav.Link>
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