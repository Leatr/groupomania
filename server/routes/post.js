const expess = require('express');
const router = expess.Router();
const postCtrl = require('../controllers/post');
const verifyJWT = require('../middleware/auth');
const path = require('path');

router.post('/insertPost',verifyJWT, postCtrl.insertPost);
router.get('/getOnePost',verifyJWT, postCtrl.getOnePost);
router.get('/getAllPosts',verifyJWT, postCtrl.getAllPosts);
router.put('/updatePost',verifyJWT, postCtrl.updatePost);
router.delete('/deletePost/:idPost/:idUser',verifyJWT, postCtrl.deletePost);
router.post('/insertComment',verifyJWT, postCtrl.insertComment);
router.get('/getComments',verifyJWT, postCtrl.getComments);

module.exports = router;