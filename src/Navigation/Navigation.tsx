import React, {useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from "react-redux";

import {authenticationState} from "../reducers/authenticationReducer";
import {login, logout} from "../Actions/AuthenticationActions";

const Navigation = (props: any) => {

    useEffect( () => {
        UpdateNavigation()
    }, [props.authentication]);
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
        props.history.push("/browseworlds");
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
        props.logout();
    };

    /*
    Constant world Navigation part. will go to the /world tab
     */
    const world = <Nav.Link onClick={worldNav}>Browse Worlds</Nav.Link>;

    /*
     *  authObject that has the info of the player <TYPE: authentiticationState>
     */
    useEffect( () => {
        UpdateNavigation()
    }, [props.authentication]);

    /**
     * updatenav will check the authentication status and update the navigation accordingly.
     * @function
     */
    const UpdateNavigation = async () => {
        if (props.authentication.isAuthenticated) {
            var username = props.authentication.username;
            setRegister(<Nav.Link onClick={logout}>Logout</Nav.Link>);
            setLogin( <Navbar.Text>
                Signed in as: {username}
            </Navbar.Text>);

        } else {
            setLogin(<Nav.Link onClick={loginpage}>Login</Nav.Link>);
            setRegister(<Nav.Link onClick={registerpage}>Register</Nav.Link>);
        }
    };


    return (
        <Navbar bg="light">
            <Nav.Link><Link to={"/home"}> Home </Link></Nav.Link>
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

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => {
            dispatch(logout());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));