import React, {useEffect} from "react";
import config from "../config.json";
import {WorldWithFollowers} from "./WorldWithFollowers";
import {Row, Col, Button, Alert} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "./browseworlds.css";
import {checkAuthentication} from "../Components/CheckAuthentication";
import {authenticationState} from "../reducers/authenticationReducer";
import {Writer} from "../Types/World";
import {FollowWorldModel} from "./FollowWorldModel";


const BrowseWorlds = (props: any) => {
    const [page, setPage] = React.useState(1); //Page number, page contains 25 worlds
    let worlds: WorldWithFollowers[] = []; //worlds list used for rendering the worldblock.
    const [topOfOverviewBock, setTop] = React.useState(<div/>);
    const [worldBlock, setWorldBlock] = React.useState(<div/>); //html block that contains the worlds, title, owner, amount of followers
    const [error, setError] = React.useState(<div/>); //error block that contains an error when it occurs
    const [authObject, setAuthObject] = React.useState(checkAuthentication);
    const [pageSelector, SetPageSelector] = React.useState(<div/>)

    //Get Worlds when page number changes
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
                                await FollowWorld(id, auth)
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
export default BrowseWorlds;


export async function GetWorldsSortedByPopularity(page: number): Promise<WorldWithFollowers[]> {
    let request: string = "?page=" + page.toString();

    let options: RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "default"
    };

    let response = await fetch(config.SERVICES.POPULARLIST + request, options);
    if (response.status === 200) {
        return JSON.parse(await response.text());
    } else {
        throw new Error(await response.text())
    }
}

export async function FollowWorld(id: string, auth: authenticationState) {
    let body : FollowWorldModel ={
        follow: true,
        UserId : auth.id,
        WorldId : id
    };
    let options : RequestInit ={
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(body),
        mode: "cors",
        cache: "default"
    };

    let response = await fetch(config.SERVICES.FOLLOW,options);
    if(response.status === 200){
        return;
    }
    else{
        throw new Error(await response.text());
    }
}

export async function UnFollowWorld(id: string, auth: authenticationState) {
    let body : FollowWorldModel ={
        follow: false,
        UserId : auth.id,
        WorldId : id
    };
    let options : RequestInit ={
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(body),
        mode: "cors",
        cache: "default"
    };

    let response = await fetch(config.SERVICES.FOLLOW,options);
    if(response.status === 200){
        return;
    }
    else{
        throw new Error(await response.text());
    }
}