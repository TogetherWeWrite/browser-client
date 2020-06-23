import {authenticationState} from "../../reducers/authenticationReducer";
import {StoryRef} from "../../Types/RequestModels/StoryRef";
import config from "../../config.json";
import {CreateStoryModel} from "../../Types/RequestModels/CreateStoryModel";

export const PostCreateStory = async (worlid: string, title: string, authobject : authenticationState) : Promise<StoryRef> =>{
    let model : CreateStoryModel = {
        Title : title,
        WorldId : worlid
    };
    let options: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authobject.token
        },
        body: JSON.stringify(model),
        mode: "cors",
        cache: "default"
    };
    let response: Response = await fetch(config.SERVICES.STORY, options);
    let body = await response.text();
    if (response.status === 200) {//OK
        console.log(body);
        return JSON.parse(body);
    }
    else{
        throw new Error("uwuw something went wrong");
    }
};