import { React } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import Header from './Header';
import Post from './Post';
import NewPost from './NewPost';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [postsList, setPostsList] = useState([]);
    const navigate = useNavigate();
    const [connectedUser, setConnectedUser] = useState(false); 

    useEffect(() => {
        Axios.get("http://localhost:3003/api/getUser",{ headers: {
        "x-access-token": localStorage.getItem("token"),
        }}).then((response) => {
            setConnectedUser(response.data.auth);
        });
      }, [connectedUser]);
      
    useEffect(() => {
        Axios.get("http://localhost:3003/api/getAllPosts", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        }).then((response) => {
            setPostsList(response.data);
        });
    }, []);

    const callbackAddPost = (newPost) => {
        setPostsList((postsList) => [
          newPost,
          ...postsList,
        ]);
    };

    const listPosts = postsList.map((post, index) => <Post key={index} post={post}></Post>);
    return(
        <>
            <Header></Header>
            {connectedUser ?
            <Container>
                <NewPost callbackAddPost={callbackAddPost}></NewPost>
                <Row xs={1} md={3} className="g-4">
                    {listPosts}
                </Row>
            </Container>
            : "" }
        </>
    );
}

export default Home;