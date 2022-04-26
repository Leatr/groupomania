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
            const username = req.body.username;
            if(req.file) {
                if (err instanceof multer.MulterError) {
                    return res.send(err);
                }
                else if (err) {
                    return res.send(err);
                }
    
                const classifiedsadd = {
                    image: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
                };
                userPost.insertPost(title, description, classifiedsadd, username, req, res);
            } else {
                userPost.insertPost(title, description, classifiedsadd=null, username, req, res);
            }
        }); 
    } catch (err) {
        console.log(err)
    }
};

exports.updatePost = (req, res) => {
    try {
        // 'avatar' is the name of our file input field in the HTML form
        let upload = multer({ storage: storage}).single('avatar');

        upload(req, res, function(err) {
            const title = req.body.title;
            const description = req.body.description;
            const idUser = req.body.idUser;
            const idPost = req.body.idPost;
            let oldImage = req.body.oldImage;

            if(req.file) {
                if (err instanceof multer.MulterError) {
                    return res.send(err);
                }
                else if (err) {
                    return res.send(err);
                }

                const classifiedsadd = {
                    image: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
                };
            
                if(oldImage) {
                    oldImage = oldImage.split(`${req.protocol}://${req.get('host')}/image/`)[1];
                    fs.unlinkSync(`public_html/uploads/${oldImage}`);
                }

                if(parseInt(req.userId) !== parseInt(idUser)) {
                    res.send("error 1");
                } else {
                    userPost.updatePost(idPost, idUser, title, description, classifiedsadd, req);
                }
            } else {
                if(parseInt(req.userId) !== parseInt(idUser)) {
                    res.send("error 2");
                } else {
                    userPost.updatePost(idPost, idUser, title, description, classifiedsadd=null, req);
                }
            }
        }); 
    } catch (err) {
        console.log(err)
    }
};

exports.deletePost = (req, res) => {
    const idPost = req.params.idPost;
    const idUser = req.params.idUser;
    let image = req.body.image;
    const hasComments = req.body.hasComments;

    if(image) {
        image = image.split(`${req.protocol}://${req.get('host')}/image/`)[1];
        fs.unlinkSync(`public_html/uploads/${image}`);
    } 
    userPost.deletePost(idPost, idUser, hasComments);
};

exports.insertComment = (req, res) => {
    const idPost = req.body.idPost;
    const idUser = req.userId;
    const comment = req.body.comment;
    const firstName = req.body.firstName;
    
    userPost.insertComment(idPost, idUser, comment, firstName);
};

exports.getComments = (req, res) => {
    const idPost = req.query.idPost;
    userPost.getComments(idPost, req, res);
};

exports.deleteComment = (req, res) => {
    const idComment = req.body.idComment;
    const idUser = req.body.idUser;
    userPost.deleteComment(idComment, idUser, req, res);
};