import { Auth0ContextInterface, User, useAuth0, withAuth0 } from "@auth0/auth0-react";
import React, { Component } from "react";
import WeatherForecast from "../WeatherForecast/WeatherForecast";

type AuthProps = {
  auth0: Auth0ContextInterface<User>;
};

class Home extends Component<AuthProps> {
  static displayName = Home.name;
  user?:User;

  constructor(props: AuthProps | Readonly<AuthProps>) {
    super(props);

    this.user = this.props.auth0.user;
    
  }

  render() {
    return (
      <>
      <WeatherForecast/>
      </>
    );
  }
}

export default  withAuth0(Home);