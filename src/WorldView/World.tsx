import React, {useEffect} from "react";
import {useParams, withRouter} from "react-router";
import {connect} from "react-redux";
import {initGrid} from "../Types/Grid";
import {GetWorldGrid} from "../ApiFunctions/GetWorldGrid";
import {Alert} from "react-bootstrap";
import {Cell} from "../Types/Cell";
import "./grid.css";

const World = (props: any) => {
    const {id} = useParams();
    const auth = props.auth;

    const [grid, setGrid] = React.useState(initGrid);
    const [gridhtmlBlock, setGridHtmlBlock] = React.useState(<div/>);
    const [cellHtmlBlock, setCellHtmlBlock] = React.useState(<div/>);
    const [error, setError] = React.useState(<div/>);

    useEffect(() => {
        initiliaze();
    }, []);

    const AddError = async (error: any) => {
        setError(<Alert variant={"warning"} onClick={() => setError(<div/>)}>{error.message}</Alert>)
    };

    const initiliaze = async () => {
        try {
            let grid = await GetWorldGrid(id);
            setGrid(grid);
            console.log(JSON.stringify(grid));
            setGridHtmlBlock(<div>{JSON.stringify(grid)}</div>);
            setCellHtmlBlock(<div className={"chunk"}>{grid.grid[0][0].cells.map((cells: Cell[]) =>
                <div className={"cell-row"}>{cells.map((cell: Cell) =><div style={{backgroundColor : cell.color}} className={"cell"}>{}</div>)}</div>

            )
            }</div>);
        } catch (error) {
            AddError(error);
        }
    };
    return (<div style={{backgroundColor : "white"}}>
        {error}
        <div className={"center"}>
        {/*{gridhtmlBlock}*/}
        {cellHtmlBlock}

        </div>
    </div>)

};
const mapStateToProps = (state: any) => {
    return {
        authentication: state.authentication
    };
};

export default withRouter(connect(mapStateToProps)(World));