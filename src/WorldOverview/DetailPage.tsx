import React, {useEffect} from 'react';
import {Link, useParams, withRouter} from 'react-router-dom';
import {WorldWithDetails} from "../Types/World";
import config from "../config.json";
import {Alert, Button, Col, Container, Form, Modal, Row} from "react-bootstrap"
import {authenticationState} from "../reducers/authenticationReducer";
import "./world.css";
import {connect} from "react-redux";
import {GetDetailsOfWorld} from "../ApiFunctions/World/GetDetailsOfWorld";
import {GetUserIdFromUsername} from "../ApiFunctions/User/GetUserIdFromUsername";
import {deleteWriterFromWorld} from "../ApiFunctions/Writer/DeleteWriterFromWorld";
import {AddWriterToWorld} from "../ApiFunctions/Writer/AddWriterToWorld";
import {GetStoriesOfWorld} from "../ApiFunctions/World/GetStoriesOfWorld";
import {WorldWithStories} from "../Types/RequestModels/WorldWithStories";
import {StoryRef} from "../Types/RequestModels/StoryRef";
import {PostCreateStory} from "../ApiFunctions/Story/PostCreateStory";

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

const AddStoryDialogue = (props: any) => {
    const [disabled, setDisabled] = React.useState(false);
    const [error, setError] = React.useState(<div/>);
    let title: string = "";

    const showError = async (message: any) => {
        setError(<Row><Alert variant={"danger"}>{message}</Alert></Row>)
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
                                <Form.Control type="text" placeholder="Story Title" onChange={(event: any) => {
                                    title = event.target.value
                                }}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Button variant="secondary" onClick={() => props.addStory(title)} disabled={disabled}>Create
                                    Story</Button>
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </Modal.Body>
    </Modal>);

};

const DetailPage = (props: any) => {
        const [error, setError] = React.useState(<div/>);
        const [stories, setStories] = React.useState<JSX.Element>(<></>);

        let world: WorldWithDetails;
        const [page, setPage] = React.useState(<div>loading...</div>)
        let {worldid} = useParams();
        const [writersBlock, setWritersBlock] = React.useState(<div>loading.......</div>);
        const [addWriterBlock, setAddWriterBlock] = React.useState(<div className={"lds-dual-ring"}/>);
        let isOwner: boolean = false;
        let authObject: authenticationState = props.authentication;
        const addStoryButton = <Button onClick={() => {
            setShowStoryDialogue(true)
        }}>Add Story</Button>
        const [show, setShow] = React.useState(false);
        const [showStoryDialogue, setShowStoryDialogue] = React.useState(false);

        let worldWithStories: WorldWithStories;


        useEffect(() => {
            loadDetailsOfWorld();
            loadStoriesOfWorld();
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
                                    <h2><Form.Label>{world.title}</Form.Label></h2>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Made by: {world.owner.name}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>See <Link to={"/world/" + worldid}>grid</Link></Form.Label>
                                </Form.Group>
                            </Form>
                        </div>
                    );
                    authObject = props.authentication;
                    checkOwner();
                    setAddWriterButtonBlock();
                    loadWriters();
                } catch (exception) {
                    setError(<Alert variant={"warning"} onClick={() => setError(<></>)}>{exception.message}</Alert>)
                }
            }
        };
        //loads stories of world
        const loadStoriesOfWorld = async () => {
            if (worldid) {
                try {
                    worldWithStories = await GetStoriesOfWorld(worldid);
                    let html = worldWithStories.stories.map((story: StoryRef) => <li><Link
                        to={"/world/story/" + story.id}>{story.title}</Link></li>)
                    setStories(<ul>{html}</ul>);
                } catch (exception) {
                    setError(<Alert variant={"warning"} onClick={() => setError(<></>)}>{exception.message}</Alert>)
                }
            }
        };

        const clickAddWriter = async (writerId: string): Promise<boolean> => {
            if (worldid) {
                var result: boolean = await AddWriterToWorld(authObject, worldid, writerId);
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

        const clickAddStory = async (title: string): Promise<boolean> => {
            if (worldid) {

                console.log(title);
                let newStory = await PostCreateStory(worldid, title, props.authentication);
                await loadStoriesOfWorld();
                setShowStoryDialogue(false);
                return true;
            } else {
                return false;
            }
        };

        const deleteWriter = async (writerid: string) => {
            if (worldid) {
                var result: boolean = await deleteWriterFromWorld(authObject, worldid, writerid);
                if (result) {
                    refresh();
                }
            }
        };

        const refresh = async () => {
            if (worldid) {
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
            }
        };

        return (<Container fluid={true}>
            {error}
            <AddWriterDialogue show={show}
                               onHide={() => setShow(false)}
                               addWriter={clickAddWriter}/>
            <AddStoryDialogue
                show={showStoryDialogue}
                onHide={() => setShowStoryDialogue(false)}
                addStory={clickAddStory}
            />
            <Row>
                <Col lg={3} className={"world-info-collumn"}>
                    {page}
                    {writersBlock}
                    {addWriterBlock}
                </Col>
                <Col lg={3}>
                    <h2>Stories</h2>
                    {stories}
                    {addStoryButton}
                </Col>
            </Row>
        </Container>)
    }
;
const mapStateToProps = (state: any) => {
    return {
        authentication: state.authentication
    };
};

export default withRouter(connect(mapStateToProps)(DetailPage));
