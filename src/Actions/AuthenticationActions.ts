import {authenticationState, initialState} from "../reducers/authenticationReducer";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export interface action{
    type: string,
    payload: authenticationState
}


export function login (newlogin : authenticationState) : action{
    return {
        type : LOGIN,
        payload : newlogin
    }
}

export function logout() : action{
    return {
        type : LOGOUT,
        payload : initialState
    }
}

export type AuthenticationActionTypes = action

