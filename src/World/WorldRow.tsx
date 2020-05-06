import {WorldWithDetails} from "../Types/World";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

export const WorldRow = (world: WorldWithDetails) => {
    return (<Row className={"world-info-row"}>
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
                {/*<Button variant={"danger"} type={"button"}*/}
                {/*        onClick={() => deleteWorld(world.worldId, world.title)}> delete </Button>*/}
            </Col>
        </Row>
    )
};
