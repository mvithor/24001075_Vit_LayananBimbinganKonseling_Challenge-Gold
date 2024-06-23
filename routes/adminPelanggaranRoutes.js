const {Router} = require ("express");
const router = Router();
const { 
    getPelanggaran,
    deletePelanggaranById,
    updatePelanggaranById,
    inputPelanggaran
} = require('../controller/adminPelanggaranController');
//Routing
router.get('/api/v1/pelanggaran',getPelanggaran);
router.post('/pelanggaran',inputPelanggaran);
router.put('/pelanggaran/:id',updatePelanggaranById);
router.delete('/pelanggaran/:id',deletePelanggaranById);


module.exports = router;