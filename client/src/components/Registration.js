import { React } from "react";
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Axios from 'axios';
import { useState } from 'react';

const Registration = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    const submitUser = () => {
        Axios.post("http://localhost:3003/api/registration", {
            firstName: firstName,
            lastName: lastName,
            password: password,
            email: email
        });
    }

    return(
        <>
            <Header></Header>
            <Container fluid="md">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <div className="bg-light p-5 mb-4">
                            <div className="text-center"> Inscription </div>
                        </div>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Votre Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => { setEmail(e.target.value); }}/>
                                <Form.Text className="text-muted">
                                    Veillez entrer votre l'email proffessionel
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formFirstName">
                                <Form.Label>Votre Prénom</Form.Label>
                                <Form.Control type="firstName" placeholder="Enter votre prénom" name="firstName" onChange={(e) => { setFirstName(e.target.value); }}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formLastName">
                                <Form.Label>Votre Nom</Form.Label>
                                <Form.Control type="lastName" placeholder="Enter votre nom de famille" name="lastName" onChange={(e) => { setLastName(e.target.value); }}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => { setPassword(e.target.value); }}/>
                            </Form.Group>
                            <Button variant="primary"  onClick={submitUser}>
                                S'inscrire
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Registration;