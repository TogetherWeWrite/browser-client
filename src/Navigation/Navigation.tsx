import React from 'react';
import {withRouter} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const Navigation = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                    <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                    </Nav>
            </Navbar>
        </div>
    )
}

export default withRouter((Navigation));