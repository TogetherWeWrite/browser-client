import {ResponseUser} from "../Types/ResponseUser";
import {AuthenticationAction} from "../reducers/authenticationReducer"
export function login(ruser : ResponseUser) {
    return (dispath: any) => {
        let action : AuthenticationAction =  {
            type: "LOGIN",
            user: ruser
        };
        console.log("DISPATH:" + dispath);
        dispath(action);
    }
}

export function logout(){
    return (dispath : any) => {
            dispath({
                type: "LOGOUT"
            })
    }
}