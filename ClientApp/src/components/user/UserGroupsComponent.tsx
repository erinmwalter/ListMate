import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useEffect, useState } from "react";
import { Col, Row, Container, Card, CardTitle, CardBody, CardHeader } from "reactstrap";
import { LoggedInUser } from "../../models/User/LoggedInUser";
import { CreateUserAsync, GetCurrentUser } from "../../services/UserService";
import { GetGroupsForUser } from "../../services/GroupService";
import { GroupInfo } from "../../models/Group/GroupInfo";
import { useNavigate } from "react-router-dom";
import CreateGroupForm from "../group/CreateGroupForm";
import "./UserStyling.css";

const UserGroupsComponent = () =>  {
    let navigate = useNavigate();
    const  { getAccessTokenSilently, loginWithRedirect, user } = useAuth0();
    const [currentUser, setCurrentUser] = useState<LoggedInUser>();
    const [accessToken, setAccessToken] = useState("");
    const [currentGroups, setCurrentGroups] = useState<GroupInfo[]>([]);
  
    useEffect(() => {
      (async () => {
        await getAccessTokenSilently().then(async (token) => {
          setAccessToken(token);
          });
         await GetCurrentUser(accessToken, user?.email).then(async (currentUser: LoggedInUser) => {
            setCurrentUser(currentUser);
            let currUser = currentUser;
          await GetGroupsForUser(accessToken, currUser?.userId).then(async (currentGroups: GroupInfo[]) => {
            setCurrentGroups(currentGroups);
          });
        });
      })();
    }, []);

    const routeChange = (id: number) => {
        navigate(`/group/${id}`);
      };
  
  
  
   
      return (
        <Container fluid>
          <Row>
            {/* Left Column - Groups List */}
            <Col md={6}>
              <Card className="user-groups-card">
                <CardHeader className="bg-primary text-white">
                  <h3 className="mb-0">Your Current Groups</h3>
                </CardHeader>
                <CardBody>
                  {currentGroups && currentGroups.length > 0 ? (
                    currentGroups.map((group) => (
                      <Card
                        key={group.groupId}
                        className="mb-2 hover-card group-item-card"
                        onClick={() => routeChange(group.groupId)}
                      >
                        <CardBody>
                          <h5 className="mb-1">{group.groupName}</h5>
                          {group.description && (
                            <p className="text-muted small mb-0">{group.description}</p>
                          )}
                        </CardBody>
                      </Card>
                    ))
                  ) : (
                    <Card className="no-groups-card">
                      <CardBody>
                        <p className="text-center mb-0 text-muted">
                          No groups to display.
                        </p>
                      </CardBody>
                    </Card>
                  )}
                </CardBody>
              </Card>
            </Col>
    
            {/* Right Column - Create Group Form */}
            <Col md={6}>
              <Card className="user-groups-card">
                <CardHeader className="bg-success text-white">
                  <h3 className="mb-0">Create New Group</h3>
                </CardHeader>
                <CardBody>
                  <CreateGroupForm />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      );
}
    
  
  export default UserGroupsComponent;