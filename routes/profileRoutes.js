const { Router } = require('express')
const { getProfile } = require('../controller/profileController');
const router = Router();

router.get('/', getProfile);

module.exports = router;

