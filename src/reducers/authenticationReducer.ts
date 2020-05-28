import {AuthenticationActionTypes, LOGIN, LOGOUT} from "../Actions/AuthenticationActions"


export interface authenticationState {
    isAuthenticated: boolean,
    username: string,
    id : string,
    token : string
}

export const initialState: authenticationState = {
    id : "",
    username : "",
    isAuthenticated : false,
    token: ""
};

export function authenticationReducer(
    state: authenticationState = initialState,
    action: AuthenticationActionTypes
): authenticationState {
    switch(action.type){
        case LOGIN: {
            return {
                ...state, ...action.payload
            }
        }
        case LOGOUT: {
            return {
                ...state, ...action.payload
            }
        }
        default:
            return state;
    }
}




export default authenticationReducer;