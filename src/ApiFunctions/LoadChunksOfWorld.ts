import config from "../config.json";
import {LoadPartOfWorld, LoadPartOfWorldResult} from "../Types/LoadPartOfWorld";

export const LoadChunksOfWorld = async(id :string[]) : Promise<LoadPartOfWorldResult> =>{
    let RemainingChunks :string[] = [];
    RemainingChunks = id;

    let options: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(RemainingChunks),
        mode: "cors",
        cache: "default"
    };
    let response: Response = await fetch(config.SERVICES.CHUNKLOADING, options);
    let body = await response.text();
    if (response.status === 200) {//OK
        return JSON.parse(body);
    } else if (response.status >= 400) {
        throw new Error(body);
    } else {
        throw new Error("something went wrong " + "Extra information body:" + body);
    }
};