const mysql = require("mysql");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "ROOT",
    database: "social_network"
});

exports.getAllPosts = (req, res) => {
    try {
        const sqlSelect = "SELECT p.* FROM posts p ORDER BY created_at DESC;";
        db.query(sqlSelect, (err, result) => {
            res.send(result);
        });
    } catch (err) {
        console.log(err);
    }
    
}

exports.getOnePost = (id, idUser, req, res) => {
    try {
        const sqlSelect = "SELECT p.*, COUNT(c.id) as nbComments FROM posts p LEFT JOIN comments c ON(p.id = c.id_post) WHERE p.id = ? AND p.id_user = ?;";
        db.query(sqlSelect, [id, idUser], (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
    } catch (err) {
        console.log(err);
    }
}

exports.insertPost = (title, description, classifiedsadd, username, req, res) => {
    if(classifiedsadd) {
        classifiedsadd = classifiedsadd.image;
    } else {
        classifiedsadd = null;
    }

    try {
        //If error try in MySQL WorkBench ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
        const sqlInsert = "INSERT INTO posts (name, description, id_user, image, username, created_at) VALUES (?,?,?,?,?,NOW());";
        db.query(sqlInsert, [title, description, req.userId, classifiedsadd, username], (err, result) => {
            console.log(err)
        });
    } catch (err) {
        console.log(err);
    }
}

exports.deletePost = (idPost, idUser, hasComments) => {
    if(hasComments) {
        try {
            const sqlDelete = "DELETE p, c FROM posts p LEFT JOIN  comments c ON ( p.id = c.id_post) WHERE p.id = ? AND p.id_user = ?;";
            db.query(sqlDelete, [idPost, idUser], (err, result) => {
                if(err) console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    } else {
        try {
            const sqlDelete = "DELETE FROM posts WHERE id = ? AND id_user = ?;";
            db.query(sqlDelete, [idPost, idUser], (err, result) => {
                if(err) console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    }
}

exports.updatePost = (idPost, idUser, title, description, classifiedsadd, req) => {
    if(classifiedsadd) {
        classifiedsadd = classifiedsadd.image;
    } else {
        classifiedsadd = null;
    }
    try {
        const sqlUpdate = "UPDATE posts SET name = ?, description = ?, image = ? WHERE id_user = ? AND id = ?";
        db.query(sqlUpdate, [title, description, classifiedsadd, idUser, idPost], (err, result) => {
            if(err) console.log(err);
        });
    } catch (err) {
        console.log(err);
    }
}

exports.insertComment = (idPost, idUser, comment, firstname) => {
    try {
        //If error try in MySQL WorkBench ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
        const sqlInsert = "INSERT INTO comments (id_user, id_post, comment, firstname) VALUES (?,?,?,?);";
        db.query(sqlInsert, [idUser, idPost, comment, firstname], (err, result) => {
            console.log(err)
        });
    } catch (err) {
        console.log(err);
    }
}

exports.getComments = (idPost, req, res) => {
    try {
        const sqlSelect = "SELECT * FROM comments WHERE id_post = ?";
        db.query(sqlSelect, [idPost], (err, result) => {
            res.send(result);
        });
    } catch (err) {
        console.log(err);
    }
}

exports.deleteComment = (idComment, idUser , req, res) => {
    try {
        const sqlSelect = "DELETE FROM comments WHERE id = ? AND id_user = ?";
        db.query(sqlSelect, [idComment, idUser], (err, result) => {
            res.send(result);
        });
    } catch (err) {
        console.error(err);
    }
}