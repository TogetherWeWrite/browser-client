import {WorldWithFollowers} from "../../WorldOverview/WorldWithFollowers";
import config from "../../config.json";

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