import React from 'react';
import {Owner, Writer} from "../Types/World";

export interface WorldWithFollowers {
    worldId : string,
    title: string,
    owner: Owner,
    writers: Writer[],
    followers: Writer[]
}