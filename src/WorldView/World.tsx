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
import {timeout} from "q";

const World = (props: any) => {
    const {id} = useParams();
    const auth = props.auth;

    const [grid, setGrid] = React.useState(initGrid);
    const [gridhtmlBlock, setGridHtmlBlock] = React.useState(<div/>);
    const [cellHtmlBlock, setCellHtmlBlock] = React.useState();
    const [newCellsHtmlBlock, setNewCellsHtmlBlock] = React.useState();
    const [error, setError] = React.useState(<div/>);

    let mouseDown = false;

    useEffect(() => {
        initiliaze();
    }, []);

    const AddError = async (error: any) => {
        setError(<Alert variant={"warning"} onClick={() => setError(<div/>)}>{error.message}</Alert>)
    };

    const chunkStyle = (posx: number, posy: number): CSSProperties => {
        let something: CSSProperties = {gridArea: "" + posy + " / " + posx + " /" + " span 1 " + "/ " + "span 1"};
        return something;
    };

    const cellStyle = (color: string, x: number, y: number): CSSProperties => {
        let something: CSSProperties = {
            backgroundColor: color,
            gridArea: "" + y + " / " + x + " /" + " span 1 " + "/ " + "span 1"
        };
        return something;
    };
    const loadchunk = async (chunk: Chunk, name: string, y: number, x: number): Promise<any> => {
        let arr = [[<div/>, <div/>, <div/>, <div/>, <div/>], [<div/>, <div/>, <div/>, <div/>, <div/>], [<div/>, <div/>,
            <div/>, <div/>, <div/>], [<div/>, <div/>, <div/>, <div/>, <div/>], [<div/>, <div/>, <div/>, <div/>,
            <div/>]];

        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                var cell = chunk.cells[y][x];
                arr[y][x] = <div style={cellStyle(cell.color, x + 1, y + 1)} className={"cell"}></div>
            }
        }
        return <div className={"chunk"} style={
            chunkStyle(x + 1, y + 1)}>
            {arr}
        </div>;

    };
    const CreateNewChunk= async (y :number, x :number) =>{
        console.log("y",y);
        console.log("x",x);
    };

    const loadPossibleNewChunk = async (y: number, x: number) => {
        return <div className={"possible-new-chunk"} onClick={()=> CreateNewChunk(y-1,x-1)} style={
            chunkStyle(x + 1, y + 1)}>
            [{y-1},{x-1}]
        </div>
    };

    const HighestX = (grid: Chunk[]): number => {
        let highest: number = 0;
        let lowest : number = 0;
        for (let x: number = 0; x < grid.length; x++) {
            if (highest < grid[x].posX) {
                highest = grid[x].posX;
            }
        }
        for (let x: number = 0; x < grid.length; x++) {
            if (lowest > grid[x].posX) {
                lowest = grid[x].posX;
            }
        }
        return highest-lowest+1;
    };

    const HighestY = (grid: Chunk[]): number => {
        let highest: number = 0;
        let lowest : number = 0;
        for (let x: number = 0; x < grid.length; x++) {
            if (highest < grid[x].posY) {
                highest = grid[x].posY;
            }
        }
        for (let x: number = 0; x < grid.length; x++) {
            if (lowest > grid[x].posY) {
                lowest = grid[x].posY;
            }
        }
        return highest-lowest+1;
    };

    function sleep(ms:any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const initiliaze = async () => {
        try {
            let grid = await GetWorldGrid(id);
            console.log("remaining", grid.remainingChunks );
            setGrid(grid);
            let highestX: number = HighestX(grid.grid);
            console.log("hx", highestX);
            let highestY: number = HighestY(grid.grid);
            console.log("hy", highestY);

            let chunks = [];
            for (let y: number = 0; y < grid.grid.length; y++) {
                    chunks.push(await loadchunk(grid.grid[y], "chunk pos= [" + grid.grid[y].posY + 1 + "," + grid.grid[y].posX + 1 + "]", grid.grid[y].posY + 1, grid.grid[y].posX + 1));
            }
            setCellHtmlBlock(chunks);
            loadsides(highestX,highestY);
        } catch (error) {
            console.log(error);
            AddError(error);
        }
    };



    const loadsides = async (highestX:number ,highestY:number)=>{

        let newChunks: any[] = new Array(2);
        newChunks[1] = [];
        newChunks[0] = [];
        const xfillnew = async (highestX: number, highestY: number) => {
            for (let x: number = 0; x < (highestX + 2); x++) {
                newChunks[1].push(await loadPossibleNewChunk(0, x));
                newChunks[1].push(await loadPossibleNewChunk(highestY + 1, x));
            }
            setNewCellsHtmlBlock(newChunks)
        };

        const yfillnew = async (highestX:number ,highestY:number) => {
            for (let y: number = 0; y < (highestY + 2); y++) {
                newChunks[0].push(await loadPossibleNewChunk(y, 0));
                newChunks[0].push(await loadPossibleNewChunk(y, highestX + 1));
            }
            setNewCellsHtmlBlock(newChunks);
        };
        xfillnew(highestX,highestY);
        yfillnew(highestX, highestY);


    };

    return (<div>
        {error}
        <div className={"center"}>
            <div className={"grid-container"}>
                {cellHtmlBlock}
                {newCellsHtmlBlock}
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