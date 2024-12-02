import { Auth0ContextInterface, User, useAuth0, withAuth0 } from "@auth0/auth0-react";
import React, { Component, useEffect, useState } from "react";
import { LoggedInUser } from "../../models/User/LoggedInUser";
import { GetCurrentUser } from "../../services/UserService";
import CreateUserForm from "../user/CreateUserForm";
import UserInfoComponent from "../user/UserInfoComponent";

const Home = () =>  {
  const  { getAccessTokenSilently, loginWithRedirect, user, isAuthenticated } = useAuth0();
  const [currentUser, setCurrentUser] = useState<LoggedInUser>();
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await getAccessTokenSilently().then(async (token) => {
        setAccessToken(token);
        await GetCurrentUser(token, user?.email).then(async (currentUser: LoggedInUser) => {
          setCurrentUser(currentUser);
        }).finally(() => setIsLoading(false));
      });
    })();
  }, []);



  if(!isLoading && isAuthenticated && currentUser != undefined)
    {
      return (
        <>
        <UserInfoComponent/>
        </>
      );
    }
    else if(!isLoading && isAuthenticated && currentUser == undefined)
    {
      return (
        <>
        <CreateUserForm/>
        </>
      );
    }
    else{
    return ( 
      <>
       <p>Loading...</p>
      </>
    );
    }
  
}

export default Home;