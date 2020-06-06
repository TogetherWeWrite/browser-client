import {Cell} from "./Cell";

export interface Chunk{
    id : string,
    name : string,
    cells : Cell[][],
    posX : number,
    posY : number
}