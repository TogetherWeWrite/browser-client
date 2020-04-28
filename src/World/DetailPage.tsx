import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {WorldWithDetails} from "../Types/World";
import config from "../config.json";

const DetailPage = () => {
    let world : WorldWithDetails;
    const [page, setPage] = React.useState(<div>loading...</div>)
    let {worldid} = useParams();

    useEffect(() => {loadDetailsOfWorld()},[]);
    const loadDetailsOfWorld = async () => {
        if (worldid) {
            try{
                world = await GetDetailsOfWorld(worldid);
                setPage(<div>{JSON.stringify(world)}</div>)
            }
            catch(exception)
            {
                console.log(exception);
            }
        }
    };
    return (<div>{page}</div>)
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