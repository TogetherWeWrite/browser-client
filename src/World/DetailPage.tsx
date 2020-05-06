import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {WorldWithDetails} from "../Types/World";
import config from "../config.json";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap"
import {authenticationState} from "../reducers/authenticationReducer";
import {checkAuthentication} from "../Components/CheckAuthentication";

/**
 * Dialogue of Adding A writer by name.
 * @param props contains the following
 * Method [addWriter] this method will be used clicking on the button addWriter
 * show: boolean which contains the state of the modal showing.
 * Method: [onHide(boolean)] which will be used when hiding the object.
 */
const AddWriterDialogue = (props: any) => {

    let writerName: string = "";

    const changeWriterName = (event: any) => {
        writerName = event.target.value;
    };

    const addWriter = async () => {
        let success = await props.addWriter(writerName);
        if (success) {
            props.onHide();
        } else {
            props.ShowError();
        }
    };

    return (<Modal
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
                                <Form.Control type="text" placeholder="Writer name" onChange={changeWriterName}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Button variant="secondary" onClick={addWriter}>Add Writer</Button>
                            </Form.Group>
                        </Col>

                    </Row>
                </Container>
            </Form>
        </Modal.Body>
    </Modal>);
};

const DetailPage = () => {
        let world: WorldWithDetails;
        const [page, setPage] = React.useState(<div>loading...</div>)
        let {worldid} = useParams();
        const [writersBlock, setWritersBlock] = React.useState(<div>loading.......</div>);
        const [addWriterBlock, setAddWriterBlock] = React.useState(<div className={"lds-dual-ring"}/>);
        let isOwner: boolean = false;
        let authObject: authenticationState;

        const [show,setShow] = React.useState(false);


        useEffect(() => {
            loadDetailsOfWorld().then(() => loadWriters());
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
                    authObject = checkAuthentication();
                    checkOwner();
                    setAddWriterButtonBlock();
                } catch (exception) {
                    console.log(exception);
                }
            }
        };

        const clickAddWriter = async (writerName: string) : Promise<boolean> =>{
            console.log(writerName);
            return true;
        };

        const loadWriters = async () => {
            if (world) {
                const writers = world.writers.map((writer) =>
                    <Form>
                        <Form.Group>
                            <Form.Label>Writer: {writer.name}</Form.Label>
                        </Form.Group>
                    </Form>
                );
                setWritersBlock(<div className={"writer-list"}>{writers}</div>);
                console.log(writers)
            }
        };

        return (<div>
            <AddWriterDialogue show={show}
                               onHide={() => setShow(false)}
                               addWriter={clickAddWriter}/>
            {page}
            {writersBlock}
            {addWriterBlock}
        </div>)
    }
;

export default DetailPage;

const GetDetailsOfWorld = async (worldId: string): Promise<WorldWithDetails> => {
    var request: string = "?id=" + worldId;
    let options: RequestInit = {
        method: "Get",
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