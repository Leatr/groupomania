const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "ROOT",
    database: "social_network"
});

exports.setUser = (firstName, lastName, email, hashedPassword) => {
    try {
        const sqlInsert = "INSERT INTO users (lastname, firstname, password, email) VALUES (?,?,?,?);";
        db.query(sqlInsert, [lastName, firstName, hashedPassword, null], (err, result) => {
            console.log(err)
        });
    } catch (err) {
        console.log(err);
    }
}

exports.loginUser = (email, password, req, res) => {
    try {
        const sqlSelect = "SELECT * FROM users WHERE email = ?;";
        db.query(sqlSelect, email, (err, result) => {
            if(err) {
                console.log(err);
            }
            if(result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if(response) {
                        req.session.user = result;
                        const id = result[0].iduser;
                        const token = jwt.sign({id}, "jwtSecret", {
                            expiresIn: 300
                        });
                        res.json({auth: true, token: token, result: result});
                    } else {
                        res.send({auth: false, message: "Wrong email/password combination"});
                    }
                });
            } else {
                res.json({auth: false, message: "No user exists"});
            }
        });
    } catch (err) {
        console.log(err);
    }
}

exports.getUser = (req, res) => {
    try {
        const sqlSelect = "SELECT iduser, firstname, role FROM users WHERE iduser = ?";
        db.query(sqlSelect, [req.userId], (err, result) => {
            if(result) {
                res.json({auth: true, data: result});
            } else {
                res.send({auth: false, message: "Wrong email/password combination"});
            }
        });
    } catch (err) {
        console.log(err);
    }
}

exports.updateUserPassword = (req, res, hashedPassword) => {
    try {
        const sqlUpdate = "UPDATE users SET password = ? WHERE iduser = ?";
        db.query(sqlUpdate, [hashedPassword, req.userId], (err, result) => {
            if(err) console.log(err);
        });
    } catch (err) {
        console.log(err);
    }
}

exports.updateUserEmail = (req, res, email) => {
    try {
        const sqlUpdate = "UPDATE users SET email = ? WHERE iduser = ?";
        db.query(sqlUpdate, [email, req.userId], (err, result) => {
            if(err) console.log(err);
        });
    } catch (err) {
        console.log(err);
    }
}

exports.deleteUser = (req, res, idUser) => {
    try {
        const sqlUpdate = "DELETE p, c, u FROM users u LEFT JOIN posts p ON (u.iduser = p.id_user) LEFT JOIN comments c ON (u.iduser = c.id_user) WHERE u.iduser = ?";
        db.query(sqlUpdate, [idUser], (err, result) => {
            if(err) console.log(err);
        });
    } catch (err) {
        console.log(err);
    }
}
