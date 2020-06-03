import React, {CSSProperties, useEffect} from "react";
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

    let mouseDown = false;

    useEffect(() => {
        initiliaze();
    }, []);

    const AddError = async (error: any) => {
        setError(<Alert  variant={"warning"} onClick={() => setError(<div/>)}>{error.message}</Alert>)
    };

    const chunkStyle = (posx: number, posy: number) : CSSProperties=>{
        let something :CSSProperties = {gridArea: ""+posy + " / " + posx + " /"+ " span 1 "+ "/ " + "span 1"} ;
        return something;
    };

    const cellStyle = (color : string, x: number ,y: number): CSSProperties =>{
        let something :CSSProperties = {backgroundColor: color,gridArea: ""+y + " / " + x + " /"+ " span 1 "+ "/ " + "span 1"} ;
        return something;
    };
    const loadchunk = async (chunk: Chunk, name: string, y: number, x: number): Promise<any> => {
        let arr = [[<div/>, <div/>, <div/>, <div/>, <div/>],[<div/>, <div/>, <div/>, <div/>, <div/>],[<div/>, <div/>, <div/>, <div/>, <div/>],[<div/>, <div/>, <div/>, <div/>, <div/>],[<div/>, <div/>, <div/>, <div/>, <div/>]];

        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                var cell = chunk.cells[y][x];
                arr[y][x] = <div style={cellStyle(cell.color,x+1,y+1)} className={"cell"}></div>
            }
        }
        return <div className={"chunk"} style={
            chunkStyle(x+1,y+1)}>
            {arr}
        </div>;

    };

    const HighestX = (grid: Chunk[][]): number => {
        let highest: number = 0;
        for (var row in grid) {
            if (row.length > highest) {
                highest = row.length;
            }
        }
        return highest;
    };
    const HighestY = (grid: Chunk[][]): number => {
        return grid.length;
    };

    const initiliaze = async () => {
        try {
            let grid = await GetWorldGrid(id);
            setGrid(grid);
            let highestX: number = HighestX(grid.grid);
            let highestY: number = HighestY(grid.grid);
            let bightml = new Array(highestY);
            for (let y: number = 0; y < grid.grid.length; y++) {
                bightml[y] = new Array(highestX)
                let chunkarray: Chunk[] = grid.grid[y];
                for (let x: number = 0; x < chunkarray.length; x++) {
                    console.log("X: " + x, " Y: " + y + " chunk:" + grid.grid[y][x]);
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
    let prevX: number;
    let prevY: number;
    let afterX, afterY: number;
    const startDrag = async (event: any) => {
        prevX = event.clientX;
        prevY = event.clientY;
        // while(mouseDown){
        //     setTimeout(startDrag, 100);
        // }
        console.log("X: " + prevX + " Y: " + prevY);
    };

    const stopDrag = async (event: any) => {
        afterX = event.clientX;
        afterY = event.clientY;
        let deltaY: number = prevY - afterY;
        let deltaX: number = prevX - afterX;
        console.log(deltaY);
        console.log(deltaX);
        // event.target.scroll(deltaX, deltaY);
        mouseDown = false;
    };

    return (<div>
        {error}
        <div className={"center"}>
            <div className={"grid-container"} onMouseDown={(event) => {
                mouseDown = true;
                startDrag(event)
            }} onMouseUp={stopDrag}>
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