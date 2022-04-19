const expess = require('express');
const router = expess.Router();
const userCtrl = require('../controllers/user');
const verifyJWT = require('../middleware/auth');
router.post('/registration', userCtrl.registration);
router.post('/login', userCtrl.login);
router.get('/getUser', verifyJWT, userCtrl.getUser);
router.put('/updateUserPassword', verifyJWT, userCtrl.updateUserPassword);
router.put('/updateUserEmail', verifyJWT, userCtrl.updateUserEmail);
router.delete('/deleteUser', verifyJWT, userCtrl.deleteUser);

module.exports = router;