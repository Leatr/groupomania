import { React, useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Role from '../helpers/roles';

const Comment = ({comment}) => {
    const [currentUser, setCurrentUser] = useState([]);
    const elementComment = useRef(null);
    useEffect(() => {
        Axios.get("http://localhost:3003/api/getUser",{ headers: {
                    "x-access-token": localStorage.getItem("token"),
                }}).then((response) => {
                if(response.data) {
                    setCurrentUser(response.data.data[0]);
                }
            });
    }, []);
    
    const deleteComment = (e) => {
        elementComment.current.remove();
        Axios.delete(`http://localhost:3003/api/deleteComment`,
        {headers: {
            "x-access-token": localStorage.getItem("token"),
        },
        data: {
            idComment: comment.id,
            idUser: comment.id_user
        }});
    }

    const handleDelete = () => {
        if(parseInt(currentUser.iduser) === parseInt(comment.id_user) || Role.admin === currentUser.role) {
            return <Button className="m-2 bi bi-x-square float-end" variant="danger" onClick={deleteComment}>delete</Button>
        } 
    }

    return(
        <>
            <Card ref={elementComment} className="mb-2">
                <Card.Header className="fw-bold">{comment.firstname}                 
                    {handleDelete()}
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div dangerouslySetInnerHTML={{ __html: comment.comment}} />
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default Comment;