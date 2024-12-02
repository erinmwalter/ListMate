import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useEffect, useState } from "react";
import { Col, Input, Label, Row, Form, FormGroup, Button } from "reactstrap";
import { LoggedInUser } from "../../models/User/LoggedInUser";
import { CreateUserAsync } from "../../services/UserService";

const CreateUserForm:React.FC = () => {
    const { getAccessTokenSilently, user } = useAuth0();
    const [accessToken, setAccessToken] = useState("");

    const [editableParamProps, setEditableParamProps] = useState<LoggedInUser>({
        userId: 0,
        firstName: "",
        lastName: "",
        emailAddress: user?.email == undefined ? "" : user.email
    });

    useEffect(() => {
        (async () => {
          await getAccessTokenSilently().then(async (token) => {
            setAccessToken(token);
          });
        })();
      }, []);
    
    const CreateUser = async (ev: React.FormEvent<HTMLFormElement>) => {
      let createUserRequest: LoggedInUser  = editableParamProps;
      await CreateUserAsync(accessToken, createUserRequest).then((response:LoggedInUser) => {});
      window.location.reload();
    }
      return(
        <>
          <Form onSubmit = {CreateUser}>
            <Row>
                <h3>Welcome to ListMate App</h3>
            </Row>
            <Row>
                <h5>This seems to be your first time here.</h5>
            </Row>
            <Row>
                <p></p>
            </Row>
            <Row>
              <Col>
                <h5>Create User Profile</h5>
              </Col>
            </Row>
            <Row>
              <FormGroup>
                <Col md={4}>
                  <Label for="email">Email</Label>
                </Col>
                <Col>
                    {editableParamProps?.emailAddress}
                </Col>
              </FormGroup>
            </Row>
            <Row>
              <FormGroup>
                <Col md={4}>
                  <Label for="firstName">First Name</Label>
                  <Input
                    id="ifirstname"
                    name="firstname"
                    type="text"
                    value={editableParamProps?.firstName}
                    onChange = {(e) => 
                      setEditableParamProps((editableParamProps) => ({
                      ...editableParamProps,
                      ...{firstName: e.target.value }
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
                  <Label for="lastName">Last Name</Label>
                  <Input
                    id="ilastname"
                    name="lastName"
                    type="text"
                    value={editableParamProps?.lastName}
                    onChange={(e) =>
                      setEditableParamProps((editableParamProps) => ({
                        ...editableParamProps,
                        ...{ lastName: e.target.value }
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

 export default CreateUserForm;