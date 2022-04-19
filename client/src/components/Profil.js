import { React, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profil = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [connectedUser, setConnectedUser] = useState(false); 
    
    useEffect(() => {
        Axios.get("http://localhost:3003/api/getUser",{ headers: {
        "x-access-token": localStorage.getItem("token"),
        }}).then((response) => {
            setConnectedUser(response.data.auth);
            if(!response.data.auth) {
                navigate('/signup')
            }
        });
      }, []);
 
    const submitPassword = () => {
        Axios.put("http://localhost:3003/api/updateUserPassword", {
            password: password,
        },
        {headers: {
            "x-access-token": localStorage.getItem("token"),
        }});
    }

    const submitEmail = () => {
        Axios.put("http://localhost:3003/api/updateUserEmail", {
            email: email,
        },
        {headers: {
            "x-access-token": localStorage.getItem("token"),
        }});
    }

    const deleteUser = () => {
        Axios.delete("http://localhost:3003/api/deleteUser",
        {headers: {
            "x-access-token": localStorage.getItem("token"),
        }});
    }
 
    return(
        <>
            <Header></Header>
            {connectedUser ?    
                <Container fluid="md col-4">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Modify your email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value); }}/>
                            <Form.Text className="text-muted">
                            Enter your new email
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" onClick={submitEmail}>
                            Submit
                        </Button>
                </Form>

                <Form>
                    <Form.Group className="mb-3" controlId="newPassword">
                        <Form.Label>New pessword</Form.Label>
                        <Form.Control type="password" name="newPassword" placeholder="New Password" onChange={(e) => { setPassword(e.target.value); }}/>
                        <Form.Text className="text-muted">
                            Enter your new password
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" onClick={submitPassword}>
                        Submit
                    </Button>
                </Form>

                <Form>
                    <Form.Group className="mb-3 border-top mt-4">
                        <Form.Label>Delete Profile</Form.Label>
                        <div> 
                            <p className="alert-danger p-3">WARNING: This action will delete your account!</p>
                        </div>
                    </Form.Group>
                    <Button variant="danger" onClick={deleteUser}>
                        DELETE ACCOUNT
                    </Button>
                </Form>
                </Container>
            : "" }
        </>
    );
}

export default Profil;