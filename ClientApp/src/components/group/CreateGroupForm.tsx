import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useEffect, useState } from "react";
import { Col, Input, Label, Row, Form, FormGroup, Button } from "reactstrap";
import { LoggedInUser } from "../../models/User/LoggedInUser";
import { CreateUserAsync, GetCurrentUser } from "../../services/UserService";
import { GroupInfo } from "../../models/Group/GroupInfo";
import { CreateGroupAsync } from "../../services/GroupService";

const CreateGroupForm:React.FC = () => {
    const { getAccessTokenSilently, user } = useAuth0();
    const [accessToken, setAccessToken] = useState("");
    const [currentUser, setCurrentUser] = useState<LoggedInUser>();

    const [editableParamProps, setEditableParamProps] = useState<GroupInfo>({
        groupId: 0,
        groupName: "",
        description: ""
    });

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

    
    const CreateGroup = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        let createGroupRequest: GroupInfo = {
            ...editableParamProps,
            createdBy: currentUser?.userId
        };
        
        console.log("Sending this data:", createGroupRequest);
      await CreateGroupAsync(accessToken, createGroupRequest);
      
    }
      return(
        <>
          <Form onSubmit={CreateGroup}>
            <Row>
              <FormGroup>
                <Col md={4}>
                  <Label for="groupName">Name</Label>
                  <Input
                    id="igroupName"
                    name="groupName"
                    type="text"
                    value={editableParamProps?.groupName}
                    onChange = {(e) => 
                        setEditableParamProps((editableParamProps) => ({
                        ...editableParamProps,
                        ...{groupName: e.target.value }
                      })) 
                    }
                  >
                  </Input>
                </Col>
              </FormGroup>
            </Row>
            <Row>
              <FormGroup>
                <Col md={4}>
                  <Label for="description">Description</Label>
                  <Input
                    id="idescription"
                    name="description"
                    type="text"
                    value={editableParamProps?.description}
                    onChange = {(e) => 
                      setEditableParamProps((editableParamProps) => ({
                      ...editableParamProps,
                      ...{description: e.target.value }
                    })) 
                  }
                  >
                  </Input>
                </Col>
              </FormGroup>
            </Row>
            <Row style={{paddingTop:"10px"}}>
                <Col md={2}>
                <Button color="primary" type="submit">Submit</Button>
                </Col>
              </Row>
          </Form>
        </>
      );
};

 export default CreateGroupForm;