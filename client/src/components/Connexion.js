import { React, useEffect } from "react";
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Connexion = () => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    Axios.defaults.withCredentials = true;
    
    const submitUserConnexion = () => {
        Axios.post('http://localhost:3003/api/signin',{
            email: email,
            password: password
            }).then((response) => {
                if(!response.data.auth) {
                } else {
                    localStorage.setItem("token", response.data.token);
                    navigate('/home');
                }
        });
    }

    return(
        <>
            <Header></Header>
            <Container fluid="md">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <div className="bg-light p-5 mb-4">
                            <div className="text-center"> Connexion </div>
                        </div>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Votre Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => { setEmail(e.target.value); }}/>
                                <Form.Text className="text-muted">
                                    Veillez entrer votre l'email proffessionel
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => { setPassword(e.target.value); }}/>
                            </Form.Group>
                            <Button variant="primary"  onClick={submitUserConnexion}>
                                Sign in
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Connexion;