import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

function Post({post}) {
return (
    <div>
        <Card className="p-2 text-center mx-auto border-1">
            <Card.Header>{post.username}</Card.Header>
            {post.image ? <Card.Img style={{width: "50%"}} className={'rounded mx-auto d-block m-2'} variant="top" src={`${post.image}`} /> : '' }
            <Card.Body className={'border-secondary'}>
                <Card.Title className="fw-bold">{post.name}</Card.Title>
                <Card.Text>
                    <div dangerouslySetInnerHTML={{ __html: post.description}} /> 
                </Card.Text>
                {post.id ? <a href={`/posts/${post.id}/${post.id_user}`}>Show full post</a> : <p className='alert-success rounded p-3'>New post added with success !</p>}
            </Card.Body>
        </Card>
    </div>
  );
}

export default Post;