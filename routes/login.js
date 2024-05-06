const { Router } = require('express');
const { getUsers, form, Register, Login,  Logout}  = require('../controller/Users')

// const { checkEmailTerdaftar } =require('../middleware/auth');
const router = Router();


// Route Get Halaman Login dan signUp
router.get('/', form);


router.get('/logout', Logout)
router.post('/register', Register);



router.post('/login', Login);
// Route Logout
router.delete ('/logout', Logout, form);



router.get('/users', getUsers);


module.exports = router;