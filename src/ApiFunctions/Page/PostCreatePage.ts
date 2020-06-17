import config from "../../config.json";
import {authenticationState} from "../../reducers/authenticationReducer";
import {AddPageToStoryModel} from "../../Types/RequestModels/Page/AddPageToStoryModel";

export const CreatePage = async (authobject : authenticationState, content : string, storyId: string) =>{
    console.log(authobject);
    let model : AddPageToStoryModel = {
        Content : content,
        StoryId: storyId
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
    let response: Response = await fetch(config.SERVICES.PAGE, options);
    let body = await response.text();
    if (response.status === 200) {//OK
        console.log(body);
        return JSON.parse(body);
    }
    else{
        throw new Error("uwuw something went wrong");
    }
}