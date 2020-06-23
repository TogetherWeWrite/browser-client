import React, {useEffect} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {JSXElement} from "@babel/types";
import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";
import "./home.css";

const Home = (props: any) => {
    const [releaseNotesBlock, setReleaseNotesBlock] = React.useState(<div/>);
    const [infoApplicationBlock, setInfoApplicationBlock] = React.useState(<div/>);

    useEffect(() => {
        setReleaseNotesBlock(
            <div>
                <Container style={{overflowY: 'scroll', height: '550px', textAlign: 'left'}}>
                    <h2>
                        Release notes
                    </h2>
                    <h5>
                        In the release notes you can find everything that has been added throughout the development of together we write
                    </h5>
                    <ul>
                        <h3>version 1.0.0</h3>
                        <p>
                            The first stable version of together we write
                        </p>
                        <ul className={"feature-list"}>
                            <h4>Features</h4>
                            <li>Register account</li>
                            <li>Login on your registerd account</li>
                            <li>See your worlds</li>
                            <li>Create a world</li>
                            <li>See popular worlds</li>
                            <li>Follow A world</li>
                            <li>Unfollow A World</li>
                            <li>See your worlds also includes worlds of which you are a writer</li>
                            <li>Add Writers to your world</li>
                            <li>See your worlds also includes worlds which you follow</li>
                            <li>See your worlds shows the role that you have in that world</li>
                            <li>Grid representation of the world</li>
                            <li>Create a chunk in the grid</li>
                            <li>Open a chunk in a grid</li>
                            <li>Edit a chunk in a grid</li>
                            <li>Change the color of a cell within a chunk</li>
                            <li>Add a new story to your world</li>
                            <li>Add a page to your story</li>
                        </ul>
                        <ul>
                            <h4>Bug fixes</h4>
                            <p>First version bug fixes were not documented</p>
                        </ul>
                    </ul>
                </Container>
            </div>
        );
        setInfoApplicationBlock(
            <div style={{marginTop: '50px', marginBottom: '50px', textAlign: 'center'}}>
                <p>
                    Together we write is an application that is inspired by epic fantasy books. These books are take
                    place in one universe which can be huge.
                </p>
                <p>
                    What this application is trying to accomplish is that you can combine all these books, the entire
                    universe and its lore into one world on the internet. With other people
                </p>
            </div>
        )
    }, []);

    let account = props.authentication;
    if (account.isAuthenticated) {
        return (
            <Container  className={"gradient-home-background"} style={{marginTop: '30px', boxShadow: '5px 6px 50px #888888'}}>
                <div style={{textAlign: 'center'}}>
                    <h4>Hello : {account.username}</h4>
                </div>
                {infoApplicationBlock}
                {releaseNotesBlock}
            </Container>
        );
    } else {
        return (
            <Container className={"gradient-home-background"} style={{marginTop: '30px', boxShadow: '5px 6px 50px #888888'}}>
                <div style={{marginTop: '50px', marginBottom: '50px', textAlign: 'center'}}>
                    <p>
                        Hello Guest
                    </p>
                    <p>
                        Already have an account click <Link to={'/login'}>here</Link> to login.
                    </p>
                    <p>
                        Want to register click <Link to={'register'}>here</Link>.
                    </p>
                </div>
                {infoApplicationBlock}
                {releaseNotesBlock}
            </Container>
        );
    }
};


const mapStateToProps = (state: any) => {
    return {
        authentication: state.authentication
    };
};

export default withRouter(connect(mapStateToProps)(Home));