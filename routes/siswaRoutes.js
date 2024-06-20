const {Router} = require("express");
const { getStudents, getStudentsById, updateStudent, deleteStudent, deleteAllStudent, getJenisKelamin} = require('../controller/siswaController');
const protectDashboard = require ('../middleware/protectDashboard')

const router = Router();


router.get("/",getStudents);
router.get('/:id', getStudentsById);
router.put('/:id', updateStudent)
router.get("/jenis-kelamin", getJenisKelamin);
router.delete("/:id", deleteStudent);
router.delete("/", deleteAllStudent);

module.exports = router;