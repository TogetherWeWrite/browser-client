import React, {useEffect} from "react";
import {useParams, withRouter} from "react-router";
import {connect} from "react-redux";
import {initGrid} from "../Types/Grid";
import {GetWorldGrid} from "../ApiFunctions/GetWorldGrid";
import {Alert} from "react-bootstrap";

const World = (props: any) => {
    const {id} = useParams();
    const auth = props.auth;

    const [grid, setGrid] = React.useState(initGrid);
    const [gridhtmlBlock, setGridHtmlBlock] = React.useState(<div/>);
    const [error,setError] = React.useState(<div/>);

    useEffect(() => {
        initiliaze();
    },[]);

    const AddError= async (error :any) =>{
        setError(<Alert variant={"warning"} onClick={() => setError(<div/>)}>{error.message}</Alert>)
    };

    const initiliaze = async () => {
        try {
            let grid = await GetWorldGrid(id);
            setGrid(grid);
            console.log(JSON.stringify(grid));
            setGridHtmlBlock(<div>{JSON.stringify(grid)}</div>);
        }catch(error){
            AddError(error);
        }
    };
    return (<div>{id}
        {error}
        {gridhtmlBlock}
    </div>)

};
const mapStateToProps = (state: any) => {
    return {
        authentication: state.authentication
    };
};

export default withRouter(connect(mapStateToProps)(World));