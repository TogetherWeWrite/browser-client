import React from "react";
import {checkAuthentication} from "../Components/CheckAuthentication";

const Home = () => {
    let account = checkAuthentication();
    if(account.isAuthenticated){
        return(<div>
            <h1>Hello : {account.username}</h1>
        </div>);
    }
    else {
        return (<div>Hello Guest</div>);
    }
};

export default Home;