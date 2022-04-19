import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function NewPost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
       });
    
  const [isSucces, setSuccess] = useState(null);
  
  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file:event.target.files[0],
      filepreview:URL.createObjectURL(event.target.files[0]),
    });
  }
  
    const submitPost = async () => {
        const formdata = new FormData(); 
        formdata.append('avatar', userInfo.file);
        formdata.append('title', title);
        formdata.append('description', description);

        Axios.post("http://localhost:3003/api/insertPost", 
        formdata,
        {
            headers: {
                "x-access-token": localStorage.getItem("token"),
                "Content-type": "multipart/form-data",
            },
        } ).then(res => { // then print response status
            console.warn(res);
            if(res.data.success === 1){
              setSuccess("Image upload successfully");
            }
          });
    }

return (
    <>
        <h2>Create your own post</h2>
        <Form className="mb-3">
        <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" onChange={(e) => { setTitle(e.target.value); }} name="title" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <ReactQuill theme="snow" value={description} onChange={setDescription} name="description"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Select image: </Form.Label>
          <input type="file" className="form-control" name="upload_file"  onChange={handleInputChange} />
          </Form.Group>
        <div>
            {userInfo.filepreview !== null ? 
            <img style={{width: "200px"}}  className="previewimg"  src={userInfo.filepreview} alt="UploadImage" />
        : null}
        </div>

        <Button className='mt-2' variant="primary" onClick={submitPost}>
            Submit
        </Button>
        </Form>
    </>
  );
}

export default NewPost;