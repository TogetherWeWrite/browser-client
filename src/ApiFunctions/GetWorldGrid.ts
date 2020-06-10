import {Grid} from "../Types/Grid";
import config from "../config.json";

export const GetWorldGrid = async (id: string | undefined): Promise<Grid> => {
    if(id) {
        let options: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            cache: "default"
        };
        console.log("fetching");
        let response: Response = await fetch(config.SERVICES.GETWORLDGRID + "/" + id, options);
        console.log("done fetching");
        let body = await response.text();
        if (response.status === 200) {//OK
            return JSON.parse(body);
        } else if (response.status >= 400) {
            throw new Error(body);
        } else {
            throw new Error("something went wrong " + "Extra information body:" + body);
        }
    }
    else{
        throw new Error("Please make sure you are navigating to this page correctly");
    }


};