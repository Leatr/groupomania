import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import { React, useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  logo  from '../logos/icon-left-font.png';

function Header() {
    const navigate = useNavigate();
    const [connectedUser, setConnectedUser] = useState(false); 

    useEffect(() => {
        Axios.get("http://localhost:3003/api/getUser",{ headers: {
        "x-access-token": localStorage.getItem("token"),
        }}).then((response) => {
            setConnectedUser(response.data.auth);
            // if(!response.data.auth) {
            //     navigate('/signup')
            // }
        });
      }, [connectedUser]);

    return (
        <div className="header">
      
            <Nav className="justify-content-center" activeKey="/home">
            <Nav.Item>
            <Nav.Link href="/home"><img style={{width: '5em'}} src={logo}/></Nav.Link>
            </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/home">Home</Nav.Link>
                </Nav.Item>
                {!connectedUser ?
                <Nav.Item>
                    <Nav.Link href="/signup">Sing up</Nav.Link>
                </Nav.Item> : "" }
                {!connectedUser ? 
                <Nav.Item>
                    <Nav.Link href="/login">Sing in</Nav.Link>
                </Nav.Item> : "" }
                <Nav.Item>
                    <Nav.Link href="/profil">Profil</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
  );
}

export default Header;