export interface World{
    WorldId : string,
    Titel: string,
    OwnerName : string,
    OwnerId : string
}

export interface WorldWithDetails{
    worldId: string,
    title: string,
    owner : Owner,
    writers: Writer[]
}

export interface Owner{
    id: string,
    name: string
}
export interface Writer{
    id: string,
    name: string
}
