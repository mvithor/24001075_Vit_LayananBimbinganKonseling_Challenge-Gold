const {Router} = require ("express");
const { beranda, tentang, layanan, konselor, literasi} = require('../controller/homeController')
const router = Router();

router.get('/', beranda);
router.get('/tentang', tentang);
router.get('/layanan', layanan);
router.get('/konselor', konselor);
router.get('/literasi', literasi);

module.exports = router;
