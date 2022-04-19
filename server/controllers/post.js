const mysql = require("mysql");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "ROOT",
    database: "social_network_bd"
});
const multer = require("multer");
const userPost = require('../models/post');
const path = require('path');
const fs = require('fs');

exports.getAllPosts = (req, res) => {
    userPost.getAllPosts(req, res);
};

exports.getOnePost = (req, res) => {
    const id = req.query.id;
    const idUser = req.query.idUser;
    userPost.getOnePost(id, idUser, req, res);
};

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public_html/', 'uploads'),
    filename: function (req, file, cb) {   
        // null as first argument means no error
        cb(null, Date.now() + '-' + file.originalname )  
    }
})

exports.insertPost = (req, res) => {
    try {
        // 'avatar' is the name of our file input field in the HTML form
        let upload = multer({ storage: storage}).single('avatar');
   
        upload(req, res, function(err) {
            const title = req.body.title;
            const description = req.body.description;
            if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }

            const classifiedsadd = {
				image: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
			};
            console.log(classifiedsadd)
            userPost.insertPost(title, description, classifiedsadd, req, res);
        }); 
    } catch (err) {
        console.log(err)
    }
};

exports.updatePost = (req, res) => {
    const idPost = req.body.idPost;
    const idUser = req.body.idUser;
    const name = req.body.name;
    const description = req.body.description;
    
    if(parseInt(req.userId) !== parseInt(idUser)) {
        res.send("error");
    } else {
        userPost.updatePost(idPost, idUser, name, description);
    }
};

exports.deletePost = (req, res) => {
    const idPost = req.params.idPost;
    const idUser = req.params.idUser;
    let image = req.body.image;
    if(image) {
        image = image.split(`${req.protocol}://${req.get('host')}/image/`)[1];
        fs.unlinkSync(`public_html/uploads/${image}`);
    }
    userPost.deletePost(idPost, idUser);
};

exports.insertComment = (req, res) => {
    const idPost = req.body.idPost;
    const idUser = req.body.idUser;
    const comment = req.body.comment;
    const firstName = req.body.firstName;
    
 
    userPost.insertComment(idPost, idUser, comment, firstName);
};

exports.getComments = (req, res) => {
    const idPost = req.query.idPost;
    userPost.getComments(idPost, req, res);
};