import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from "html-react-parser";
import Comment from "./Comment";
import Header from "./Header";
import { useNavigate } from 'react-router-dom';
import Role from '../helpers/roles';

function DetailPost() {
    const { id } = useParams();
    const { user } = useParams();
    const [detailPost, setDetailPost] = useState([]);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get("http://localhost:3003/api/getOnePost",{ headers: {
            "x-access-token": localStorage.getItem("token"),
        },
        params: {
            id: id,
            idUser: user
        }}).then((response) => {
        setDetailPost(response.data[0]);
    });

    Axios.get("http://localhost:3003/api/getComments",{ headers: {
            "x-access-token": localStorage.getItem("token"),
        },
        params: {
            idPost: id
        }}).then((response) => {
        setComments(response.data);
    });

 
    Axios.get("http://localhost:3003/api/getUser",{ headers: {
        "x-access-token": localStorage.getItem("token"),
            }}).then((response) => {
                if(response.data) {
                    setCurrentUser(response.data.data[0]);
                }
                if(!response.data.auth) {
                    navigate('/signup')
                }
            });
    }, []);

    const submitComment = () => {
        Axios.post("http://localhost:3003/api/insertComment", {
            idPost: id,
            idUser: user,
            comment: comment, 
            firstName: currentUser.firstname
        },
        {headers: {
            "x-access-token": localStorage.getItem("token"),
        }});
    }

    const deletePost = () => {
        Axios.delete(`http://localhost:3003/api/deletePost/${id}/${user}`,
        {headers: {
            "x-access-token": localStorage.getItem("token"),
        },
        data: {
            image: detailPost.image
        }});
        navigate('/home');
    }

    const listComments = comments.map((comment) => <Comment key={comment.id} comment={comment}></Comment>);
  
    const handleDelete = () => {
        if(parseInt(currentUser.iduser) === parseInt(user) || Role.admin === currentUser.role) {
            return  <Button variant="danger" onClick={deletePost}> Delete </Button>
        } 
    }


return (
    <>
    <Header></Header>
    <div className="mx-auto col-6 m-3">
        <Card className="text-center">
            <Card.Header>{detailPost.name}</Card.Header>
            <Card.Img style={{width: "33%"}} className={'rounded mx-auto d-block m-2'} variant="top" src={detailPost.image} />
                <Card.Body>
                    <Card.Text>
                        {detailPost.description}
                    </Card.Text>
                    {handleDelete()}
                </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
        
        <Form className="mb-3 mt-3 border-top border-info">
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Write comment</Form.Label>
                <ReactQuill theme="snow" value={comment} onChange={setComment} name="comment"/>
            </Form.Group>
       
            <Button variant="primary" onClick={submitComment}>
                Comment
            </Button>
        </Form>
        <h3>Comments for this post</h3>
        {listComments}
    </div>
    </>
  );
}

export default DetailPost;