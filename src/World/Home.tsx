import React, {useEffect} from "react";
import {authenticationState} from "../reducers/authenticationReducer";
import {checkAuthentication} from "../Components/CheckAuthentication";
import { WorldWithDetails} from "../Types/World"
import config from "../config.json";
import {Col, ListGroup} from "react-bootstrap"
import {Link} from 'react-router-dom';
/*
Overview page
 */

const Overview = (props : any) => {
    const [ul, setUl] = React.useState(<div></div>)
    const [overview, setOverview] = React.useState(<div>loading....</div>);

    useEffect(() => {loadWorlds()},[]);
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

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let worlds: WorldWithDetails[] = [];

    const loadWorlds = async () => {
        if(authObject.isAuthenticated){

        worlds = await GetWorldsFrom(authObject);
        await delay(300);
        const listItems = worlds.map((world) =>
            <ListGroup.Item><Link to={"/world/details/"+world.worldId}>{world.title}</Link></ListGroup.Item>
        );
        let ul = <ListGroup>{listItems}</ListGroup>;
        setUl(ul);
        setOverview(<div>Overview Loaded</div>);
        }
        else{
            setOverview(<div>not logged in no personal view</div>)
        }
    };


    return (
        <div className={"container"}>
            <Col>
                {ul}
                {ul}
            </Col>
            <Col>
                {overview}
            </Col>
        </div>

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