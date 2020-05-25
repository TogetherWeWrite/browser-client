import React from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";

const Home = (props : any) => {
    let account = props.authentication;
    if(account.isAuthenticated){
        return(<div>
            <h1>Hello : {account.username}</h1>
        </div>);
    }
    else {
        return (<div>Hello Guest</div>);
    }
};


const mapStateToProps = (state: any) => {
    return {
        authentication: state.authentication
    };
};

export default withRouter(connect(mapStateToProps)(Home));