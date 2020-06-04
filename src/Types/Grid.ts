import {Chunk} from "./Chunk";

export interface Grid{
    id : string,
    title : string,
    grid: Chunk[]
}

export const initGrid: Grid ={
    id : "emptyGuid",
    title: "loading....",
    grid : []
};