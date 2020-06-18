import React, {CSSProperties, useEffect} from "react";
import ReactDOM from "react-dom";
import {useParams, withRouter} from "react-router";
import {connect} from "react-redux";
import {initGrid} from "../Types/Grid";
import {GetWorldGrid} from "../ApiFunctions/GetWorldGrid";
import {Alert, Button, Col, Container, Row} from "react-bootstrap";
import {Cell} from "../Types/Cell";
import "./grid.css";
import {Chunk} from "../Types/Chunk";
import {doesNotThrow} from "assert";
import {timeout} from "q";
import {PostNewChunk} from "../ApiFunctions/PostNewChunk";
import {LoadChunksOfWorld} from "../ApiFunctions/LoadChunksOfWorld";
import {Simulate} from "react-dom/test-utils";
import {initCreateNewChunkModel} from "../Types/CreateNewChunkModel";
import {Modal} from "react-bootstrap";
import {updateColorCell} from "../ApiFunctions/updateColorCell";

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
    const [chunkDetailBlock, setChunkDetailBlock] = React.useState<any>(<div></div>);

    //x y position.
    interface TwoDPos {
        posX: number,
        posY: number
    }

    let changeCellId: string = "";
    let newColorForCell: string = "#000000";

    let createNewChunkPositions: TwoDPos[] = [];

    let mouseDown = false;

    useEffect(() => {
        initiliaze();
    }, []);

    const AddError = async (error: any) => {
        setError(<Alert variant={"warning"} onClick={() => setError(<div/>)}>{error.message}</Alert>)
    };

    const changeColorCell = async (pos: number, cellId: string, chunkId: string, worldId: string | undefined, color: string) => {
        try {
            openChunkInfo(pos, await updateColorCell(cellId, chunkId, worldId, color, props.authentication), worldId);
        } catch (e) {
            await AddError(e);
        }
    };

    const invertColorOfCell = async (pos: any, chunk: Chunk, x: number, y: number) => {
        let curColor = chunk.cells[y][x].color;
        console.log(curColor);
        if (curColor === '#000000') {
            chunk.cells[y][x].color = '#ffffff';
        } else {
            chunk.cells[y][x].color = '#000000';
        }
        changeCellId = chunk.cells[y][x].id;
        changeColorCell(pos, changeCellId, chunk.id, id, chunk.cells[y][x].color)
    };


    //initialize chunk details modal
    const openChunkInfo = async (pos: number, chunk: Chunk, worldid: string | undefined) => {
        const updateGrid = async () => {
            let index: number = 0;
            for (let i = 0; i < ggrid.grid.length; i++) {
                if (ggrid.grid[i].posX == chunk.posX && ggrid.grid[i].posY == chunk.posY) {
                    index = i;
                    break;
                }
            }
            chunks[index] = await loadchunk(pos, chunk, chunk.name, chunk.posY, chunk.posX);
            setRemainingChunkHtmlBlock(undefined);
            setRemainingChunkHtmlBlock(chunks);
        };

        const close = async () => {
            setChunkDetailBlock(<div/>);
        };

        const NavigateToOther = async (posx: number, posy: number) => {
            updateGrid();
            close();
            let newChunkToLoad: any;
            for (let i: number = 0; i < ggrid.grid.length; i++) {
                if (ggrid.grid[i].posY == posy && ggrid.grid[i].posX == posx) {
                    newChunkToLoad = ggrid.grid[i];
                    break;
                }
            }
            if (newChunkToLoad !== undefined) {
                openChunkInfo(0, newChunkToLoad, worldid);
            } else {
                console.log("Chunk not found.");
                setError(<Alert variant={"warning"} onClick={() => {
                    setError(<div/>)
                }}>The chunk that you tried to navigate to does not exist</Alert>)
            }
        };


        const arr = [[<div/>, <div/>, <div/>, <div/>, <div/>], [<div/>, <div/>, <div/>, <div/>, <div/>], [<div/>,
            <div/>,
            <div/>, <div/>, <div/>], [<div/>, <div/>, <div/>, <div/>, <div/>], [<div/>, <div/>, <div/>, <div/>,
            <div/>]];

        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                var cell = chunk.cells[y][x];
                arr[y][x] = <div style={cellStyle(cell.color, x + 1, y + 1)} onClick={() => {
                    invertColorOfCell(pos, chunk, x, y);
                }} className={"cell cell-in-dialogue"}></div>
            }
        }


        setChunkDetailBlock(<div role={"dialog"} aria-modal={"true"} className={"overlay cursor-select fade modal show"}
                                 tabIndex={-1} style={{display: "block"}}>
            <div aria-labelledby={"contained-modal-title-vcenter"} role={"document"}
                 className={"modal-dialog modal-lg modal-dialog-centered"}>
                <div className={"strong-white modal-content"}>
                    <div className={"modal-body"}>
                        <div className="dialog-title">
                            <h4>
                                {chunk.name}
                            </h4>
                            <p>
                                Click on a cell to change the color when black to white, and from white to black.
                            </p>
                        </div>
                        <Row>
                            <Container>
                                <Row>
                                    <Col lg={2}>
                                        <Button variant={"info"} onClick={() => {
                                            NavigateToOther(chunk.posX - 1, chunk.posY - 1);
                                        }}>
                                            Navigate Up Left
                                        </Button>
                                    </Col>
                                    <Col lg={8} className={"modal-vertical-navigation"}>
                                        <Button variant={"info"} onClick={() => {
                                            NavigateToOther(chunk.posX, chunk.posY - 1);
                                        }}>
                                            Navigate Up
                                        </Button>
                                    </Col>
                                    <Col lg={2}>
                                        <Button variant={"info"} onClick={() => {
                                            NavigateToOther(chunk.posX + 1, chunk.posY - 1);
                                        }}>
                                            Navigate Up Right
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={2} className={"modal-horizontal-navigation"}>
                                        <Button variant={"info"} onClick={() => {
                                            NavigateToOther(chunk.posX - 1, chunk.posY);
                                        }}>
                                            Navigate Left
                                        </Button>
                                    </Col>
                                    <Col lg={8} className={"chunk modal-detail-chunk"}>
                                        {arr}
                                    </Col>
                                    <Col lg={2} className={"modal-horizontal-navigation"}>
                                        <Button variant={"info"} onClick={() => {
                                            NavigateToOther(chunk.posX + 1, chunk.posY);
                                        }}>
                                            Navigate Right
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={2}>
                                        <Button variant={"info"} onClick={() => {
                                            NavigateToOther(chunk.posX - 1, chunk.posY + 1);
                                        }}>
                                            Navigate Down Left
                                        </Button>
                                    </Col>
                                    <Col lg={8} className={"modal-vertical-navigation"}>
                                        <Button variant={"info"} onClick={() => {
                                            NavigateToOther(chunk.posX, chunk.posY + 1);
                                        }}>
                                            Navigate Down
                                        </Button>
                                    </Col>
                                    <Col lg={2}>
                                        <Button variant={"info"} onClick={() => {
                                            NavigateToOther(chunk.posX + 1, chunk.posY + 1);
                                        }}>
                                            Navigate Down Right
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Row>
                        <Row>
                            <Button className={"dialog-button-close"} onClick={async () => {
                                close();
                                updateGrid();
                            }}>close</Button>
                        </Row>

                    </div>
                </div>

            </div>
        </div>);
        console.log(JSON.stringify(chunk));
    };

    const chunkStyle = (posx: number, posy: number): CSSProperties => {
        if (posy >= 0) {
            posy = posy + 1
        } else {
            posy = posy - 1;
        }

        if (posx >= 0) {
            posx = posx + 1
        } else {
            posx = posx - 1;
        }
        let something: CSSProperties = {gridArea: "" + (posy) + " / " + (posx) + " /" + " span 1 " + "/ " + "span 1"};
        return something;
    };

    const cellStyle = (color: string, x: number, y: number): CSSProperties => {
        let something: CSSProperties = {
            backgroundColor: color,
            gridArea: "" + y + " / " + x + " /" + " span 1 " + "/ " + "span 1"
        };
        return something;
    };
    const loadchunk = async (pos: number, chunk: Chunk, name: string, y: number, x: number): Promise<any> => {
        let arr = [[<div/>, <div/>, <div/>, <div/>, <div/>], [<div/>, <div/>, <div/>, <div/>, <div/>], [<div/>, <div/>,
            <div/>, <div/>, <div/>], [<div/>, <div/>, <div/>, <div/>, <div/>], [<div/>, <div/>, <div/>, <div/>,
            <div/>]];

        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                var cell = chunk.cells[y][x];
                arr[y][x] = <div style={cellStyle(cell.color, x + 1, y + 1)} className={"cell"}></div>
            }
        }

        return <div id={chunk.id} onAnimationEnd={() => {
            let element = document.getElementById(chunk.id)
            if (element) {
                element.classList.remove("animation-chunk-loading-in")
                console.log(element.classList);
            } else {
                console.log("failed to get element")
                //ignore
            }
        }} onClick={() => {
            openChunkInfo(pos, chunk, id)
        }} className={"chunk animation-chunk-loading-in"}
                    aria-posx={x}
                    aria-posy={y}
                    style={chunkStyle(x, y)}>
            {arr}
        </div>;

    };
    const CreateNewChunk = async (y: number, x: number) => {
        console.log("y", y);
        console.log("x", x);
        if (id) {
            try {
                let chunkmodel = await PostNewChunk(id, y, x, props.authentication);
                chunks.push(await loadchunk(chunks.length - 1, chunkmodel, chunkmodel.name, chunkmodel.posY, chunkmodel.posX));
                setRemainingChunkHtmlBlock(undefined);
                setRemainingChunkHtmlBlock(chunks);
                ggrid.grid.push(chunkmodel);
                await sleep(10);
                createNewChunkPositions.splice(0, createNewChunkPositions.length);
                loadsides();
            } catch (exception) {
                console.log(exception);
                setError(<Alert variant={"warning"} onClick={() => {
                    setError(<></>)
                }}>{exception.message}</Alert>)
            }
        }
    };

    const loadPossibleNewChunk = async (y: number, x: number) => {
        return <div id={y+"yx"+x}
            onAnimationEnd={() => {
                let element = document.getElementById(y+"yx"+x);
                if (element) {
                    element.classList.remove("animation-new-chunk-loading-in")
                } else {
                    //ignore
                }
            }}
            className={"possible-new-chunk animation-new-chunk-loading-in"} onClick={() => CreateNewChunk(y, x)}
                    aria-posx={x}
                    aria-posy={y}
                    style={
                        chunkStyle(x, y)}>
            [{y},{x}]
        </div>
    };

    function sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const LoadRemainingChunks = async (ids: string[]) => {
        var newPartWorld = await LoadChunksOfWorld(ids);
        for (let i: number = 0; i < newPartWorld.chunks.length; i++) {
            let chunk: Chunk = newPartWorld.chunks[i];
            chunks.push(await loadchunk(chunks.length - 1, chunk, chunk.name, chunk.posY, chunk.posX))
            ggrid.grid.push(chunk);
        }
        await sleep(2);
        // setRemainingChunkHtmlBlock(undefined);
        // setRemainingChunkHtmlBlock(chunks);
        if (newPartWorld.doneLoading === false) {
            await LoadRemainingChunks(newPartWorld.remainingChunks);
        }
    };

    const initiliaze = async () => {
        try {
            chunks.splice(0, chunks.length);
            let grid = await GetWorldGrid(id);
            console.log("remaining", grid.remainingChunks);
            setGrid(grid);

            for (let y: number = 0; y < grid.grid.length; y++) {
                chunks.push(await loadchunk(chunks.length - 1, grid.grid[y], "chunk pos= [" + grid.grid[y].posY + 1 + "," + grid.grid[y].posX + 1 + "]", grid.grid[y].posY, grid.grid[y].posX));
            }

            if (grid.remainingChunks.length > 0) {
                await LoadRemainingChunks(grid.remainingChunks);
                setRemainingChunkHtmlBlock(undefined);
                setRemainingChunkHtmlBlock(chunks);
            }
            //setInitChunkHtmlBlock(chunks);
            setNewCellsHtmlBlock(await loadsides());
            chunks.shift();//first remove
            //setRemainingChunkHtmlBlock(chunks);
        } catch (error) {
            console.log(error);
            AddError(error);
        }
    };


    const loadsides = async (): Promise<any[]> => {

        //step 1 get a list of positions taken bij already existing chunks
        let arrayOfPositionOfAlreadyExistingChunks: TwoDPos[] = [];
        for (let i: number = 0; i < ggrid.grid.length; i++) {
            arrayOfPositionOfAlreadyExistingChunks.push(
                {
                    posX: ggrid.grid[i].posX,
                    posY: ggrid.grid[i].posY
                });
        }
        arrayOfPositionOfAlreadyExistingChunks.push({posX: 0, posY: 0});

        //step 2 create a list of possible new positions of chunks
        //step 2 CONDITION: the possible new positions must neighbour the chunk horizontally vertically or diagonal
        for (let i: number = 0; i < arrayOfPositionOfAlreadyExistingChunks.length; i++) {
            //step 2.1 Generate an array of possible neighbours
            //  0[x-1, y+1]    1[x  , y+1]    2[x+1, y+1]
            //  3[x-1, y  ]        pos        4[x+1, y  ]
            //  5[x-1, y-1]    6[x  , y-1]    7[x+1, y-1]
            let possibleNeighbours: TwoDPos[] = new Array(8);
            let pos: TwoDPos = arrayOfPositionOfAlreadyExistingChunks[i];
            for (let j: number = -1; j < 2; j++) {
                //filling in 0-1-2 of array possibleNeighbours.
                possibleNeighbours[j + 1] = {posX: pos.posX + j, posY: pos.posY + 1};
                //filling in 6-7-8 of array possibleNeighbours.
                possibleNeighbours[j + 6] = {posX: pos.posX + j, posY: pos.posY - 1}
            }
            //filling in 4 of array possibleNeighbours
            possibleNeighbours[3] = {posX: pos.posX - 1, posY: pos.posY};
            //filling in 5 of array possibleNeighbours
            possibleNeighbours[4] = {posX: pos.posX + 1, posY: pos.posY};

            let possibleNew: TwoDPos[] = new Array(8);
            for (let m: number = 0; m < possibleNeighbours.length; m++) {
                possibleNew[m] = possibleNeighbours[m];
            }
            for (let k: number = 0; k < createNewChunkPositions.length; k++) {
                for (let n: number = 0; n < possibleNeighbours.length; n++) {
                    if (possibleNeighbours[n].posX == createNewChunkPositions[k].posX && possibleNeighbours[n].posY == createNewChunkPositions[k].posY) {
                        possibleNew[n] = {posX: 0, posY: 0};
                    }
                }
            }

            for (let k: number = 0; k < arrayOfPositionOfAlreadyExistingChunks.length; k++) {
                for (let n: number = 0; n < possibleNeighbours.length; n++) {
                    if (possibleNeighbours[n].posX == arrayOfPositionOfAlreadyExistingChunks[k].posX && possibleNeighbours[n].posY == arrayOfPositionOfAlreadyExistingChunks[k].posY) {
                        possibleNew[n] = {posX: 0, posY: 0};
                    }
                }
            }

            //Step 2.3 If these position are not in the array put them in.
            for (let l: number = 0; l < possibleNew.length; l++) {
                if (possibleNew[l].posX === 0 && possibleNew[l].posY === 0) {
                } else {
                    createNewChunkPositions.push(possibleNew[l]);
                }
            }
        }
        let htmlofNewChunkPoss: any[] = [];
        for (let o: number = 0; o < createNewChunkPositions.length; o++) {
            htmlofNewChunkPoss.push(await loadPossibleNewChunk(createNewChunkPositions[o].posY, createNewChunkPositions[o].posX));
        }
        setNewCellsHtmlBlock(undefined);
        setNewCellsHtmlBlock(htmlofNewChunkPoss);
        return htmlofNewChunkPoss;
    };

    return (<div>
        {chunkDetailBlock}
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