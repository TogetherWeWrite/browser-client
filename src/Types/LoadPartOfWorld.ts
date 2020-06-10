import {Chunk} from "./Chunk";

export interface LoadPartOfWorld {
    RemainingChunks : string[],
    Chunks : Chunk[],
    DoneLoading: boolean
}

export interface LoadPartOfWorldResult {
    remainingChunks : string[],
    chunks : Chunk[],
    doneLoading: boolean
}