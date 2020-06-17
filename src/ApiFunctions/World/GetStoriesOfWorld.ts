import config from "../../config.json";
import {WorldWithStories} from "../../Types/RequestModels/WorldWithStories";

export const GetStoriesOfWorld = async (worldId: string):Promise<WorldWithStories>  => {
    var request: string = "?id=" + worldId;
    let options: RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "default"
    };

    let response = await fetch(config.SERVICES.WORLDSTORY + request, options);
    let body = await response.text();
    if(response.status === 200){
        return JSON.parse(body);
    }
    else{
        throw new Error("Http Error: "+ response.status + ". Something went wrong please report it at ....... so the developers can solve this issue.")
    }
};