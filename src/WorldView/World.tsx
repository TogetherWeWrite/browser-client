import React, {useEffect} from "react";
import {useParams, withRouter} from "react-router";
import {connect} from "react-redux";

const World = (props: any) => {
    return(<div></div>)
};
const mapStateToProps = (state: any) => {
    return {
        authentication: state.authentication
    };
};

export default withRouter(connect(mapStateToProps)(World));