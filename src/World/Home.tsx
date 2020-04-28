import React, {useEffect, useState} from "react";
import {authenticationState} from "../reducers/authenticationReducer";
import {checkAuthentication} from "../Components/CheckAuthentication";
import {WorldWithDetails} from "../Types/World"
import config from "../config.json";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap"
import {Link} from 'react-router-dom';
import "./world.css";
import 'bootstrap/dist/css/bootstrap.min.css';
/*
Overview page
 */

const CreateWorldDialogue = (props: any) => {
    const [worldName, setWorldName] = React.useState("worldName");

    const onWorldNameChange = (event: any) => {
        setWorldName(event.target.value)
    };

    const createWorld = async () => {
        console.log("create world with name: " + worldName);
        await props.createworld(worldName);
        props.onHide();
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
                                    <Button variant="secondary" onClick={createWorld}>Create World</Button>
                                </Form.Group>
                            </Col>

                        </Row>
                    </Container>
                </Form>
            </Modal.Body>
        </Modal>
    )
        ;
};

const Overview = (props: any) => {
    const [ul, setUl] = React.useState(<div/>);
    const [overview, setOverview] = React.useState(<Row>
        <Col>
            <div className={"lds-dual-ring"}/>
        </Col>
    </Row>);
    const [createWorld, setCreateWorld] = React.useState(<div/>);
    const [show, setShow] = useState(false);

    useEffect(() => {
        initialize()
    }, []);

    const initialize = async () => {
        await loadWorlds();
        setCreateWorld(
            <Container fluid={true}>
                <Row className={"world-create-row"} onClick={() => setShow(true)}>
                    + create new world
                </Row>
            </Container>
        );

    };
    const showError = async (msg: string) => {
        console.log(msg);
    };

    const clickCreateWorld = async (worldname: string) => {
        console.log("CREATE REQUEST: titel: "+ worldname  + ", owner: " + authObject.username);
        await RequestCreateWorld(authObject,worldname,showError);
        await initialize();
    };
    /*
        authObject that contains the variables from authentication state.
     */
    const authObject: authenticationState = checkAuthentication();

    /*
    Overview that will show you the world of which you are a writer if you are logged in.
    If not logged in will show you list of most popular world.... NOT IMPLEMENTED FEATURE IN BACKEND so just random worlds for now. //TODO: make a feature where you can check which world is more popular with visitors.
     */

    /**
     * Async method that fills the world of a user
     */
    const deleteWorld = (worldId: string):any =>{
          console.log("DELETEWORLD FUNCTION CALLED: WORLDID: "+worldId);
    };

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let worlds: WorldWithDetails[] = [];

    const loadWorlds = async () => {
        if (authObject.isAuthenticated) {
            await delay(100);
            worlds = await GetWorldsFrom(authObject);
            const listItems = worlds.map((world) =>
                <Row className={"world-info-row"}>
                    <Col lg={2}>
                        {world.title}
                    </Col>
                    <Col lg={3}>
                        {world.owner.name}
                    </Col>
                    <Col lg={5}>
                        <Link to={"/world/details/" + world.worldId}>See Details</Link>
                    </Col>
                    <Col lg={2}>
                        <Button variant={"danger"} type={"button"} onClick={() => deleteWorld(world.worldId)}> delete </Button>
                    </Col>
                </Row>
            );
            setUl(<Container fluid={true}>{listItems}</Container>);
            setOverview(<div></div>);
        } else {
            setOverview(<div>not logged in no personal view</div>)
        }
    };


    return (
        <Container fluid={true} className={"transparent-background"}>
            <CreateWorldDialogue show={show}
                                       onHide={() => setShow(false)}
                                 createworld={clickCreateWorld}
            />
            <Row>
                <Col lg={12}>
                    <Row>
                        <Col lg={2}>
                            <strong>Title</strong>
                        </Col>
                        <Col lg={3}>
                            <strong>Owner</strong>
                        </Col>
                        <Col lg={5}>
                            <strong>Details</strong>
                        </Col>
                        <Col lg={2}>
                            <strong></strong>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col lg={12} className={"world-list"}>
                    {overview}
                    {ul}
                    {createWorld}
                </Col>
            </Row>


        </Container>
    );

    /*
    Returns the world home page.
     */
    // return (
    //     <div>
    //     {overview}
    // </div>);

};

export default Overview;

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

export interface CreateWorldRequest{
    UserId : number,
    Title : string
}

const RequestCreateWorld = async(authObject: authenticationState, worldtitle: string, functionerror: any) : Promise<boolean> => {
    let request: CreateWorldRequest = {
        Title : worldtitle,
        UserId : authObject.id
    };

    let options: RequestInit = {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "default"
    };
    let response = await fetch(config.SERVICES.CREATEWORLD, options);
    console.log(response.status);
    if(response.status === 200) {
        return true;
    }
    else if(response.status === 400){
        await functionerror(await response.text());
        return false;
    }
    else{
        await functionerror("Something went wrong");
        return false;
    }
};