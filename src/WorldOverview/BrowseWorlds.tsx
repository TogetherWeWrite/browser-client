import React, {useEffect} from "react";
import config from "../config.json";
import {WorldWithFollowers} from "./WorldWithFollowers";
import {Row, Col, Button, Alert} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "./browseworlds.css";
import {authenticationState} from "../reducers/authenticationReducer";
import {Writer} from "../Types/World";
import {FollowWorldModel} from "./FollowWorldModel";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {UnFollowWorld} from "../ApiFunctions/World/PostUnFollowWorld";
import {FollowWorld} from "../ApiFunctions/World/PostFollowWorld";
import {GetWorldsSortedByPopularity} from "../ApiFunctions/World/GetWorldsSortedByPopularity";

const BrowseWorlds = (props: any) => {
    const [page, setPage] = React.useState(1); //Page number, page contains 25 worlds
    let worlds: WorldWithFollowers[] = []; //worlds list used for rendering the worldblock.
    const [topOfOverviewBock, setTop] = React.useState(<div/>);
    const [worldBlock, setWorldBlock] = React.useState(<div/>); //html block that contains the worlds, title, owner, amount of followers
    const [error, setError] = React.useState(<div/>); //error block that contains an error when it occurs
    //@ts-ignore
    const [authObject, setAuthObject] = React.useState(props.authentication);
    const [pageSelector, SetPageSelector] = React.useState(<div/>)

    //Get Worlds when page number changes
    // @ts-ignore
    useEffect(() => {
        const initialize = async () => {
            try {

                worlds = await GetWorldsSortedByPopularity(page);
            } catch (Error) {
                setError(<Alert variant={"warning"} className={"warning-dissmisable"}
                                onClick={() => setError(<div/>)}>{Error.message}</Alert>)
            }
        };
        const FollowButton = (id: string, auth: authenticationState, followers: Writer[]) => {
            if (auth.isAuthenticated) {
                let alreadyFollowed = false;
                console.log(JSON.stringify(followers));
                followers.forEach((follower) => {
                   if(follower.id === auth.id){
                       alreadyFollowed = true;
                   }
                });
                console.log(alreadyFollowed);
                if (!alreadyFollowed) {
                    return (
                        <Button onClick={async () => {
                            try {
                                await FollowWorld(id, auth);
                                worlds = await GetWorldsSortedByPopularity(page);
                                loadDynamicHtml();
                            } catch (Exception) {
                                setError(<Alert variant={"warning"} className={"warning-dissmisable"}
                                                onClick={() => setError(<div/>)}>{Exception.message}</Alert>)
                            }
                        }}>Follow</Button>
                    );
                } else {
                    return (
                        <Button onClick={async () => {
                            try {
                                await UnFollowWorld(id, auth)
                                worlds = await GetWorldsSortedByPopularity(page);
                                loadDynamicHtml();
                                setPage(page);
                            } catch (Exception) {
                                setError(<Alert variant={"warning"} className={"warning-dissmisable"}
                                                onClick={() => setError(<div/>)}>{Exception.message}</Alert>)
                            }
                        }}>Unfollow</Button>);
                }
            }
        };

        const loadNonDynamicHtml = async () => {
            setTop(
                <Row className={"overview-row"}>
                    <Col lg={2}>
                        Title
                    </Col>
                    <Col lg={2}>
                        Owner
                    </Col>
                    <Col lg={1}>
                        Amount of followers
                    </Col>
                    <Col>

                    </Col>
                </Row>
            );
        };

        const loadDynamicHtml = () => {
            const worldsHtml = worlds.map((world: WorldWithFollowers) =>
                <Row className={"overview-row"}>
                    <Col lg={2}>
                        {world.title}
                    </Col>
                    <Col lg={2}>
                        {world.owner.name}
                    </Col>
                    <Col lg={1}>
                        {world.followers.length}
                    </Col>
                    <Col>
                        {FollowButton(world.worldId, authObject, world.followers)}
                    </Col>
                </Row>
            );
            setWorldBlock(<div>{worldsHtml}</div>);
            if (page >= 2) {
                SetPageSelector(
                    <Row className={"navigation-row"}>
                        <Col className={"text-left navigation-button"}>
                            <Button onClick={() => {
                                setPage(page - 1)
                            }}>Prev</Button>
                        </Col>
                        <Col className={"text-center"}>
                            <strong>
                                Current page:{page}
                            </strong>
                        </Col>
                        <Col className={"text-right navigation-button"}>
                            <Button onClick={() => {
                                setPage(page + 1)
                            }}>Next</Button>
                        </Col>
                    </Row>
                )
            } else {
                SetPageSelector(
                    <Row className={"navigation-row"}>
                        <Col className={"text-left navigation-button"}>
                            <Button disabled>Prev</Button>
                        </Col>
                        <Col className={"text-center"}>
                            <strong>
                                Current page:{page}
                            </strong>
                        </Col>
                        <Col className={"text-right navigation-button"}>
                            <Button onClick={() => {
                                setPage(page + 1)
                            }}>Next</Button>
                        </Col>
                    </Row>
                );
            }
        };
        loadNonDynamicHtml();

        initialize().then(() => {
            loadDynamicHtml()
        })
    }, [page]);


    return (
        <Container fluid={true}>
            {error}
            {topOfOverviewBock}
            {pageSelector}
            {worldBlock}

        </Container>
    )
};
const mapStateToProps = (state: any) => {
    return {
        authentication: state.authentication
    };
};

export default withRouter(connect(mapStateToProps)(BrowseWorlds));