const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users.ctrl');

router.get('/', userCtrl.getAllUsers);
router.post('/register', userCtrl.register);
router.post('/updatePasswordMail', userCtrl.updatePasswordMail);
router.post('/updatePassword', userCtrl.updatePassword);
router.post('/login', userCtrl.login);



module.exports = router;
