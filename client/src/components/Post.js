import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import {useState, useEffect}  from 'react';
import Axios from 'axios';

function Post({post}) {
    const [detailPost, setDetailPost] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3003/api/getOnePost",{ headers: {
            "x-access-token": localStorage.getItem("token"),
        },
        params: {
            id: post.id,
            idUser: post.id_user
        }}).then((response) => {
            setDetailPost(response.data[0]);
        });
    }, []);

return (
    <div>
        <Card className="text-center mx-auto border-1">
            <Card.Header className="cardHeaderColor text-white">{post.username}</Card.Header>
            {post.image ? <Card.Img style={{width: "50%"}} className={'rounded mx-auto d-block m-2'} variant="top" src={`${post.image}`} /> : '' }
            <Card.Body className={'border-secondary'}>
                <Card.Title className="fw-bold">{detailPost.firstName}</Card.Title>
                <Card.Text>
                    <div dangerouslySetInnerHTML={{ __html: post.description}} /> 
                </Card.Text>
                {post.id ? <a href={`/posts/${post.id}/${post.id_user}`}>Show full post</a> : <p className='alert-success rounded p-3'>New post added with success !</p>}
                </Card.Body>
                <Card.Footer className="text-muted">                    
                    <Badge pill bg="success">
                        Comments: {detailPost.nbComments}
                    </Badge>{' '}
                </Card.Footer>
        </Card>
    </div>
  );
}

export default Post;