const {Router} = require('express');
const { getKelas, getKelasById, SiswaKelasById, getKelasOptions, getClassName, addKelas, getKelasAll, deleteKelas, updateKelas } = require('../controller/kelasController');
const router = Router();

router.get('/', getKelas);
router.get('/:kelasId', SiswaKelasById);

router.get('/option', getKelasOptions);
router.get('/nama-kelas', getClassName);
router.get('/count', getKelasAll);
router.get('/:id', getKelasById);
router.post('/tambah-kelas', addKelas);
router.delete('/:id', deleteKelas);
router.put('/:id', updateKelas);

module.exports = router;
