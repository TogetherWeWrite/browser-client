import {authenticationState} from "../reducers/authenticationReducer";
export function checkAuthentication() : authenticationState {
    let isAuthenticated: boolean = false;
    let authstring: string = localStorage.getItem("auth") ?? "";
    let authobject :authenticationState;
    try{
        authobject= JSON.parse(authstring);
    }
    catch(exception){
        authobject = {
            id: 0, isAuthenticated: false, token: "", username: ""
        }
    }
    if (authstring === "") {
        isAuthenticated = false;
    } else {
        authobject = JSON.parse(authstring);
        isAuthenticated = authobject.isAuthenticated;
    }
    return authobject;
}