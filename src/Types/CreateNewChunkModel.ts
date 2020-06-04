export interface CreateNewChunkModel {
    WorldId: string
    Name: string,
    PosX: number,
    PosY: number
}

export const initCreateNewChunkModel : CreateNewChunkModel ={
    WorldId : "",
    Name : "New Chunk",
    PosX : 1,
    PosY : 1
};