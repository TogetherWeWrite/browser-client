import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {WorldWithDetails} from "../Types/World";
import config from "../config.json";
import {Form} from "react-bootstrap"

const DetailPage = () => {
    let world: WorldWithDetails;
    const [page, setPage] = React.useState(<div>loading...</div>)
    let {worldid} = useParams();
    const [writersBlock, setWritersBlock] = React.useState(<div>loading.......</div>);

    useEffect(() => {
        loadDetailsOfWorld().then(() => loadWriters());
    }, []);
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
                )
            } catch (exception) {
                console.log(exception);
            }
        }
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
        {page}
        {writersBlock}
    </div>)
};

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