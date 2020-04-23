import {authenticationState} from "../reducers/authenticationReducer";
export const LOGIN = "LOGIN";

interface LoginAction {
    type: typeof LOGIN
    payload: authenticationState
}

export function login (newlogin : authenticationState) : LoginAction{
    return {
        type : LOGIN,
        payload : newlogin
    }
}

export type AuthenticationActionTypes = LoginAction