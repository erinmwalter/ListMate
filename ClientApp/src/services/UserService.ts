import { LoggedInUser } from "../models/User/LoggedInUser";

export const GetCurrentUser = async (token:string, email:string|undefined) => {
    console.log(`in getcurrentuser email: ${email}`)
    if(email == undefined)
    {
        console.log("email was undefined, unable to retrieve user.");
        return null;
    }
    return await fetch(`/api/user/${email}`, {
        headers : {
            Authorization: `Bearer: ${token}`
        },
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export const CreateUserAsync = async (token:string, createUserRequest:LoggedInUser) => {
    const body = JSON.stringify(createUserRequest);

    return await fetch("/api/user", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body
    }).then((response) => response.json());
}