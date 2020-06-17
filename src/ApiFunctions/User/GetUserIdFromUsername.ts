import config from "../../config.json";

export const GetUserIdFromUsername = async (username: string): Promise<string> => {
    var request: string = "?username=" + username;
    let options: RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "default"
    };
    let response: Response = await fetch(config.SERVICES.GETACCOUNTIDFROMUSERNAME + request, options);
    if (response.status === 200) {
        let body = await response.text();
        body = body.replace('"', '');
        body = body.replace('"', '');
        console.log(body);
        return body;
    } else if (response.status === 500) {
        throw await response.text();
    } else {
        throw 'User with username: ' + username + ', does not exist.';
    }

};