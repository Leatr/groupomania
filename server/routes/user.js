const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const verifyJWT = require('../middleware/auth');

router.post('/signup', userCtrl.registration);
router.post('/signin', userCtrl.login);
router.get('/getUser', verifyJWT, userCtrl.getUser);
router.put('/updateUserPassword', verifyJWT, userCtrl.updateUserPassword);
router.put('/updateUserEmail', verifyJWT, userCtrl.updateUserEmail);
router.delete('/deleteUser', verifyJWT, userCtrl.deleteUser);

module.exports = router;