import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Profil from "./components/Profil";
import Registration from './components/Registration';
import DetailPost from './components/DetailPost';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import Connexion from './components/Connexion';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="profil" element={<Profil />} />
        <Route path="login" element={<Registration />} />
        <Route path="home" element={<Home />} />
        <Route path="signup" element={<Connexion />} />
        <Route path="posts/:id/:user" element={<DetailPost />} />
      </Routes>
    </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
