import {StoryRef} from "./StoryRef";

export interface WorldWithStories{
    id : string,
    title: string,
    stories: StoryRef[]
}