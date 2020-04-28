export interface World{
    WorldId : string,
    Titel: string,
    OwnerName : string,
    OwnerId : number
}

export interface WorldWithDetails{
    worldId: string,
    title: string,
    owner : Owner,
    writers: Writer[]
}

export interface Owner{
    id: number,
    name: string
}
export interface Writer{
    id: number,
    name: string
}
