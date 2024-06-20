const {Router} = require('express');
const { getKonselor, addKonselor, getKonselorById, deleteKonselor, updateKonselor, From } = require('../controller/konselorController');
const  protectDashboard  =require('../middleware/protectDashboard')
const router = Router();

router.get('/', getKonselor);
router.get('/tambah-konselor', protectDashboard, From)
router.post('/tambah-konselor', protectDashboard, addKonselor);
router.get('/:id',getKonselorById);
router.delete('/:id', protectDashboard, deleteKonselor)
router.put('/:id', updateKonselor)

module.exports = router;