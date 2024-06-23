const {Router} = require('express');
const { getKonselor, getKonselorAll, addKonselor, getKonselorById, deleteKonselor, updateKonselor } = require('../controller/konselorController');
const  protectDashboard  =require('../middleware/protectDashboard')
const router = Router();

router.get('/', getKonselor);
router.get('/count', getKonselorAll);
router.post('/tambah-konselor', protectDashboard, addKonselor);
router.get('/:id',getKonselorById);
router.delete('/:id', protectDashboard, deleteKonselor)
router.put('/:id', updateKonselor)

module.exports = router;