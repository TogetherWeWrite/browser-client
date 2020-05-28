import React, {useEffect} from 'react';
import {useParams, withRouter} from 'react-router-dom';
import {WorldWithDetails} from "../Types/World";
import config from "../config.json";
import {Alert, Button, Col, Container, Form, Modal, Row} from "react-bootstrap"
import {authenticationState} from "../reducers/authenticationReducer";
import "./world.css";
import {connect} from "react-redux";

/**
 * Dialogue of Adding A writer by name.
 * @param props contains the following
 * Method [addWriter] this method will be used clicking on the button addWriter
 * show: boolean which contains the state of the modal showing.
 * Method: [onHide(boolean)] which will be used when hiding the object.
 */
const AddWriterDialogue = (props: any) => {
    const [disabled, setDisabled] = React.useState(false);
    let writerName: string = "";
    const [error, setError] = React.useState(<div/>);

    const changeWriterName = (event: any) => {
        writerName = event.target.value;
    };

    const showError = async (message: any) => {
        setError(<Row><Alert variant={"danger"}>{message}</Alert></Row>)
    };

    const addWriter = async () => {
        try {
            setDisabled(true);
            let userId: string = await GetUserIdFromUsername(writerName);
            console.log(userId);
            let success = await props.addWriter(userId);
            if (success) {
                props.onHide();
            } else {
                showError("Failed to add writer");
            }
        } catch (ex) {
            showError(ex);
        }
        setDisabled(false);
    };

    return (<Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Add Writer
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Container fluid={true}>
                    {error}
                    <Row>
                        <Col xs={9}>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Writer name" onChange={changeWriterName}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Button variant="secondary" disabled={disabled} onClick={addWriter}>Add Writer</Button>
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </Modal.Body>
    </Modal>);
};

const DetailPage = (props: any) => {
        let world: WorldWithDetails;
        const [page, setPage] = React.useState(<div>loading...</div>)
        let {worldid} = useParams();
        const [writersBlock, setWritersBlock] = React.useState(<div>loading.......</div>);
        const [addWriterBlock, setAddWriterBlock] = React.useState(<div className={"lds-dual-ring"}/>);
        let isOwner: boolean = false;
        let authObject : authenticationState=props.authentication;

        const [show, setShow] = React.useState(false);


        useEffect(() => {
            loadDetailsOfWorld();
        }, []);


        const checkOwner = () => {
            if (authObject.id === world.owner.id) {
                isOwner = true;
            }
        };

        const setAddWriterButtonBlock = async () => {
            if (isOwner) {
                setAddWriterBlock(<Button onClick={() => setShow(true)}>Add Writer!</Button>)
            } else {
                setAddWriterBlock(<div/>)
            }
        };

        const loadDetailsOfWorld = async () => {
            if (worldid) {
                try {
                    world = await GetDetailsOfWorld(worldid);
                    setPage(
                        <div>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Title: {world.title}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Made by: {world.owner.name}</Form.Label>
                                </Form.Group>
                            </Form>
                        </div>
                    );
                    authObject = props.authentication;
                    checkOwner();
                    setAddWriterButtonBlock();
                    loadWriters();
                } catch (exception) {
                    console.log(exception);
                }
            }
        };

        const clickAddWriter = async (writerId: string): Promise<boolean> => {
            console.log("adding writer" + writerId)
            if (worldid) {
                var result: boolean = await AddWriterToWorld(authObject,worldid, writerId);
                if (result) {
                    refresh();
                    return true;
                } else {
                    return false;
                }
            }
            refresh();
            return false;

        };

        const deleteWriter = async (writerid: string) => {
            if (worldid) {
                var result: boolean = await deleteWriterFromWorld(authObject,worldid, writerid);
                if (result) {
                    refresh();
                }
            }
        };

        const refresh = async () => {
            if (worldid) {
                console.log("refreshing");
                await loadDetailsOfWorld();
            }

        };

        const loadWriters = async () => {
            if (world) {
                const writers = world.writers.map((writer) =>
                    <Row>
                        <Col lg={5}>
                            <Row className="writer-in-detailpage">
                                <Col lg={"8"}>
                                    <Form.Label>Writer: {writer.name}</Form.Label>
                                </Col>
                                <Col lg={"auto"}>

                                </Col>
                                <Col lg={"1"}>
                                    <Button variant={"danger"} onClick={() => deleteWriter(writer.id)}>Delete</Button>
                                </Col>
                            </Row>

                        </Col>

                    </Row>
                );
                setWritersBlock(<div className={"writer-list"}>{writers}</div>);
                console.log(writers)
            }
        };

        return (<Container fluid={true}>
            <AddWriterDialogue show={show}
                               onHide={() => setShow(false)}
                               addWriter={clickAddWriter}/>
            {page}
            {writersBlock}
            {addWriterBlock}
        </Container>)
    }
;
const mapStateToProps = (state: any) => {
    return {
        authentication: state.authentication
    };
};

export default withRouter(connect(mapStateToProps)(DetailPage));

export const GetDetailsOfWorld = async (worldId: string): Promise<WorldWithDetails> => {
    var request: string = "?id=" + worldId;
    let options: RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "default"
    };

    let response = await fetch(config.SERVICES.GETWORLDDETAILS + request, options);
    let body = await response.text();
    return JSON.parse(body);
};

export const GetUserIdFromUsername = async (username: string): Promise<string> => {
    var request: string = "?username=" + username;
    let options: RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "default"
    };
    let response: Response = await fetch(config.SERVICES.GETACCOUNTIDFROMUSERNAME + request, options);
    if (response.status === 200) {
        let body = await response.text();
        body = body.replace('"', '');
        body = body.replace('"', '');
        console.log(body);
        return body;
    } else if (response.status === 500) {
        throw await response.text();
    } else {
        throw 'User with username: ' + username + ', does not exist.';
    }

};

export interface AddWriterRequest {
    WriterId: string
    WorldId: string
}

export const AddWriterToWorld = async (authObject : authenticationState, worldId: string, writerId: string) => {
    console.log(writerId)
    console.log(worldId)
    var requestobj: AddWriterRequest = {
        WorldId: worldId,
        WriterId: writerId
    };
    console.log(JSON.stringify(requestobj));
    let options: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : authObject.token
        },
        body: JSON.stringify(requestobj),
        mode: "cors",
        cache: "default"
    };
    let response: Response = await fetch(config.SERVICES.ADDWRITERTOWORLD, options);
    if (response.status === 200) {
        return true;
    } else if (response.status === 500) {
        throw await response.text();
    } else {
        return false;
    }
};

export const deleteWriterFromWorld = async (authObject : authenticationState, worldId: string, writerId: string): Promise<boolean> => {
    var requestobj: AddWriterRequest = {
        WorldId: worldId,
        WriterId: writerId
    };

    let options: RequestInit = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : authObject.token
        },
        body: JSON.stringify(requestobj),
        mode: "cors",
        cache: "default"
    };

    let response: Response = await fetch(config.SERVICES.ADDWRITERTOWORLD, options);
    if (response.status === 200) {
        return true;
    } else if (response.status === 500) {
        throw await response.text();
    } else {
        return false;
    }
};
