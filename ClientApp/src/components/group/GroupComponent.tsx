import {useNavigate, useParams } from "react-router-dom";
import { LoggedInUser } from "../../models/User/LoggedInUser";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ListInfo } from "../../models/List/ListInfo";
import { AddListItemAsync, AddNewListAsync, GetListsForGroup, UpdateListItemAsync } from "../../services/ListService";
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Collapse, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { GroupInfo } from "../../models/Group/GroupInfo";
import { GetGroupInfo } from "../../services/GroupService";
import { GetCurrentUser } from "../../services/UserService";
import { ListItem } from "../../models/List/ListItem";
import "./GroupStyling.css";
import ListItemComponent from "../list/ListItemComponent";

const GroupComponent = () => {
	let navigate = useNavigate();
    let { id } = useParams();
    const  { getAccessTokenSilently, user } = useAuth0();
    const [accessToken, setAccessToken] = useState("");
    const [listsForGroup, setListsForGroup] = useState<ListInfo[]>([]);
    const [groupInfo, setGroupInfo] = useState<GroupInfo>();
    const [currentUser, setCurrentUser] = useState<LoggedInUser>();
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);
    const [showAddListForm, setShowAddListForm] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [newListCategory, setNewListCategory] = useState('');
    const [showInviteForm, setShowInviteForm] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [selectedListId, setSelectedListId] = useState<number | null>(null);
    const [editableParamProps, setEditableParamProps] = useState<ListItem>({
        itemId: 0,
        listId: 0,
        itemName: "",
        itemDescription: "",
        isDone: false,
        isHighPriority: false
    });

    useEffect(() => {
        (async () => {
          await getAccessTokenSilently().then(async (token) => {
            setAccessToken(token);
            await GetCurrentUser(token, user?.email).then(async (currentUser: LoggedInUser) => {
                setCurrentUser(currentUser);});
        if (id != null){
            let userid:number = parseInt(id);
            await GetListsForGroup(token, parseInt(id)).then(async (returnedLists: ListInfo[]) => {
              setListsForGroup(returnedLists);
            });
            await GetGroupInfo(token, parseInt(id)).then (async (groupInfo: GroupInfo) => {
                setGroupInfo(groupInfo);
            })
        }
          });
        })();
      }, []);

      const toggleAccordion = (listId: number) => {
        setOpenAccordion(openAccordion === listId ? null : listId);
    };

    const handleAddList = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        let newList: ListInfo = {
            listId: 0, // will be set by database
            groupId: parseInt(id),
            listName: newListName,
            listCategory: newListCategory,
            listItems: [] // empty array for new list
        };
        await AddNewListAsync(accessToken, newList);
        const updatedLists = await GetListsForGroup(accessToken, parseInt(id));
        setListsForGroup(updatedLists);
        setNewListName('');
        setNewListCategory('');
        setShowAddListForm(false);
    };
    
    const handleInviteUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser || !groupInfo) return;

        const subject = "Join my group on ListMate";
        const body = `${currentUser.firstName} ${currentUser.lastName} has invited you to join their group ${groupInfo.groupName} (ID: ${groupInfo.groupId}) on ListMate! Click Here to get started!`;

        // Create mailto URL
        const mailtoUrl = `mailto:${inviteEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
        // Open default email client
        window.location.href = mailtoUrl;
        setInviteEmail('');
        setShowInviteForm(false);
    };
    
    const handleToggleComplete = async (item: ListItem, newValue: boolean) => {
        const updatedLists = listsForGroup.map(list => ({
            ...list,
            listItems: list.listItems?.map(listItem => {
                if (listItem.itemId === item.itemId) {
                    return { ...listItem, isDone: newValue, isHighPriority: newValue ? false : listItem.isHighPriority };
                }
                return listItem;
            })
        }));
    
        setListsForGroup(updatedLists);
    
        try {
            const updatedItem = { ...item, isDone: newValue };
            await UpdateListItemAsync(accessToken, updatedItem);
        } catch (error) {
            console.error('Error updating item:', error);
            setListsForGroup(listsForGroup);
        }
    };
    
    const handleTogglePriority = async (item: ListItem, newValue: boolean) => {
        const updatedLists = listsForGroup.map(list => ({
            ...list,
            listItems: list.listItems?.map(listItem => {
                if (listItem.itemId === item.itemId) {
                    return { ...listItem, isHighPriority: newValue };
                }
                return listItem;
            })
        }));
    
        setListsForGroup(updatedLists);
    
        try {
            const updatedItem = { ...item, isHighPriority: newValue };
            await UpdateListItemAsync(accessToken, updatedItem);
        } catch (error) {
            console.error('Error updating item:', error);
            setListsForGroup(listsForGroup);
        }
    };

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedListId) return;
    
        try {
            const itemToAdd: ListItem = {
                ...editableParamProps,
                listId: selectedListId,
                isDone: false
            };
    
            await AddListItemAsync(accessToken, itemToAdd);
    
            // Refresh the lists
            if (id) {
                const updatedLists = await GetListsForGroup(accessToken, parseInt(id));
                setListsForGroup(updatedLists);
            }
    
            // Reset form and close modal
            setEditableParamProps({
                itemId: 0,
                listId: 0,
                itemName: "",
                itemDescription: "",
                isDone: false,
                isHighPriority: false
            });
            setShowAddItemModal(false);
            setSelectedListId(null);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <>
        <Modal isOpen={showInviteForm} toggle={() => setShowInviteForm(false)}>
        <ModalHeader>Invite User to Group</ModalHeader>
        <ModalBody>
            <Form onSubmit={handleInviteUser}>
                <FormGroup>
                <Label>Email Address</Label>
                <Input 
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                />
                </FormGroup>
                <Button color="primary" type="submit">Send Invite</Button>
            </Form>
            </ModalBody>
            </Modal>

            <Modal isOpen={showAddListForm} toggle={() => setShowAddListForm(false)}>

            <ModalHeader>Create New List</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleAddList}>
                        <FormGroup>
                        <Label for="listName">List Name</Label>
                            <Input
                                 id="listName"
                                 value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                        <Label for="category">Category</Label>
                            <Input
                                 id="category"
                                 value={newListCategory}
                                onChange={(e) => setNewListCategory(e.target.value)}
                                required
                            />
                        </FormGroup>
                    <Button color="primary" type="submit">
                            Create List
                        </Button>
                </Form>
            </ModalBody>
            </Modal>

            <Modal isOpen={showAddItemModal} toggle={() => setShowAddItemModal(false)}>
            <ModalHeader>Add Item to {listsForGroup.find(list => list.listId === selectedListId)?.listName}</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleAddItem}>
            <Row>
                <FormGroup>
                    <Col md={4}>
                        <Label for="itemName">Item Name</Label>
                        <Input
                            id="iitemName"
                            name="itemName"
                            type="text"
                            value={editableParamProps?.itemName}
                            onChange={(e) => 
                                setEditableParamProps((editableParamProps) => ({
                                    ...editableParamProps,
                                    ...{itemName: e.target.value}
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
                        <Label for="itemDescription">Description</Label>
                        <Input
                            id="iitemDescription"
                            name="itemDescription"
                            type="text"
                            value={editableParamProps?.itemDescription}
                            onChange={(e) => 
                                setEditableParamProps((editableParamProps) => ({
                                    ...editableParamProps,
                                    ...{itemDescription: e.target.value}
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
                        <Label check>
                            <Input
                                type="checkbox"
                                checked={editableParamProps?.isHighPriority}
                                onChange={(e) => 
                                    setEditableParamProps((editableParamProps) => ({
                                        ...editableParamProps,
                                        ...{isHighPriority: e.target.checked}
                                    }))
                                }
                            />
                            {' '}High Priority
                        </Label>
                    </Col>
                </FormGroup>
            </Row>
            <Row style={{paddingTop:"10px"}}>
                <Col md={2}>
                    <Button color="primary" type="submit">Submit</Button>
                </Col>
            </Row>
        </Form>
    </ModalBody>
</Modal>

        <Container>
            {groupInfo && (
                <Card className="mb-4">
                    <CardBody>
                        <Row>
                            <Col md={9}>
                                <h2>{groupInfo.groupName}</h2>
                                <p>{groupInfo.description}</p>
                            </Col>
                            <Col>
                            <Button 
                        color="primary" 
                        className="mb-3"
                        onClick={() => setShowAddListForm(true)}
                    >
                        Add New List
                    </Button>
                    <Button 
                        color="info" 
                        className="mb-3 ms-2"
                        onClick={() => setShowInviteForm(true)}
                    >
                        Invite User
                    </Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            )}
            {listsForGroup && listsForGroup.length > 0 ? (
                listsForGroup.map((list) => (
                    <Card key={list.listId} className="mb-2">
                        <CardHeader 
                            onClick={() => toggleAccordion(list.listId)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Row>
                                <Col mb={8}>
                                    <h5>{list.listName}</h5>
                                </Col>
                                <Col xs="auto">
                                    <Button 
                                        color="primary" 
                                        size="sm"
                                        style={{marginRight:"10px"}} 
                                        onClick={(e) => {
                                             e.stopPropagation(); 
                                            setSelectedListId(list.listId);
                                            setShowAddItemModal(true);
                                            }}
                                            >
                                        Add Item
                                    </Button>
                                    <span>{openAccordion === list.listId ? '▼' : '▶'}</span>
                                </Col>
                            </Row>
                        </CardHeader>
                        <Collapse isOpen={openAccordion === list.listId}>
                            <CardBody>
                            {list.listItems
                                    ?.sort((a, b) => {
                                    // High priority items at top
                                     if (a.isHighPriority !== b.isHighPriority) {
                                               return b.isHighPriority ? 1 : -1;
                                        }
                                    // Completed items at bottom
                                    if (a.isDone !== b.isDone) {
                                             return a.isDone ? 1 : -1;
                                    }
                                        return 0;
                                    })
                                .map((item: ListItem) => (
                                         <ListItemComponent 
                                                key={item.itemId} 
                                                item={item}
                                                onToggleComplete={handleToggleComplete}
                                                onTogglePriority={handleTogglePriority}
                                            />
                                ))
                            }
                            </CardBody>
                        </Collapse>
                    </Card>
                ))
            ) : (
                <Card>
                    <CardBody>
                        <p className="text-center mb-0">No active lists for this group</p>
                    </CardBody>
                </Card>
            )}
        </Container>  
        </> 
    );
  }

  export default GroupComponent;

