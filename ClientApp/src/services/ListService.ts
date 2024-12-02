import { ListInfo } from "../models/List/ListInfo";
import { ListItem } from "../models/List/ListItem";

export const GetListsForGroup = async (token:string, groupId:number|undefined) => {
    console.log(`in getlistsforgroup groupId: ${groupId}`);
    if(groupId == undefined)
    {
        console.log("groupId was undefined, unable to retrieve user.");
        return null;
    }
    return await fetch(`/api/list/bygroup/${groupId}`, {
        method: 'GET',
        headers : {
            Authorization: `Bearer: ${token}`
        },
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export const AddNewListAsync = async (token: string, listInfo: ListInfo) => {
    return await fetch('/api/list/create', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listInfo)
    }).then(response => response.json());
};

export const AddListItemAsync = async (token: string, listItem: ListItem) => {
    return await fetch('/api/list/add', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listItem)
    }).then(response => response.json());
};

export const UpdateListItemAsync = async (token: string, updates: ListItem) => {
    return await fetch(`/api/list/updateItem`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
    }).then(response => response.json());
};