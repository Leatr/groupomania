import { React } from "react";
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();


    const submitUser = () => {
        Axios.post("http://localhost:3003/api/signup", {
            firstName: firstName,
            lastName: lastName,
            password: password,
            email: email
        });
        navigate('/signin')
    }

    return(
        <>
            <Header></Header>
            <Container fluid="md">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <div className="bg-light p-5 mb-4">
                            <div className="text-center"> Create account </div>
                        </div>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => { setEmail(e.target.value); }}/>
                                <Form.Text className="text-muted">
                                    Please enter your professional email
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formFirstName">
                                <Form.Label>Your firstname</Form.Label>
                                <Form.Control type="firstName" placeholder="Enter your firsname" name="firstName" onChange={(e) => { setFirstName(e.target.value); }}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formLastName">
                                <Form.Label>Your lastname</Form.Label>
                                <Form.Control type="lastName" placeholder="Enter your lastname" name="lastName" onChange={(e) => { setLastName(e.target.value); }}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => { setPassword(e.target.value); }}/>
                            </Form.Group>
                            <Button variant="primary"  onClick={submitUser}>
                                Register
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Registration;