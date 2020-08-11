import config from "../config.json";
import {UpdateCellColorModel} from "../Types/UpdateCellColorModel";
import {Chunk} from "../Types/Chunk";
import {authenticationState} from "../reducers/authenticationReducer";

export const updateColorCell = async ( chunkId: string, worldId: string | undefined, color: string, authObject : authenticationState, y:number,x:number) : Promise<Chunk>=>{
    if(worldId) {
        let model: UpdateCellColorModel = {
            ChunkId: chunkId,
            WorldId: worldId,
            Color: color,
            PosX :x,
            PosY: y
        };
        let options: RequestInit = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authObject.token
            },
            body: JSON.stringify(model),
            mode: "cors",
            cache: "default"
        };
        console.log("fetching");
        let response: Response = await fetch(config.SERVICES.CELL, options);
        console.log("done fetching");
        let body = await response.text();
        if (response.status === 200) {//OK
            console.log(body);
            return JSON.parse(body);
        } else if (response.status >= 400) {
            throw new Error(body);
        } else {
            throw new Error("something went wrong " + "Extra information body:" + body);
        }
    }
    else{
        throw new Error("Unknown World")
    }
};