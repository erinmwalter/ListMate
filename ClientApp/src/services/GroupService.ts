import { GroupInfo } from "../models/Group/GroupInfo";

export const GetGroupsForUser = async (token:string, userId:number|undefined) => {
    console.log(`in getgroupsforuser userId: ${userId}`)
    if(userId == undefined)
    {
        console.log("email was undefined, unable to retrieve user.");
        return null;
    }
    return await fetch(`api/group/byuser/${userId}`, {
        headers : {
            Authorization: `Bearer: ${token}`
        },
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export const GetGroupInfo = async(token:string, groupId:number|undefined) => {
    console.log(`in getgroupinfo groupId: ${groupId}`)
    if(groupId == undefined)
    {
        console.log("groupid was undefined, unable to retrieve user.");
        return null;
    }
    return await fetch(`/api/group/${groupId}`, {
        method: 'GET',
        headers : {
            Authorization: `Bearer: ${token}`
        },
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export const CreateGroupAsync = async (token:string, createGroupRequest:GroupInfo) => {
    console.log(createGroupRequest);
    const body = JSON.stringify(createGroupRequest);

    return await fetch("/api/group", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body
    }).then((response) => response.json());
}