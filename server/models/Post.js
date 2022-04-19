const mysql = require("mysql");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "ROOT",
    database: "social_network_bd"
});

exports.getAllPosts = (req, res) => {
    const sqlSelect = "SELECT * FROM posts";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}

exports.getOnePost = (id, idUser, req, res) => {
    const sqlSelect = "SELECT * FROM posts WHERE id = ? AND id_user = ?;";
    db.query(sqlSelect, [id, idUser], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

exports.insertPost = (title, description, classifiedsadd, req, res) => {
    console.log(classifiedsadd.image)
    //If error try in MySQL WorkBench ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
    const sqlInsert = "INSERT INTO posts (name, description, id_user, image) VALUES (?,?,?,?);";
    db.query(sqlInsert, [title, description, req.userId, classifiedsadd.image], (err, result) => {
        console.log(err)
    });
}

exports.updatePost = (idPost, idUser, name, description) => {
    const sqlUpdate = "UPDATE posts SET name = ?, description = ? WHERE id_user = ? AND id = ?";
    db.query(sqlUpdate, [name, description, idUser, idPost], (err, result) => {
        if(err) console.log(err);
    });
}

exports.deletePost = (idPost, idUser) => {
    const sqlDelete = "DELETE FROM posts WHERE id = ? AND id_user = ?;";
    db.query(sqlDelete, [idPost, idUser], (err, result) => {
        if(err) console.log(err);
    });
}

exports.insertComment = (idPost, idUser, comment, firstname) => {
    //If error try in MySQL WorkBench ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
    const sqlInsert = "INSERT INTO comments (id_user, id_post, comment, firstname) VALUES (?,?,?,?);";
    db.query(sqlInsert, [idUser, idPost, comment, firstname], (err, result) => {
        console.log(err)
    });
}

exports.getComments = (idPost, req, res) => {
    const sqlSelect = "SELECT * FROM comments WHERE id_post = ?";
    db.query(sqlSelect, [idPost], (err, result) => {
        res.send(result);
    });
}
