import { ListItem } from "./ListItem";

export declare class ListInfo {
    listId: number;
    groupId: number;
    listName: string;
    listCategory: string;
    listItems: ListItem[];
}

export enum ListCategory {
    HOME = 0,
    SHOPPING = 1,
    TODO = 2,
    SCHOOL = 3,
    OTHER = 4
}