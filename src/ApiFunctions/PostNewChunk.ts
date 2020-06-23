import config from "../config.json";
import {Chunk} from "../Types/Chunk";
import {CreateNewChunkModel} from "../Types/CreateNewChunkModel";
import {authenticationState} from "../reducers/authenticationReducer";

export const PostNewChunk = async (worldId: string, y: number, x: number, authObject : authenticationState) : Promise<Chunk>=> {
    let newChunk : CreateNewChunkModel = {
        WorldId : worldId,
        PosY : y,
        PosX : x,
        Name : "y: "+y+" x:"+x
    };
    console.log(newChunk);
    let options: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authObject.token
        },
        body: JSON.stringify(newChunk),
        mode: "cors",
        cache: "default"
    };
    console.log("fetching");
    let response: Response = await fetch(config.SERVICES.CHUNK, options);
    console.log("done fetching");
    let body = await response.text();
    if (response.status === 200) {//OK
        console.log(body);
        return JSON.parse(body);
    } else if (response.status >= 400) {
        throw new Error("You are not allowed to edit this world, This can occur if you are not logged in, or if you do not got rights in this world");
    } else {
        throw new Error("something went wrong " + "Extra information body:" + body);
    }
};
