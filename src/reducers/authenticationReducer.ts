import {ResponseUser}  from "../Types/ResponseUser"

export interface AuthenticationAction{
    type: any,
    user: ResponseUser
}

const authenticationReducer = (state = {
    token: '',
    username: '',
    userId: 0,
    isAuthenticated: false
}, action : AuthenticationAction) => {
    switch (action.type) {
        case 'LOGIN':
            state = {...state, username: action.user.username, userId: action.user.id ,token: action.user.token, isAuthenticated: true};
            break;
        default:
            break;
    }
    return state;
};

export default authenticationReducer;