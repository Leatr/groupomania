import { React, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';

const Comment = ({comment}) => {

    return(
        <>
            <Card className="mb-2">
                <Card.Header>{comment.firstname}</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        {comment.comment}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default Comment;