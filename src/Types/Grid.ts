import {Chunk} from "./Chunk";

export interface Grid{
    id : string,
    title : string,
    grid: Chunk[]
    remainingChunks : string[]
}

export const initGrid: Grid ={
    id : "emptyGuid",
    title: "loading....",
    grid : [],
    remainingChunks :[]
};