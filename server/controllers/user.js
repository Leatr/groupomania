const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "ROOT",
    database: "social_network_bd"
});
const userModel = require('../models/user');

exports.registration = (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const email = req.body.email;

    bcrypt.hash(password, 10, (err,  hashedPassword) => {
        if(err) {
            console.log(err);
        }
        userModel.setUser(firstName, lastName, email, hashedPassword);
    });
};

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    userModel.loginUser(email, password, req, res);
};

exports.getUser = (req, res) => {
    userModel.getUser(req, res);
};

exports.updateUserPassword = (req, res) => {
    const password = req.body.password;
    
    bcrypt.hash(password, 10, (err,  hashedPassword) => {
        if(err) {
            console.log(err);
        }
        userModel.updateUserPassword(req, res, hashedPassword);
    });
};

exports.updateUserEmail = (req, res) => {
    const email = req.body.email;
    userModel.updateUserEmail(req, res, email);

};

exports.deleteUser = (req, res) => {
    const idUser = req.userId;
    userModel.deleteUser(req, res, idUser);
};