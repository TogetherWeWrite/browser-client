import React, {useEffect, useState} from "react";
import {authenticationState} from "../reducers/authenticationReducer";
import {WorldWithDetails, Writer} from "../Types/World"
import config from "../config.json";
import {Button, Col, Container, Form, Modal, Row, Alert} from "react-bootstrap"
import "./world.css";
import {WorldRow} from "./WorldRow";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {UnFollowWorld} from "../ApiFunctions/World/PostUnFollowWorld";
/*
Overview page
 */

const CreateWorldDialogue = (props: any) => {
    const [disabled, setDisabled] = React.useState(false);
    const [worldName, setWorldName] = React.useState("worldName");
    const onWorldNameChange = (event: any) => {
        setWorldName(event.target.value)
    };

    const createWorld = async () => {
        setDisabled(true);
        console.log("create world with name: " + worldName);
        await props.createworld(worldName);
        props.onHide();
        setDisabled(false);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create World
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Container fluid={true}>
                        <Row>
                            <Col xs={9}>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="world titel" onChange={onWorldNameChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Button variant="secondary" disabled={disabled} onClick={createWorld}>create
                                        World</Button>
                                </Form.Group>
                            </Col>

                        </Row>
                    </Container>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

const Overview = (props: any) => {
    const [ul, setUl] = React.useState(<div/>);

    //Html Block of World Overview block Only if loggedin
    const [overview, setOverview] = React.useState(
        <Row>
            <div className={"lds-dual-ring"}/>
        </Row>);
    //Html Block of Create World Button only if loggedin
    const [createWorld, setCreateWorld] = React.useState(<Row>
        <div className={"lds-dual-ring"}/>
    </Row>);
    //Show of Modal of create world Standard false.
    const [show, setShow] = useState(false);

    //Html Block of OverviewHeader only if loggedin.
    const [worldOverviewHeader, setWorldOverviewHeader] = useState(<Row>
        <div className={"lds-dual-ring"}/>
    </Row>);
    const [error, setError] = React.useState(
        <div/>
    );

    useEffect(() => {
        initialize()
    }, []);

    const initialize = async () => {
        await loadWorlds();
        initializeWorldOverviewHeader();
        initiliazeCreateWorldBlock();
    };

    const initiliazeCreateWorldBlock = () => {
        if (authObject.isAuthenticated) {
            setCreateWorld(<Container fluid={true}>
                <Row className={"world-create-row"} onClick={() => setShow(true)}>
                    + create new world
                </Row>
            </Container>);
        } else {
            setCreateWorld(<div/>);
        }
    };

    //Initializer for the header of the overview if not logged in it will show nothing.
    const initializeWorldOverviewHeader = () => {
        if (authObject.isAuthenticated) {
            setWorldOverviewHeader(<Row>
                <Col lg={12} className={"world-list"}>
                    <Container fluid={true}>
                        <Row className={"world-info-row"}>
                            <Col lg={2}>
                                <strong>Title</strong>
                            </Col>
                            <Col lg={3}>
                                <strong>Role</strong>
                            </Col>
                            <Col lg={3}>
                                <strong>Details</strong>
                            </Col>
                            <Col lg={2}>
                                <strong>Grid</strong>
                            </Col>
                            <Col lg={2}>
                                <strong></strong>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>);
        } else {
            setWorldOverviewHeader(<div/>)
        }
    };

    //Method used for showing errors with msg.
    const showError = async (msg: string) => {
        setError(<Alert variant={"warning"} onClick={() => setError(<div/>)}>{msg}</Alert>)
        console.log(msg);//TODO implement correct error function.
    };

    //Method used when submitting a new world, will load the overview again.
    const clickCreateWorld = async (worldname: string) => {
        console.log("CREATE REQUEST: titel: " + worldname + ", owner: " + authObject.username);
        await RequestCreateWorld(authObject, worldname, showError);
        await initialize();
    };

    /*
        authObject that contains the variables from authentication state.
     */
    const authObject: authenticationState = props.authentication;

    /*
    Overview that will show you the world of which you are a writer if you are logged in.
    If not logged in will show you list of most popular world.... NOT IMPLEMENTED FEATURE IN BACKEND so just random worlds for now. //TODO: make a feature where you can check which world is more popular with visitors.
     */

    /**
     * Async method that fills the world of a user
     */
    const deleteWorld = async (worldId: string, worldTitle: string): Promise<any> => {
        console.log("DELETEWORLD FUNCTION CALLED: WORLDID: " + worldId);
        await RequestDeleteWorld(authObject, worldTitle, worldId, showError);
        await initialize();
    };

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let worlds: WorldWithDetails[] = [];

    /**
     * Method used for loading the worlds in and filling the Overview Block and the UL.
     */
    const loadWorlds = async () => {
        if (authObject.isAuthenticated) {
            worlds = await GetWorldsFrom(authObject);
            //step 1 split the list in 3 lists
            // - owner list
            // - writer list
            // follower list, aka remaining
            let worldOwner : WorldWithDetails[] = [];
            let worldWriter: WorldWithDetails[] = [];
            let worldFollower : WorldWithDetails[] = [];
            for(let i : number =0; i < worlds.length;i++){
                let found = false;
                if(worlds[i].owner.id == props.authentication.id){
                    worldOwner.push(worlds[i]);
                    found = true;
                }
                else{
                    if(worlds[i].writers.length > 0) {
                        for (let j: number = 0; j< worlds[i].writers.length; j++) {
                            if (worlds[i].writers[j].id == props.authentication.id) {
                                worldWriter.push(worlds[i]);
                                found = true;
                            }
                        }
                    }
                }
                if(found === false){
                    worldFollower.push(worlds[i]);
                }
            }
            const listItems = worldOwner.map((world) =>//TODO if world.writer does not contain you and you are not the writer make it different because then you are a follower.
                    <Row className={"world-info-row world-row world-owner"}>
                        <Col lg={2}>
                            {world.title}
                        </Col>
                        <Col lg={3}>
                            Owner
                        </Col>
                        <Col lg={3}>
                            <Link to={"/world/details/" + world.worldId}>See Details</Link>
                        </Col>
                        <Col lg={2}>
                            <Link to={"/world/" + world.worldId}>See grid</Link>
                        </Col>
                        <Col lg={2}>
                            <Button variant={"danger"} type={"button"}
                                    onClick={() => deleteWorld(world.worldId, world.title)}> delete </Button>
                        </Col>
                    </Row>
            );
            const listWriterItems = worldWriter.map((world) =>
            <Row className={"world-info-row world-row world-writer"}>
                <Col lg={2}>
                    {world.title}
                </Col>
                <Col lg={3}>
                    Writer
                </Col>
                <Col lg={3}>
                    <Link to={"/world/details/" + world.worldId}>See Details</Link>
                </Col>
                <Col lg={2}>
                    <Link to={"/world/" + world.worldId}>See grid</Link>
                </Col>
                <Col lg={2}>
                </Col>
            </Row>
        );
            const listFollower = worldFollower.map((world) =>
                <Row className={"world-info-row world-row world-follower"}>
                    <Col lg={2}>
                        {world.title}
                    </Col>
                    <Col lg={3}>
                        Follower
                    </Col>
                    <Col lg={3}>
                        <Link to={"/world/details/" + world.worldId}>See Details</Link>
                    </Col>
                    <Col lg={2}>
                        <Link to={"/world/" + world.worldId}>See grid</Link>
                    </Col>
                    <Col lg={2}>
                        <Button onClick={async ()=>{await UnFollowWorld(world.worldId,props.authentication); initialize()}}> Unfollow </Button>
                    </Col>
                </Row>
            );



            setUl(<Container fluid={true}>
                {listItems}
                {listWriterItems}
                {listFollower}</Container>);
            setOverview(<div></div>);
        } else {
            setOverview(<div>not logged in no personal view</div>)
        }
    };

    //Return statement of the home page.
    return (
        <Container fluid={true} className={"transparent-background"}>
            <CreateWorldDialogue show={show}
                                 onHide={() => setShow(false)}
                                 createworld={clickCreateWorld}
            />
            {error}
            {worldOverviewHeader}
            <Row>
                <Col lg={12} className={"world-list"}>
                    {overview}
                    {ul}
                    {createWorld}
                </Col>
            </Row>
        </Container>
    );

};
const mapStateToProps = (state: any) => {
    return {
        authentication: state.authentication
    };
};
export default withRouter(connect(mapStateToProps)(Overview));

//Method used for getting the worlds from a user of which he is the owner or a writer.
const GetWorldsFrom = async (authObject: authenticationState): Promise<WorldWithDetails[]> => {
    var request: string = "?userid=" + authObject.id;
    let options: RequestInit = {
        method: "Get",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "default"
    };

    let response = await fetch(config.SERVICES.GETWORLDSFROMUSER + request, options);
    let body = await response.text();
    return JSON.parse(body);
};

export interface CreateWorldRequest {
    UserId: string,
    Title: string
}

export interface DeleteWorldRequest {
    WorldId: string,
    Title: string,
    UserId: string
}

//Method used for creating a world.
const RequestCreateWorld = async (authObject: authenticationState, worldtitle: string, functionerror: any): Promise<boolean> => {
    let request: CreateWorldRequest = {
        Title: worldtitle,
        UserId: authObject.id
    };

    let options: RequestInit = {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json",
            "Authorization": authObject.token
        },
        mode: "cors",
        cache: "default"
    };
    let response = await fetch(config.SERVICES.CREATEWORLD, options);
    console.log(response.status);
    if (response.status === 200) {
        return true;
    } else if (response.status === 400) {
        await functionerror(await response.text());
        return false;
    } else if (response.status === 401) {
        await functionerror("Not authorised")
        return false;
    } else {
        await functionerror("Something went wrong");
        return false;
    }
};

//Method used for deleting a world.
const RequestDeleteWorld = async (authObject: authenticationState, worldTitle: string, worldId: string, functionerror: any): Promise<boolean> => {
    let request: DeleteWorldRequest = {
        WorldId: worldId,
        Title: worldTitle,
        UserId: authObject.id
    };

    let options: RequestInit = {
        method: "DELETE",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json",
            "Authorization": authObject.token
        },
        mode: "cors",
        cache: "default"
    };

    let response = await fetch(config.SERVICES.CREATEWORLD, options);
    console.log(response.status);
    if (response.status === 200) {
        return true;
    } else if (response.status === 400) {
        await functionerror(await response.text());
        return false;
    } else if (response.status === 401) {
        await functionerror("Not authorised")
        return false;
    } else {
        await functionerror("Something went wrong");
        return false;
    }
};