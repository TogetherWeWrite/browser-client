import React from 'react';
import {withRouter} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from "react-redux";

const Navigation = (props: any) => {
    let showlogin;
    let register;
    let login;
    if (props.authentication.isAuthenticated) {
        showlogin = <Nav.Link href="/">true</Nav.Link>;
        register = <Nav.Link href="/logout">Logout</Nav.Link>
        login = null;
    }
    else{
        showlogin = <Nav.Link href="/">false</Nav.Link>;
        login = <Nav.Link href="/login">Login</Nav.Link>
        register = <Nav.Link href="/register">Register</Nav.Link>

    }

    const home = () => {
        props.history.push("/");
    };

    console.log(props.authentication)
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Nav className="mr-auto">
                    <Nav.Link onClick={home}>Home</Nav.Link>
                    {register}
                    {login}
                    {showlogin}
                </Nav>
            </Navbar>
        </div>
    )
};


const mapStateToProps = (state : any) => {
    return {
        authentication: state.authentication
    };
};
export default withRouter(connect(mapStateToProps)(Navigation));