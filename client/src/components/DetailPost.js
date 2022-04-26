import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Axios from 'axios';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Comment from "./Comment";
import Header from "./Header";
import { useNavigate } from 'react-router-dom';
import Role from '../helpers/roles';
import * as Icon from 'react-bootstrap-icons';

function DetailPost() {
    const { id } = useParams();
    const { user } = useParams();
    const [detailPost, setDetailPost] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [hasComments, setHasComments] = useState(false);

    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
    });
    const navigate = useNavigate();
    let formatedCreatedDate;
    
    const handleInputChange = (event) => {
        setuserInfo({
        ...userInfo,
        file:event.target.files[0],
        filepreview:URL.createObjectURL(event.target.files[0]),
        });
    }


//execute un bout de code au chargement de la page 
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
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3003/api/getUser",{ headers: {
                "x-access-token": localStorage.getItem("token"),
            }}).then((response) => {
                if(response.data) {
                    setCurrentUser(response.data.data[0]);
                }
            });
    }, []);

    useEffect(() => {
        if(comments.length > 0) {
            setHasComments(true);
        } 
    }, [comments]);

    const submitComment = () => {
        const req = Axios.post("http://localhost:3003/api/insertComment", {
            idPost: id,
            comment: comment, 
            firstName: currentUser.firstname,
        },
        {headers: {
            "x-access-token": localStorage.getItem("token"),
        }});
        req.then((res) => {return console.log("test")}); 
 
        setComments((comments) => [
            {
                "comment": comment,
                "firstname": currentUser.firstname,
              },
              ...comments,
          ]);
    }

    const deletePost = () => {
        Axios.delete(`http://localhost:3003/api/deletePost/${id}/${user}`,
        {headers: {
            "x-access-token": localStorage.getItem("token"),
        },
        data: {
            image: detailPost.image,
            hasComments: hasComments,
        }});
        navigate('/home');
    }
    const updatePost = async () => {
        const formdata = new FormData(); 
        formdata.append('avatar', userInfo.file);
        formdata.append('title', name);
        formdata.append('description', description);
        formdata.append('username', currentUser.firstname);
        formdata.append('idUser', user);
        formdata.append('idPost', id);
        formdata.append('oldImage', detailPost.image);

        Axios.put("http://localhost:3003/api/updatePost",    
           formdata,
            {
                headers: {
                "x-access-token": localStorage.getItem("token"),
                "Content-type": "multipart/form-data",
            },
        }).then(res => { // then print response status
            console.warn(res);
        });
    }

    const listComments = comments.map((comment) => <Comment key={comment.id} comment={comment}></Comment>);
  
    const handleDelete = () => {
        if(parseInt(currentUser.iduser) === parseInt(user) || Role.admin === currentUser.role) {
            return  <Button variant="danger" onClick={deletePost}> <Icon.Trash /> </Button>
        } 
    }

     //la date        
    if(detailPost.created_at) {
        const date = detailPost.created_at.split('T')[0];
        const time = detailPost.created_at.split('T')[1].split('.')[0];
      
        const year = date.split('-')[0];
        const month = date.split('-')[1];
        const day = date.split('-')[2];

        const postedDate = day + '/' + month + '/' + year + ' at ' + time;
        formatedCreatedDate = postedDate;
    }
    
return (
    <>
        <Header></Header>
        <div className="mx-auto col-6 m-3">
            <Card className="text-center">
                <Card.Header className="fw-bold cardHeaderColor text-white">{detailPost.name}</Card.Header>
                {detailPost.image ? <Card.Img style={{width: "33%"}} className={'rounded mx-auto d-block m-2'} variant="top" src={detailPost.image} /> : '' }
                    <Card.Body>
                        <Card.Text>
                        <div dangerouslySetInnerHTML={{ __html: detailPost.description }} />
                        </Card.Text>
                    </Card.Body>
                <Card.Footer>
                    <div className="text-muted float-end">
                        {'Postet by ' + detailPost.username + ' on ' + formatedCreatedDate}
                    </div>
                    <div className="text-muted float-start">
                        {handleDelete()}
                    </div>
                </Card.Footer>
            </Card>
            <Form className="mb-3">
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" onChange={(e) => { setName(e.target.value); }} name="title" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <ReactQuill theme="snow" value={description} onChange={setDescription} name="description"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                <Form.Label>Select image: </Form.Label>
                    <input type="file" className="form-control" name="upload_file"  onChange={handleInputChange} />
                </Form.Group>
                <Container>
                    {userInfo.filepreview !== null ? <img style={{width: "200px"}}  className="previewimg"  src={userInfo.filepreview} alt="UploadImage" /> : null}
                </Container>
                <Button variant="primary" onClick={updatePost}>
                    Update
                </Button>
            </Form>

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