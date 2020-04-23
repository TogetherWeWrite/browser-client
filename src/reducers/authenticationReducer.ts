import {AuthenticationActionTypes, LOGIN} from "../Actions/AuthenticationActions"
import {persistReducer} from "redux-persist";
import storageSession  from "redux-persist/lib/storage/session";


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

const authPersistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['id', 'username', "isAuthenticated", "token"]
};


export default persistReducer(authPersistConfig, authenticationReducer);