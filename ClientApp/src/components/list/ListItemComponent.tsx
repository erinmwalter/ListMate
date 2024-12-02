import { Card, CardBody, Row, Col, Input, Button, Label } from "reactstrap";
import { ListItem } from "../../models/List/ListItem";
import React from "react";
import "./ListStyling.css";

interface ListItemComponentProps {
    item: ListItem;
    onToggleComplete: (item: ListItem, newValue: boolean) => void;
    onTogglePriority: (item: ListItem, newValue: boolean) => void;
}

const ListItemComponent: React.FC<ListItemComponentProps> = ({ 
    item, 
    onToggleComplete, 
    onTogglePriority 
}) => {
    return (
        <Card 
            className="mb-2" 
            style={{
                backgroundColor: item.isDone ? '#a2a8ab' : item.isHighPriority ? '#f5bcbd' : 'white',
                opacity: item.isDone ? 0.7 : 1,
                transition: 'all 0.3s ease'
            }}
        >
            <CardBody>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Input
                            type="checkbox"
                            checked={item.isDone}
                            onChange={(e) => onToggleComplete(item, e.target.checked)}
                            style={{
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer'
                            }}
                        />
                    </Col>
                    <Col>
                        <h6 className={`mb-0 ${item.isDone ? 'text-muted text-decoration-line-through' : ''}`}>
                            {item.itemName}
                        </h6>
                        {item.itemDescription && (
                            <small className={`${item.isDone ? 'text-muted' : ''}`}>
                                {item.itemDescription}
                            </small>
                        )}
                    </Col>
                    <Col xs="auto" className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                            <Input
                                type="checkbox"
                                id={`priority-switch-${item.itemId}`}
                                checked={item.isHighPriority}
                                onChange={(e) => onTogglePriority(item, e.target.checked)}
                                className="toggle-switch"
                            />
                            <Label 
                                for={`priority-switch-${item.itemId}`}
                                className={`mb-0 ${item.isHighPriority ? 'text-danger' : 'text-muted'}`}
                                style={{ cursor: 'pointer' }}
                            >
                                {item.isHighPriority && '⚡'} Priority
                            </Label>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default ListItemComponent;  