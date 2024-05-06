const {Router} = require("express");
const { getStudents, getStudentsById, updateStudent, deleteStudent, deleteAllStudent} = require('../controller/siswaController');
const protectDashboard = require ('../middleware/protectDashboard')

const router = Router();


router.get("/", protectDashboard,getStudents);
router.delete("/:id", deleteStudent);
router.delete("/", deleteAllStudent);

module.exports = router;