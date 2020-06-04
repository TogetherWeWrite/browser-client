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
import {PostNewChunk} from "../ApiFunctions/PostNewChunk";
import {LoadChunksOfWorld} from "../ApiFunctions/LoadChunksOfWorld";

const World = (props: any) => {
    const {id} = useParams();
    const auth = props.auth;
    const chunks: any[] = []
    const [ggrid, setGrid] = React.useState(initGrid);
    const [gridhtmlBlock, setGridHtmlBlock] = React.useState(<div/>);
    const [initChunkHtmlBlock, setInitChunkHtmlBlock] = React.useState();
    const [remainingChunkHtmlBlock, setRemainingChunkHtmlBlock] = React.useState();
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
    const CreateNewChunk = async (y: number, x: number) => {
        console.log("y", y);
        console.log("x", x);
        if (id) {
            PostNewChunk(id, y, x)
        }
    };

    const loadPossibleNewChunk = async (y: number, x: number) => {
        return <div className={"possible-new-chunk"} onClick={() => CreateNewChunk(y - 1, x - 1)} style={
            chunkStyle(x + 1, y + 1)}>
            [{y - 1},{x - 1}]
        </div>
    };

    function sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const LoadRemainingChunks = async (ids: string[]) => {
        var newPartWorld = await LoadChunksOfWorld(ids);
        for (let i: number = 0; i < newPartWorld.chunks.length; i++) {
            let chunk: Chunk = newPartWorld.chunks[i];
            //if a pos is higher or equal to zero it will get +1 in loadchunk
            //if a pos is loew than zero it will get -1 in loadchunk
            if (chunk.posY < 0 && chunk.posX >= 0) {
                chunks.push(await loadchunk(chunk, chunk.name, chunk.posY - 1, chunk.posX + 1))
            } else if (chunk.posY >= 0 && chunk.posX >= 0) {
                chunks.push(await loadchunk(chunk, chunk.name, chunk.posY + 1, chunk.posX + 1))
            } else if (chunk.posY >= 0 && chunk.posX < 0) {
                chunks.push(await loadchunk(chunk, chunk.name, chunk.posY + 1, chunk.posX - 1))
            } else if (chunk.posY < 0 && chunk.posX < 0) {
                chunks.push(await loadchunk(chunk, chunk.name, chunk.posY - 1, chunk.posX - 1))
            }

            ggrid.grid.push(chunk);
        }
        if (newPartWorld.doneLoading === false) {
            await LoadRemainingChunks(newPartWorld.remainingChunks);
        }
    };

    const initiliaze = async () => {
        try {
            let grid = await GetWorldGrid(id);
            console.log("remaining", grid.remainingChunks);
            setGrid(grid);

            for (let y: number = 0; y < grid.grid.length; y++) {
                chunks.push(await loadchunk(grid.grid[y], "chunk pos= [" + grid.grid[y].posY + 1 + "," + grid.grid[y].posX + 1 + "]", grid.grid[y].posY + 1, grid.grid[y].posX + 1));
            }
            setInitChunkHtmlBlock(chunks);
            if (grid.remainingChunks.length > 0) {
                await LoadRemainingChunks(grid.remainingChunks);
            }
            chunks.shift();//first remove
            setRemainingChunkHtmlBlock(chunks);
            loadsides()
        } catch (error) {
            console.log(error);
            AddError(error);
        }
    };


    const loadsides = async () => {
        //x y position.
        interface TwoDPos {
            posX: number,
            posY: number
        }

        //step 1 get a list of positions taken bij already existing chunks
        let arrayOfPositionOfAlreadyExistingChunks: TwoDPos[] = [];
        for (let i: number = 0; i < ggrid.grid.length; i++) {
            arrayOfPositionOfAlreadyExistingChunks.push(
                {
                    posX: ggrid.grid[i].posX,
                    posY: ggrid.grid[i].posY
                });
        }

        //step 2 create a list of possible new positions of chunks
        //step 2 CONDITION: the possible new positions must neighbour the chunk horizontally vertically or diagonal
        let possibleNewChunkPos: TwoDPos[] = [];
        for (let i: number = 0; i < arrayOfPositionOfAlreadyExistingChunks.length; i++) {
            //step 2.1 Generate an array of possible neighbours
            //  1[x-1, y+1]    2[x  , y+1]    3[x+1, y+1]
            //  4[x-1, y  ]        pos         5[x+1, y  ]
            //  6[x-1, y-1]    7[x  , y-1]    8[x+1, y-1]
            let possibleNeighbours: TwoDPos[] = new Array(8);
            let pos: TwoDPos = arrayOfPositionOfAlreadyExistingChunks[i];
            for (let j: number = -1; j < 2; j++) {
                //filling in 0-1-2 of array possibleNeighbours.
                possibleNeighbours[j+1] = {posX: pos.posX + j, posY: pos.posY + 1}
                //filling in 6-7-8 of array possibleNeighbours.
                possibleNeighbours[j+7] = {posX: pos.posX + j, posY: pos.posY -1}
            }
            //filling in 4 of array possibleNeighbours
            possibleNeighbours[4] = {posX : pos.posX -1, posY: pos.posY}
            //filling in 5 of array possibleNeighbours
            possibleNeighbours[5] = {posX : pos.posX +1, posY: pos.posY}
            //Step 2.2 Check if the positions of empty neighbours already exist in possibleNewChunkPos
            if(possibleNewChunkPos)
            //Step 2.3 If these position are not in the array put them in.

            //step 3 make an array of loadPossibleNewChunk of these positions
        }
    };

    return (<div>
        {error}
        <div className={"center"}>
            <div className={"grid-container"}>
                {remainingChunkHtmlBlock}
                {initChunkHtmlBlock}
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