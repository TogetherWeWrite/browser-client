import {authenticationState} from "../../reducers/authenticationReducer";
import config from "../../config.json";
import {AddWriterRequest} from "../../Types/RequestModels/AddWriterRequest";

export const AddWriterToWorld = async (authObject : authenticationState, worldId: string, writerId: string) => {
    var requestobj: AddWriterRequest = {
        WorldId: worldId,
        WriterId: writerId
    };
    let options: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : authObject.token
        },
        body: JSON.stringify(requestobj),
        mode: "cors",
        cache: "default"
    };
    let response: Response = await fetch(config.SERVICES.ADDWRITERTOWORLD, options);
    if (response.status === 200) {
        return true;
    } else if (response.status === 500) {
        throw await response.text();
    } else {
        return false;
    }
};