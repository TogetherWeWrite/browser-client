import {WorldWithDetails} from "../../Types/World";
import config from "../../config.json";

export const GetDetailsOfWorld = async (worldId: string): Promise<WorldWithDetails> => {
    var request: string = "?id=" + worldId;
    let options: RequestInit = {
        method: "GET",
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