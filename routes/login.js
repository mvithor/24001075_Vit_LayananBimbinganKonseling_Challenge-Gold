const { Router } = require('express');
const { getUsers, form, Register, Login,  Logout}  = require('../controller/Users');
const { verifyToken } = require('../middleware/verify')
const  refreshToken  = require('../controller/refreshToken')

// const { checkEmailTerdaftar } =require('../middleware/auth');
const router = Router();


// Route Get Halaman Login dan signUp
router.get('/', form);

router.get('/token', refreshToken)


router.get('/logout', Logout)
router.post('/register', Register);

router.post('/login', Login);
// Route Logout
router.delete ('/logout', Logout);



router.get('/users', verifyToken, getUsers);


module.exports = router;