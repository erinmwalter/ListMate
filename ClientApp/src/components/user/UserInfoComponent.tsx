import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useEffect, useState } from "react";
import { LoggedInUser } from "../../models/User/LoggedInUser";
import { GetCurrentUser } from "../../services/UserService";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import UserGroupsComponent from "./UserGroupsComponent";

const UserInfoComponent = () =>  {
    const  { getAccessTokenSilently, user } = useAuth0();
    const [currentUser, setCurrentUser] = useState<LoggedInUser>();
    const [accessToken, setAccessToken] = useState("");
  
    useEffect(() => {
      (async () => {
        await getAccessTokenSilently().then(async (token) => {
          setAccessToken(token);
          await GetCurrentUser(token, user?.email).then(async (currentUser: LoggedInUser) => {
            setCurrentUser(currentUser);
          });
        });
      })();
    }, []);
  
   
    return (
        <Container fluid>
          <Row>
            <Col>
              <Card className="welcome-card">
                <CardBody className="text-center">
                  <h2 className="welcome-message">
                    Welcome, {currentUser?.firstName} {currentUser?.lastName}!
                  </h2>
                  <p className="welcome-subtext">
                    Here are your groups and options to create new ones.
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <UserGroupsComponent />
            </Col>
          </Row>
        </Container>
      );
}
    
  
  export default UserInfoComponent;
