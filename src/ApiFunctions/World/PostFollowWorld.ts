import {authenticationState} from "../../reducers/authenticationReducer";
import {FollowWorldModel} from "../../WorldOverview/FollowWorldModel";
import config from "../../config.json";

export async function FollowWorld(id: string, auth: authenticationState) {
    let body : FollowWorldModel ={
        follow: true,
        UserId : auth.id,
        WorldId : id
    };
    let options : RequestInit ={
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : auth.token
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