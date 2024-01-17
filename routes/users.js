const express = require('express');
const router = express.Router();

const {signup,login,userProfile,deleteUSer} = require('../controllers/users')

router.post('/signup',signup);
router.post('/login',login);
router.get('/getuser/:id')
router.patch('/updateprofile/:id',userProfile);
router.delete('/deleteuser/:id',deleteUSer)


module.exports = router;