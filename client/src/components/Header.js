import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import { React, useState, useEffect } from "react";
import Axios from 'axios';
import  logo  from '../logos/icon.png';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [connectedUser, setConnectedUser] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get("http://localhost:3003/api/getUser",{ headers: {
        "x-access-token": localStorage.getItem("token"),
        }}).then((response) => {
            setConnectedUser(response.data.auth);
        });
      }, [connectedUser]);

    
    const logout = () => {
        Axios.get("http://localhost:3003/api/logout",{ headers: {
            "x-access-token": localStorage.getItem("token"),
        }}).then((response) => {
            setConnectedUser(false);

        });
        localStorage.clear();
        navigate('/signin');
    }

     
      console.log(connectedUser)
    return (
        <div className="header header-color">
      
            <Nav className="justify-content-center" activeKey="/home">
            <Nav.Item>
                <Nav.Link href="/home"><img style={{width: '5em'}} src={logo}/></Nav.Link>
            </Nav.Item>
                {connectedUser ?
                    <Nav.Item>
                        <Nav.Link href="/home">Home</Nav.Link>
                    </Nav.Item>
                 : "" }
                {!connectedUser ?
                    <Nav.Item>
                        <Nav.Link href="/signup">Sing up</Nav.Link>
                    </Nav.Item>
                 : "" }
                {!connectedUser ? 
                    <Nav.Item>
                        <Nav.Link href="/signin">Sign in</Nav.Link>
                    </Nav.Item>
                 : "" }
                {connectedUser ?
                    <Nav.Item>
                        <Nav.Link href="/profil">Profil</Nav.Link>
                    </Nav.Item>
                 : "" }
                {connectedUser ?
                    <Nav.Item>
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                    </Nav.Item>
                 : "" }
            </Nav>
        </div>
  );
}

export default Header;