import {AuthenticationActionTypes, LOGIN} from "../Actions/AuthenticationActions"


export interface authenticationState {
    isAuthenticated: boolean,
    username: string,
    id : number,
    token : string
}

const initialState: authenticationState = {
    id : 0,
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
        default:
            return state;
    }
}


export default authenticationReducer;