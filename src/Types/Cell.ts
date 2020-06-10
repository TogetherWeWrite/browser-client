import {Page} from "./Page";

export interface Cell{
    id: string,
    cellName: string,
    color: string,
    attachedPages: Page[]
}