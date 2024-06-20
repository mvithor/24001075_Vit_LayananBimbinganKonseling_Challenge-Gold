const { Router } = require('express');
const { getPelanggaran, addPelanggaran, getPelanggaranById, deletePelanggaran, updatePelanggaran, From } = require ('../controller/pelanggaranController');
const protectDashboard = require('../middleware/protectDashboard');
const router = Router();

router.get('/', getPelanggaran);
router.get('/tambah-pelanggaran', protectDashboard, From );
router.post('/tambah-pelanggaran', protectDashboard, addPelanggaran);
router.get('/:id', protectDashboard, getPelanggaranById);
router.delete('/:id', protectDashboard, deletePelanggaran);
router.put('/:id', updatePelanggaran);

module.exports = router;