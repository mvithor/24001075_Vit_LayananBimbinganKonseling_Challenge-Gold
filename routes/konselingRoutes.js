const {Router} = require('express');
const { getKonseling, addKonseling} = require('../controller/konselingController');
const router = Router();

router.get('/', getKonseling);
router.post('/', addKonseling);


module.exports = router;