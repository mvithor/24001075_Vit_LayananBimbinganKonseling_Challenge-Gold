const { Router } = require("express");
const { dashboardAdmin, dashboardSiswa } = require('../controller/dashboardController');
const { getKonselor, addKonselor, getKonselorById, updateKonselor } = require('../controller/konselorController');
const { getStudents, getStudentsById, updateStudent} =require ('../controller/siswaController');
const { getPelanggaran, addPelanggaran, getPelanggaranById, updatePelanggaran } = require('../controller/pelanggaranController');
const  protectDashboard  = require('../middleware/protectDashboard');
const { getUsers, getUsersById } = require('../controller/Users');


const router = Router();

// Routes dashboard role
router.get("/admin", protectDashboard, dashboardAdmin);
router.get("/siswa", protectDashboard, dashboardSiswa);

// Dashboard routes
router.get('/admin/students', protectDashboard, getStudents);
router.get('/admin/students/edit/:id', protectDashboard, getStudentsById);
router.post("/admin/students/edit/:id", protectDashboard, updateStudent);



router.get('/admin/users', protectDashboard, getUsers);
router.get('/admin/users/:id', protectDashboard, getUsersById);


router.get('/admin/data-konselor', protectDashboard, getKonselor);
router.get('/admin/tambah-konselor', protectDashboard, addKonselor);
router.post('/admin/tambah-konselor', protectDashboard, addKonselor);
router.get('/admin/data-konselor/edit/:id', protectDashboard, getKonselorById );
router.post('/admin/data-konselor/edit/:id', protectDashboard, updateKonselor );

router.get('/admin/pelanggaran', protectDashboard, getPelanggaran);
router.get('/admin/tambah-pelanggaran', protectDashboard, addPelanggaran);
router.post('/admin/tambah-pelanggaran', protectDashboard, addPelanggaran);
router.get('/admin/pelanggaran/edit/:id', protectDashboard, getPelanggaranById);
router.post('/admin/pelanggaran/edit/:id', protectDashboard, updatePelanggaran);



module.exports = router;



