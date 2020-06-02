import React, {useEffect} from "react";
import {useParams, withRouter} from "react-router";
import {connect} from "react-redux";
import {initGrid} from "../Types/Grid";
import {GetWorldGrid} from "../ApiFunctions/GetWorldGrid";
import {Alert} from "react-bootstrap";
import {Cell} from "../Types/Cell";
import "./grid.css";
import {Chunk} from "../Types/Chunk";
import {doesNotThrow} from "assert";

const World = (props: any) => {
    const {id} = useParams();
    const auth = props.auth;

    const [grid, setGrid] = React.useState(initGrid);
    const [gridhtmlBlock, setGridHtmlBlock] = React.useState(<div/>);
    const [cellHtmlBlock, setCellHtmlBlock] = React.useState();
    const [error, setError] = React.useState(<div/>);

    useEffect(() => {
        initiliaze();
    }, []);

    const AddError = async (error: any) => {
        setError(<Alert variant={"warning"} onClick={() => setError(<div/>)}>{error.message}</Alert>)
    };
    const loadchunk = async (chunk: Chunk, name: string, y: number, x: number): Promise<any> => {
        let arr = [[<div/>, <div/>, <div/>]
            , [<div/>, <div/>, <div/>]
            , [<div/>, <div/>, <div/>]];

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                var cell = chunk.cells[y][x];
                arr[y][x] = <div style={{backgroundColor: cell.color, gridColumn: (x + 1), gridRow: (y + 1)}}
                                 className={"cell"}></div>
            }
        }
        return <div className={"chunk"} style={
            {gridColumn: (x + 1), gridRow: (y + 1)}}>
            {arr}
        </div>;

    };

    const HighestX = (grid : Chunk[][]) : number =>{
        let highest : number= 0;
        for(var row in grid){
            if(row.length > highest){
                highest = row.length;
            }
        }
        return highest;
    };
    const HighestY = (grid : Chunk[][]) : number =>{
        return grid.length;
    };

    const initiliaze = async () => {
        try {
            let grid = await GetWorldGrid(id);
            setGrid(grid);
            // Use this code to show grid capabilites
            // let tempchunk = grid.grid[0][0];
            // grid.grid = [[tempchunk, tempchunk, tempchunk, tempchunk],
            //     [tempchunk, tempchunk, tempchunk],
            //     [tempchunk, tempchunk, tempchunk,tempchunk,tempchunk,tempchunk, tempchunk, tempchunk],
            //     [tempchunk, tempchunk, tempchunk,tempchunk,tempchunk, tempchunk, tempchunk]
            //     ];
            let highestX : number = HighestX(grid.grid);
            let highestY : number = HighestY(grid.grid);
            let bightml = new Array(highestY);
            for (let y: number = 0; y < grid.grid.length; y++) {
                bightml[y] = new Array(highestX)
                let chunkarray: Chunk[] = grid.grid[y];
                for (let x: number = 0; x < chunkarray.length; x++) {
                    console.log("X: "+x, " Y: " +y + " chunk:" + grid.grid[y][x]);
                    bightml[y][x] = await loadchunk(grid.grid[y][x], "chunk pos= [" + y + "," + x + "]", y, x);
                }
            }
            let something = JSON.stringify(bightml);
            setCellHtmlBlock(bightml);
        } catch (error) {
                console.log(error);
            AddError(error);
        }
    };
    return (<div>
        {error}
        <div className={"center"}>
            <div className={"grid-container"}>
                {cellHtmlBlock}
            </div>
        </div>
    </div>)

};
const mapStateToProps = (state: any) => {
    return {
        authentication: state.authentication
    };
};

export default withRouter(connect(mapStateToProps)(World));