import {authenticationState} from "../reducers/authenticationReducer";
export function checkAuthentication() : authenticationState {
    let authobject :authenticationState;
    let authstring: string = localStorage.getItem("auth") ?? "";


    if (authstring === "") {
        authobject = {
            id: 0, isAuthenticated: false, token: "", username: ""
        }
    } else {
        try{
            authobject = JSON.parse(authstring);
        }
        catch(exception){
            authobject = {
                id: 0, isAuthenticated: false, token: "", username: ""
            }
        }
    }


    return authobject;
}
