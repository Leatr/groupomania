import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import parse from "html-react-parser";
function Post({post}) {
return (
    <div>
        <Card className="p-2 text-center mx-auto border-1">
            <Card.Img style={{width: "50%"}} className={'rounded mx-auto d-block m-2'} variant="top" src={`${post.image}`} />
            <Card.Body className={'border-secondary'}>
                <Card.Title>{post.name}</Card.Title>
                <Card.Text>
                    {parse(post.description)}
                </Card.Text>
                <a href={`/posts/${post.id}/${post.id_user}`}>Show full post</a>
            </Card.Body>
        </Card>
    </div>
  );
}

export default Post;